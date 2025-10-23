import React, { useState, useEffect, useRef } from 'react'
import { StringInputProps, set, unset } from 'sanity'
import { Stack, Button, Card, Text, Box, Flex } from '@sanity/ui'

declare global {
  interface Window {
    cloudinary: any
  }
}

export const CloudinaryVideoInput = (props: StringInputProps) => {
  const { value, onChange } = props
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(value || '')
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Load Cloudinary widget script
    const script = document.createElement('script')
    script.src = 'https://upload-widget.cloudinary.com/global/all.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  useEffect(() => {
    setPreviewUrl(value || '')
  }, [value])

  const openUploadWidget = async () => {
    if (!window.cloudinary) {
      alert('جاري تحميل أداة الرفع، يرجى المحاولة مرة أخرى')
      return
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dp7vp2rec'

    // Get API key from backend first
    let apiKey = ''
    try {
      const response = await fetch('/api/cloudinary-signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: Math.round(new Date().getTime() / 1000),
          folder: 'videos',
        }),
      })
      const data = await response.json()
      apiKey = data.apiKey
    } catch (error) {
      console.error('Error getting API key:', error)
      alert('حدث خطأ في الاتصال بالسيرفر')
      return
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        apiKey, // Add API key here for signed uploads
        sources: ['local', 'url', 'camera'],
        resourceType: 'video',
        maxFileSize: 500000000, // 500MB (5x larger!)
        clientAllowedFormats: ['mp4', 'mov', 'avi', 'webm'],
        showPoweredBy: false,
        language: 'ar',
        
        // Enable chunked upload for large files
        chunked: true,
        chunkSize: 6000000, // 6MB chunks (recommended for large files)
        maxChunkSize: 20000000, // 20MB max chunk size
        
        // Signed upload - allows files larger than 100MB
        uploadSignature: async (callback: any, paramsToSign: any) => {
          try {
            // Define eager transformations for video compression
            const eagerTransforms = 'q_auto:good,vc_auto,br_1m'
            
            const response = await fetch('/api/cloudinary-signature', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                timestamp: paramsToSign.timestamp,
                folder: 'videos',
                eager: eagerTransforms,
              }),
            })
            
            const data = await response.json()
            callback(data.signature)
          } catch (error) {
            console.error('Error getting signature:', error)
            alert('حدث خطأ في التوقيع، يرجى المحاولة مرة أخرى')
          }
        },
        
        // Video optimization & compression
        transformation: {
          quality: 'auto:best',
          fetch_format: 'auto',
          video_codec: 'auto',
        },
        
        // Auto-optimize video on upload
        eager: [
          {
            quality: 'auto:good',
            fetch_format: 'auto',
            video_codec: 'auto',
            bit_rate: '1m', // 1Mbps - balance between quality and size
          },
        ],
        
        text: {
          ar: {
            'menu.files': 'ملفاتي',
            'menu.web': 'عنوان ويب',
            'menu.camera': 'الكاميرا',
            'local.browse': 'تصفح',
            'local.dd_title_single': 'اسحب وأفلت الفيديو هنا',
            'local.dd_title_multi': 'اسحب وأفلت الفيديوهات هنا',
          },
        },
      },
      (error: any, result: any) => {
        if (error) {
          console.error('خطأ في الرفع:', error)
          alert('حدث خطأ أثناء رفع الفيديو')
          setUploading(false)
          return
        }

        if (result.event === 'success') {
          // Get optimized URL with transformations
          const publicId = result.info.public_id
          const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dp7vp2rec'
          
          // Build optimized video URL with compression parameters
          const optimizedUrl = `https://res.cloudinary.com/${cloudName}/video/upload/q_auto:good,vc_auto,br_1m/${publicId}.mp4`
          
          onChange(value ? set(optimizedUrl) : set(optimizedUrl))
          setPreviewUrl(optimizedUrl)
          setUploading(false)
          widget.close()
        }

        if (result.event === 'close') {
          setUploading(false)
        }
      }
    )

    setUploading(true)
    widget.open()
  }

  const handleRemove = () => {
    onChange(unset())
    setPreviewUrl('')
  }

  return (
    <Stack space={3}>
      <Flex gap={2}>
        <Button
          text={previewUrl ? 'تغيير الفيديو' : 'رفع فيديو'}
          tone="primary"
          onClick={openUploadWidget}
          disabled={uploading}
          loading={uploading}
        />
        {previewUrl && (
          <Button text="حذف" tone="critical" onClick={handleRemove} />
        )}
      </Flex>

      {previewUrl && (
        <Card padding={3} radius={2} shadow={1}>
          <Stack space={2}>
            <Text size={1} muted>
              معاينة الفيديو
            </Text>
            <Box>
              <video
                ref={videoRef}
                src={previewUrl}
                controls
                style={{
                  width: '100%',
                  maxHeight: '400px',
                  borderRadius: '4px',
                }}
                onMouseEnter={() => {
                  if (videoRef.current) {
                    videoRef.current.play()
                  }
                }}
                onMouseLeave={() => {
                  if (videoRef.current) {
                    videoRef.current.pause()
                  }
                }}
              />
            </Box>
            <Text size={1} muted style={{ wordBreak: 'break-all' }}>
              {previewUrl}
            </Text>
          </Stack>
        </Card>
      )}
    </Stack>
  )
}
