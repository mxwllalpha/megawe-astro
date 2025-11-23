import type { APIRoute } from 'astro'
import { logger } from '../../lib/logger'

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const data = await request.json()

    // Server-side validation
    const validationErrors = validateContactData(data)

    if (Object.keys(validationErrors).length > 0) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: validationErrors,
          message: 'Validation failed'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'X-Content-Type-Options': 'nosniff'
          }
        }
      )
    }

    // Sanitize data
    const sanitizedData = sanitizeContactData(data)

    // Enhanced rate limiting check
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const now = Date.now()
    const currentHour = Math.floor(now / (60 * 60 * 1000))
    const rateLimitKey = `contact_rate_limit_${clientIP}_${currentHour}`

    // Check if KV is available via Cloudflare runtime
    const kv = locals?.runtime?.env?.SESSION

    if (!kv) {
      logger.warn('SESSION KV namespace not available - proceeding without rate limiting')
    } else {
      try {
        // Get existing submissions for current hour
        const existingSubmissions = await kv.get(rateLimitKey, 'json') || []

        // Progressive rate limiting with increasing penalties
        const submissionsCount = existingSubmissions.length

        if (submissionsCount >= 10) {
          // Hard limit - block entirely
          return new Response(
            JSON.stringify({
              success: false,
              message: 'Rate limit exceeded. Please try again later.',
              retryAfter: 3600
            }),
            {
              status: 429,
              headers: {
                'Content-Type': 'application/json',
                'Retry-After': '3600',
                'X-RateLimit-Limit': '10',
                'X-RateLimit-Remaining': '0',
                'X-RateLimit-Reset': ((currentHour + 1) * 3600).toString()
              }
            }
          )
        } else if (submissionsCount >= 5) {
          // Soft limit - add delay
          const delay = Math.min(2000 * (submissionsCount - 4), 8000) // Max 8 second delay
          await new Promise(resolve => setTimeout(resolve, delay))
        }

        // Add current submission with metadata
        existingSubmissions.push({
          timestamp: now,
          userAgent: request.headers.get('user-agent')?.substring(0, 200),
          endpoint: '/api/contact'
        })

        // Store with 1 hour expiration
        await kv.put(rateLimitKey, JSON.stringify(existingSubmissions), { expirationTtl: 3600 })

        // Also store global rate limit data for monitoring
        const globalKey = `global_rate_limit_${currentHour}`
        const globalData = await kv.get(globalKey, 'json') || { total: 0, ips: new Set() }
        globalData.total += 1
        globalData.ips.add(clientIP)
        await kv.put(globalKey, JSON.stringify({
          total: globalData.total,
          ips: Array.from(globalData.ips).slice(-100) // Keep last 100 unique IPs
        }), { expirationTtl: 3600 })

      } catch (kvError) {
        logger.warn('KV rate limiting error', {
          error: kvError instanceof Error ? kvError.message : 'Unknown KV error',
          clientIP: clientIP.substring(0, 10) + '...' // Partial IP for logging
        })
        // Continue without rate limiting if KV fails
      }
    }

    // Store the contact submission
    const messageId = `contact_${now}_${Math.random().toString(36).substr(2, 9)}`
    if (kv) {
      await kv.put(messageId, JSON.stringify({
        ...sanitizedData,
        timestamp: new Date(now).toISOString(),
        ip: clientIP,
        userAgent: request.headers.get('user-agent')
      }), { expirationTtl: 30 * 24 * 60 * 60 }) // 30 days
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Pesan Anda telah terkirim successfully!'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-Content-Type-Options': 'nosniff'
        }
      }
    )

  } catch (error) {
    logger.error('Contact form API error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    })

    return new Response(
      JSON.stringify({
        success: false,
        message: 'Internal server error. Please try again.'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'X-Content-Type-Options': 'nosniff'
        }
      }
    )
  }
}

function validateContactData(data: any): Record<string, string> {
  const errors: Record<string, string> = {}

  // Name validation
  if (!data.name || typeof data.name !== 'string') {
    errors.name = 'Nama wajib diisi'
  } else if (data.name.trim().length < 2) {
    errors.name = 'Nama minimal 2 karakter'
  } else if (data.name.trim().length > 100) {
    errors.name = 'Nama maksimal 100 karakter'
  } else if (!/^[a-zA-Z\s.\-']+$/.test(data.name.trim())) {
    errors.name = 'Nama hanya boleh mengandung huruf, spasi, titik, tanda hubung, dan apostrof'
  }

  // Email validation
  if (!data.email || typeof data.email !== 'string') {
    errors.email = 'Email wajib diisi'
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email.trim())) {
      errors.email = 'Format email tidak valid'
    } else if (data.email.trim().length > 254) {
      errors.email = 'Email terlalu panjang'
    }
  }

  // Subject validation
  if (!data.subject || typeof data.subject !== 'string') {
    errors.subject = 'Subjek wajib diisi'
  } else if (data.subject.trim().length < 5) {
    errors.subject = 'Subjek minimal 5 karakter'
  } else if (data.subject.trim().length > 200) {
    errors.subject = 'Subjek maksimal 200 karakter'
  }

  // Message validation
  if (!data.message || typeof data.message !== 'string') {
    errors.message = 'Pesan wajib diisi'
  } else if (data.message.trim().length < 10) {
    errors.message = 'Pesan minimal 10 karakter'
  } else if (data.message.trim().length > 2000) {
    errors.message = 'Pesan maksimal 2000 karakter'
  }

  // GDPR consent validation
  if (!data.gdpr_consent || data.gdpr_consent !== 'on') {
    errors.gdpr_consent = 'Anda harus menyetujui kebijakan privasi kami'
  }

  return errors
}

function sanitizeContactData(data: any): any {
  const sanitized: any = {}

  // Sanitize name
  if (data.name && typeof data.name === 'string') {
    sanitized.name = data.name.trim()
      .replace(/[<>]/g, '') // Remove potential XSS
      .substring(0, 100)
  }

  // Sanitize email
  if (data.email && typeof data.email === 'string') {
    sanitized.email = data.email.trim().toLowerCase()
      .replace(/[<>]/g, '') // Remove potential XSS
      .substring(0, 254)
  }

  // Sanitize subject
  if (data.subject && typeof data.subject === 'string') {
    sanitized.subject = data.subject.trim()
      .replace(/[<>]/g, '') // Remove potential XSS
      .substring(0, 200)
  }

  // Sanitize message
  if (data.message && typeof data.message === 'string') {
    sanitized.message = data.message.trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
      .replace(/[<>]/g, '') // Remove remaining brackets
      .substring(0, 2000)
  }

  return sanitized
}