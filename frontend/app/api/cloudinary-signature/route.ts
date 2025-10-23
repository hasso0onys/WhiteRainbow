import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { timestamp, folder } = body

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (!apiSecret || !cloudName) {
      return NextResponse.json(
        { error: 'Missing Cloudinary credentials' },
        { status: 500 }
      )
    }

    // Create signature string
    const signatureString = `folder=${folder || 'videos'}&timestamp=${timestamp}${apiSecret}`
    
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
    })
  } catch (error) {
    console.error('Error generating signature:', error)
    return NextResponse.json(
      { error: 'Failed to generate signature' },
      { status: 500 }
    )
  }
}

