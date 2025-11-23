/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly NODE_ENV: string
  readonly SITE_URL: string
  readonly API_URL: string
  readonly SESSION_KV_ID?: string
  readonly CACHE_KV_ID?: string
  readonly SESSION_KV_PREVIEW_ID?: string
  readonly CACHE_KV_PREVIEW_ID?: string
  readonly CSRF_SECRET?: string
  readonly JWT_SECRET?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Cloudflare Workers runtime types
declare namespace App {
  interface Locals {
    runtime?: {
      env: {
        SESSION?: KVNamespace
        CACHE?: KVNamespace
      }
    }
  }
}

// KV namespace type
declare interface KVNamespace {
  get(key: string): Promise<string | null>
  get(key: string, type: 'json'): Promise<any | null>
  get(key: string, type: 'text'): Promise<string | null>
  put(key: string, value: string): Promise<void>
  put(key: string, value: string, options: { expiration?: number, expirationTtl?: number }): Promise<void>
  delete(key: string): Promise<void>
  list(): Promise<KVNamespaceListResult>
}

interface KVNamespaceListResult {
  keys: Array<{
    name: string
    expiration?: number
    metadata?: any
  }>
  list_complete: boolean
  cursor?: string
}