import { LogoSettings } from './types'

/**
 * Normalize logo data to support both old and new format
 *
 * Old format: logo = { _type: "image", asset: {...}, alt: "..." }
 * New format: logo = { image: {...}, width: 150, height: 50, ... }
 */
export function normalizeLogo(logo: any): LogoSettings | null {
  if (!logo) return null

  // Check if it's the old format (direct image)
  if (logo._type === 'image' && logo.asset) {
    return {
      image: {
        asset: logo.asset,
        alt: logo.alt,
      },
      width: 150, // Default values
      height: 50,
      position: 'top-left',
      offsetX: 20,
      offsetY: 20,
      opacity: 1,
      zIndex: 1000,
    }
  }

  // Check if it's the new format (object with image property)
  if (logo.image?.asset) {
    return {
      image: logo.image,
      width: logo.width || 150,
      height: logo.height || 50,
      position: logo.position || 'top-left',
      offsetX: logo.offsetX ?? 20,
      offsetY: logo.offsetY ?? 20,
      opacity: logo.opacity ?? 1,
      zIndex: logo.zIndex ?? 1000,
    }
  }

  return null
}

/**
 * Check if logo exists and is valid
 */
export function hasLogo(logo: any): boolean {
  return !!normalizeLogo(logo)
}
