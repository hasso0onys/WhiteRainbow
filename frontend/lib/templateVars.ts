import { LogoSettings } from './types'
import { urlFor } from './sanity'
import { normalizeLogo } from './logoHelpers'

/**
 * Replace template variables in text/HTML
 * Currently supports: {{logo}}
 */
export function replaceTemplateVars(
  content: string,
  logo?: any // Can be old or new format
): string {
  if (!content) return content

  let result = content

  // Normalize logo to support both old and new format
  const normalizedLogo = normalizeLogo(logo)

  // Replace {{logo}} with actual logo image
  if (normalizedLogo?.image?.asset) {
    const logoUrl = urlFor(normalizedLogo.image).width(800).url() // High resolution for quality
    const logoOpacity = normalizedLogo.opacity ?? 1

    // Generate img tag that responds to container size
    // The image will fill its container while maintaining aspect ratio
    const logoHTML = `<img src="${logoUrl}" alt="Logo" style="width: 100%; height: 100%; opacity: ${logoOpacity}; object-fit: contain; display: block;" />`

    result = result.replace(/\{\{logo\}\}/g, logoHTML)
  } else {
    // If logo doesn't exist, remove the placeholder
    result = result.replace(/\{\{logo\}\}/g, '')
  }

  return result
}

/**
 * Get available template variables list
 */
export function getAvailableTemplateVars(): string[] {
  return ['{{logo}}']
}

/**
 * Get template variables documentation
 */
export function getTemplateVarsHelp(): Record<string, string> {
  return {
    '{{logo}}': 'يعرض شعار الموقع المحدد في الإعدادات',
  }
}
