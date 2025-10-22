import { LogoSettings } from '@/lib/types'
import { urlFor } from '@/lib/sanity'
import { normalizeLogo } from '@/lib/logoHelpers'
import { CSSProperties } from 'react'

interface LogoProps {
  logo?: any // Can be old or new format
}

export default function Logo({ logo }: LogoProps) {
  const normalizedLogo = normalizeLogo(logo)

  if (!normalizedLogo?.image?.asset) {
    return null
  }

  // Get position CSS properties
  const getPositionStyles = (position: string = 'top-left'): CSSProperties => {
    const offsetX = normalizedLogo.offsetX ?? 20
    const offsetY = normalizedLogo.offsetY ?? 20

    const styles: CSSProperties = {
      position: 'fixed',
      zIndex: normalizedLogo.zIndex ?? 1000,
      opacity: normalizedLogo.opacity ?? 1,
      pointerEvents: 'none',
    }

    // Parse position string
    const [vertical, horizontal] = position.split('-')

    // Set vertical position
    switch (vertical) {
      case 'top':
        styles.top = `${offsetY}px`
        break
      case 'middle':
        styles.top = '50%'
        styles.transform = 'translateY(-50%)'
        styles.marginTop = `${offsetY}px`
        break
      case 'bottom':
        styles.bottom = `${offsetY}px`
        break
    }

    // Set horizontal position
    switch (horizontal) {
      case 'left':
        styles.left = `${offsetX}px`
        break
      case 'center':
        styles.left = '50%'
        const currentTransform = styles.transform || ''
        styles.transform = currentTransform
          ? `${currentTransform} translateX(-50%)`
          : 'translateX(-50%)'
        break
      case 'right':
        styles.right = `${offsetX}px`
        break
    }

    return styles
  }

  const logoUrl = urlFor(normalizedLogo.image).width(normalizedLogo.width || 150).url()
  const positionStyles = getPositionStyles(normalizedLogo.position)

  return (
    <div
      className="logo-container"
      style={positionStyles}
    >
      <img
        src={logoUrl}
        alt="Logo"
        style={{
          width: normalizedLogo.width ? `${normalizedLogo.width}px` : '150px',
          height: normalizedLogo.height ? `${normalizedLogo.height}px` : 'auto',
          objectFit: 'contain',
        }}
      />
    </div>
  )
}
