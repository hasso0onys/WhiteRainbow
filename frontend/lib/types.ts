// Sanity Types

export type LayoutType = 'fullscreen' | 'split'

export type ContentType = 'image' | 'video' | 'text'

export interface OverlayText {
  text?: string
  html?: string
  fontSize?: 'small' | 'medium' | 'large' | 'xlarge'
  fontWeight?: 'light' | 'normal' | 'medium' | 'bold'
  textAlign?: 'right' | 'center' | 'left'
  verticalAlign?: 'top' | 'center' | 'bottom'
  icon?: string
  iconPosition?: 'top' | 'bottom' | 'right' | 'left'
  backgroundColor?: 'transparent' | 'blackLight' | 'blackMedium' | 'blackHeavy' | 'whiteLight' | 'whiteMedium'
  textColor?: 'white' | 'black' | 'gray' | 'gold' | 'silver'
}

export interface ContentItem {
  type: ContentType
  image?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }
  cloudinaryVideo?: string
  text?: string
  overlayText?: OverlayText | string // Can be object or JSON string
}

export interface Project {
  _id: string
  title: string
  slug: {
    current: string
  }
  order: number
  layoutType: LayoutType
  leftContent: ContentItem
  rightContent?: ContentItem
  backgroundColor?: string
}

export interface SocialLink {
  platform: string
  url: string
}

export interface ContactInfo {
  email?: string
  phone?: string
  location?: string
}

export interface LogoSettings {
  image?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }
  width?: number
  height?: number
  position?: 'top-left' | 'top-center' | 'top-right' | 'middle-left' | 'middle-center' | 'middle-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  offsetX?: number
  offsetY?: number
  opacity?: number
  zIndex?: number
}

export interface SiteSettings {
  _id: string
  logo?: LogoSettings
  projectName?: string
  contactButton?: string
  bookingButton?: string
  socialLinks: SocialLink[]
  barColor?: string
  contactInfo?: ContactInfo
}
