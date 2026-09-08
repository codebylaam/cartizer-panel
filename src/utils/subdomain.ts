/**
 * Utility to extract subdomain from hostname or URL string.
 * Examples:
 * - "hello.localhost:3010" -> "hello"
 * - "tenant.savizer.com" -> "tenant"
 * - "localhost:3010" -> null
 * - "savizer.com" -> null
 */
export function getSubdomain(hostname?: string): string | null {
  const host =
    hostname || (typeof window !== 'undefined' ? window.location.hostname : '')

  if (!host) return null

  // Remove port if present (e.g., hello.localhost:3010 -> hello.localhost)
  const domain = host.split(':')[0].toLowerCase()

  // Handle localhost subdomains (e.g., hello.localhost)
  if (domain.endsWith('.localhost')) {
    const parts = domain.split('.')
    if (parts.length > 1 && parts[0] !== 'localhost') {
      return parts[0]
    }
    return null
  }

  // Ignore IP addresses
  if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(domain)) {
    return null
  }

  // Handle standard domain names (e.g., tenant.domain.com)
  const parts = domain.split('.')
  if (parts.length > 2) {
    return parts[0]
  }

  return null
}
