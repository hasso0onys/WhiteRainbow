'use client'

import { useCallback, useState } from 'react'
import { ObjectInputProps, set, unset } from 'sanity'
import { Stack, Card, Text, Button, Flex, Box } from '@sanity/ui'
import {
  ImageIcon,
  PlayIcon,
  DocumentTextIcon,
  AddIcon,
  TrashIcon
} from '@sanity/icons'

export default function ContentBoxInput(props: ObjectInputProps) {
  const { value, onChange, renderDefault } = props
  const [showFields, setShowFields] = useState(!!value?.type)

  // Handle content type selection
  const handleContentTypeSelect = (contentType: 'image' | 'video' | 'text') => {
    onChange([
      set(contentType, ['type']),
      unset(['overlayText'])
    ])
    setShowFields(true)
  }

  // Handle reset
  const handleReset = () => {
    onChange(unset())
    setShowFields(false)
  }

  // If no type selected, show selection box
  if (!showFields || !value?.type) {
    return (
      <Card
        padding={4}
        radius={3}
        shadow={1}
        tone="transparent"
        style={{
          border: '2px dashed #d1d5db',
          minHeight: '250px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fafafa',
          transition: 'all 0.2s ease'
        }}
      >
        <Text size={2} weight="semibold" style={{ marginBottom: '8px', color: '#6b7280' }}>
          اختر نوع المحتوى
        </Text>

        <Flex direction="column" gap={3} style={{ width: '100%', maxWidth: '280px' }}>
          <Button
            mode="ghost"
            icon={ImageIcon}
            text="صورة فقط"
            onClick={() => handleContentTypeSelect('image')}
            style={{
              justifyContent: 'flex-start',
              padding: '14px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              backgroundColor: 'white',
              fontSize: '15px',
              fontWeight: '500'
            }}
          />

          <Button
            mode="ghost"
            icon={PlayIcon}
            text="فيديو فقط"
            onClick={() => handleContentTypeSelect('video')}
            style={{
              justifyContent: 'flex-start',
              padding: '14px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              backgroundColor: 'white',
              fontSize: '15px',
              fontWeight: '500'
            }}
          />

          <Button
            mode="ghost"
            icon={DocumentTextIcon}
            text="نص فقط"
            onClick={() => handleContentTypeSelect('text')}
            style={{
              justifyContent: 'flex-start',
              padding: '14px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              backgroundColor: 'white',
              fontSize: '15px',
              fontWeight: '500'
            }}
          />
        </Flex>
      </Card>
    )
  }

  // Show selected content with fields
  const contentTypeLabels = {
    image: 'صورة',
    video: 'فيديو',
    text: 'نص'
  }

  const hasOverlay = value?.overlayText !== undefined

  return (
    <Card padding={4} radius={3} shadow={1} tone="transparent" style={{ backgroundColor: '#f9fafb' }}>
      <Stack space={4}>
        {/* Header */}
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={2}>
            {value.type === 'image' && <ImageIcon style={{ fontSize: '20px' }} />}
            {value.type === 'video' && <PlayIcon style={{ fontSize: '20px' }} />}
            {value.type === 'text' && <DocumentTextIcon style={{ fontSize: '20px' }} />}
            <Text size={2} weight="semibold">
              {contentTypeLabels[value.type] || value.type}
              {hasOverlay && ' + نص علوي'}
            </Text>
          </Flex>

          <Button
            mode="ghost"
            text="تغيير"
            icon={TrashIcon}
            tone="critical"
            onClick={handleReset}
            fontSize={1}
          />
        </Flex>

        {/* Render fields based on content type */}
        <Card padding={4} radius={2} tone="default" style={{ backgroundColor: 'white' }}>
          {renderDefault(props)}
        </Card>

        {/* Add overlay option for image/video */}
        {(value.type === 'image' || value.type === 'video') && !hasOverlay && (
          <Button
            mode="ghost"
            icon={AddIcon}
            text="إضافة نص علوي"
            onClick={() => onChange(set('', ['overlayText']))}
            tone="primary"
            style={{ alignSelf: 'flex-start' }}
          />
        )}
      </Stack>
    </Card>
  )
}
