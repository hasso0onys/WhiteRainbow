import { groq } from 'next-sanity'

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    _id,
    logo,
    projectName,
    contactButton,
    bookingButton,
    socialLinks[] {
      platform,
      url
    },
    barColor
  }
`

export const PROJECTS_QUERY = groq`
  *[_type == "project"] | order(orderRank asc) {
    _id,
    title,
    slug,
    orderRank,
    layoutType,
    leftContent {
      type,
      image {
        asset,
        alt
      },
      cloudinaryVideo,
      text,
      overlayText
    },
    rightContent {
      type,
      image {
        asset,
        alt
      },
      cloudinaryVideo,
      text,
      overlayText
    },
    backgroundColor
  }
`
