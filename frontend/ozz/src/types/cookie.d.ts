// src/types/cookie.d.ts
declare module 'cookie' {
  export function parse(str: string, options?: any): Record<string, string>
  export function serialize(name: string, val: string, options?: any): string
}
