import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { timestamp, folder, eager } = body

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (!apiSecret || !cloudName) {
      return NextResponse.json(
        { error: 'Missing Cloudinary credentials' },
        { status: 500 }
      )
    }

    // Build parameters for signature (must be alphabetically sorted)
    const params: any = {
      folder: folder || 'videos',
      timestamp: timestamp,
    }

    // Add eager transformations for video compression
    if (eager) {
      params.eager = eager
    }

    // Sort parameters alphabetically
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&')

    // Create signature string
    const signatureString = `${sortedParams}${apiSecret}`
    
    // Generate signature using SHA-1
    const signature = crypto
      .createHash('sha1')
      .update(signatureString)
      .digest('hex')

    return NextResponse.json({
      signature,
      timestamp,
      cloudName,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder: params.folder,
      eager: params.eager,
    })
  } catch (error) {
    console.error('Error generating signature:', error)
    return NextResponse.json(
      { error: 'Failed to generate signature' },
      { status: 500 }
    )
  }
}

