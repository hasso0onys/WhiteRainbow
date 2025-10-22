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

  const openUploadWidget = () => {
    if (!window.cloudinary) {
      alert('جاري تحميل أداة الرفع، يرجى المحاولة مرة أخرى')
      return
    }

    const cloudName = process.env.SANITY_STUDIO_CLOUDINARY_CLOUD_NAME || 'dp7vp2rec'
    const uploadPreset = process.env.SANITY_STUDIO_CLOUDINARY_UPLOAD_PRESET || 'ml_default'

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        sources: ['local', 'url', 'camera'],
        resourceType: 'video',
        maxFileSize: 100000000, // 100MB
        clientAllowedFormats: ['mp4', 'mov', 'avi', 'webm'],
        showPoweredBy: false,
        language: 'ar',
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
          const videoUrl = result.info.secure_url
          onChange(value ? set(videoUrl) : set(videoUrl))
          setPreviewUrl(videoUrl)
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
