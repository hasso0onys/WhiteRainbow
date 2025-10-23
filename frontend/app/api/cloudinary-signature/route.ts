import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { paramsToSign } = body

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (!apiSecret || !cloudName) {
      return NextResponse.json(
        { error: 'Missing Cloudinary credentials' },
        { status: 500 }
      )
    }

    // If paramsToSign is provided (from widget), use it directly
    // Otherwise, use the old format for getting API key only
    if (paramsToSign) {
      // Sort parameters alphabetically and build signature string
      const sortedParams = Object.keys(paramsToSign)
        .sort()
        .map(key => {
          const value = paramsToSign[key]
          // Handle arrays (like eager)
          if (Array.isArray(value)) {
            return `${key}=${value.join(',')}`
          }
          return `${key}=${value}`
        })
        .join('&')

      // Create signature string (params + secret)
      const signatureString = `${sortedParams}${apiSecret}`
      
      console.log('Signing string:', signatureString)
      
      // Generate signature using SHA-1
      const signature = crypto
        .createHash('sha1')
        .update(signatureString)
        .digest('hex')

      return NextResponse.json({
        signature,
      })
    } else {
      // Just return API key for initial widget setup
      return NextResponse.json({
        cloudName,
        apiKey: process.env.CLOUDINARY_API_KEY,
      })
    }
  } catch (error) {
    console.error('Error generating signature:', error)
    return NextResponse.json(
      { error: 'Failed to generate signature' },
      { status: 500 }
    )
  }
}

