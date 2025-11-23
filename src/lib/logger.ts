type LogLevel = 'error' | 'warn' | 'info' | 'debug'

interface LogEntry {
  level: LogLevel
  message: string
  data?: any
  timestamp: string
  url?: string
  userAgent?: string
}

class Logger {
  private isDevelopment: boolean
  private logBuffer: LogEntry[] = []
  private maxBufferSize = 100

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development'
  }

  private createLogEntry(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      level,
      message,
      data: this.sanitizeData(data),
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined
    }
  }

  private sanitizeData(data: any): any {
    if (!data || typeof data !== 'object') {
      return data
    }

    // Remove sensitive information from logs
    const sensitiveKeys = [
      'password', 'token', 'secret', 'key', 'auth',
      'authorization', 'cookie', 'session', 'csrf',
      'api_key', 'private', 'credentials'
    ]

    const sanitized = Array.isArray(data) ? [...data] : { ...data }

    const sanitizeValue = (value: any, key: string): any => {
      if (typeof value === 'string') {
        // Remove potential sensitive data patterns
        return value
          .replace(/Bearer\s+[A-Za-z0-9\-._~+\/]+=*/g, 'Bearer [REDACTED]')
          .replace(/[A-Za-z0-9]{32,}/g, '[REDACTED]')
          .substring(0, 500) // Limit string length
      }

      if (typeof value === 'object' && value !== null) {
        return this.sanitizeData(value)
      }

      return value
    }

    for (const key in sanitized) {
      if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
        sanitized[key] = '[REDACTED]'
      } else {
        sanitized[key] = sanitizeValue(sanitized[key], key)
      }
    }

    return sanitized
  }

  private shouldLog(level: LogLevel): boolean {
    if (this.isDevelopment) {
      return true
    }

    // In production, only log errors and warnings
    return level === 'error' || level === 'warn'
  }

  private addToBuffer(entry: LogEntry): void {
    this.logBuffer.push(entry)
    if (this.logBuffer.length > this.maxBufferSize) {
      this.logBuffer.shift()
    }
  }

  private async sendToExternalService(entry: LogEntry): Promise<void> {
    // In production, send critical logs to monitoring service
    if (entry.level === 'error' && !this.isDevelopment) {
      try {
        // Example: Send to error tracking service
        // await fetch('/api/logs', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(entry)
        // })
      } catch (error) {
        // Silent fail to avoid infinite loops
      }
    }
  }

  error(message: string, data?: any): void {
    const entry = this.createLogEntry('error', message, data)
    this.addToBuffer(entry)

    if (this.shouldLog('error')) {
      if (this.isDevelopment) {
        console.error(`[ERROR] ${message}`, data)
      } else {
        console.error(`[ERROR] ${message}`)
        this.sendToExternalService(entry)
      }
    }
  }

  warn(message: string, data?: any): void {
    const entry = this.createLogEntry('warn', message, data)
    this.addToBuffer(entry)

    if (this.shouldLog('warn')) {
      if (this.isDevelopment) {
        console.warn(`[WARN] ${message}`, data)
      } else {
        console.warn(`[WARN] ${message}`)
      }
    }
  }

  info(message: string, data?: any): void {
    if (!this.shouldLog('info')) return

    const entry = this.createLogEntry('info', message, data)
    this.addToBuffer(entry)

    if (this.isDevelopment) {
      console.info(`[INFO] ${message}`, data)
    }
  }

  debug(message: string, data?: any): void {
    if (!this.shouldLog('debug')) return

    const entry = this.createLogEntry('debug', message, data)
    this.addToBuffer(entry)

    if (this.isDevelopment) {
      console.debug(`[DEBUG] ${message}`, data)
    }
  }

  // Performance logging
  performance(operation: string, startTime: number, data?: any): void {
    const duration = performance.now() - startTime
    this.info(`Performance: ${operation} completed in ${duration.toFixed(2)}ms`, {
      operation,
      duration,
      ...data
    })
  }

  // API request logging
  apiRequest(method: string, url: string, status: number, duration: number): void {
    const level = status >= 400 ? 'error' : status >= 300 ? 'warn' : 'info'
    this[level](`API ${method} ${url} - ${status} (${duration.toFixed(2)}ms)`, {
      method,
      url: this.sanitizeUrl(url),
      status,
      duration
    })
  }

  private sanitizeUrl(url: string): string {
    // Remove sensitive query parameters
    const urlObj = new URL(url)
    const sensitiveParams = ['token', 'key', 'secret', 'auth', 'password']

    sensitiveParams.forEach(param => {
      urlObj.searchParams.delete(param)
    })

    return urlObj.toString()
  }

  // Get recent logs for debugging
  getRecentLogs(count: number = 50): LogEntry[] {
    return this.logBuffer.slice(-count)
  }

  // Clear log buffer
  clearLogs(): void {
    this.logBuffer = []
  }
}

// Export singleton instance
export const logger = new Logger()

// Export convenient functions for backward compatibility
export const logError = (message: string, data?: any) => logger.error(message, data)
export const logWarn = (message: string, data?: any) => logger.warn(message, data)
export const logInfo = (message: string, data?: any) => logger.info(message, data)
export const logDebug = (message: string, data?: any) => logger.debug(message, data)

export default logger