'use client'

import { useCallback, useState } from 'react'
import { ObjectInputProps, set, unset } from 'sanity'
import { Stack, Card, Text, Button, Flex, TextInput, Box } from '@sanity/ui'
import {
  ImageIcon,
  PlayIcon,
  DocumentTextIcon,
  PlusIcon
} from '@sanity/icons'

export default function ProjectInput(props: ObjectInputProps) {
  const { value, onChange, schemaType } = props
  const [layoutType, setLayoutType] = useState<string>(value?.layoutType || '')

  // Handle field changes
  const handleFieldChange = useCallback(
    (field: string, fieldValue: any) => {
      onChange(fieldValue ? set(fieldValue, [field]) : unset([field]))
    },
    [onChange]
  )

  // Handle layout type selection
  const handleLayoutTypeChange = useCallback(
    (type: string) => {
      setLayoutType(type)
      handleFieldChange('layoutType', type)

      // Reset rightContent if switching to fullscreen
      if (type === 'fullscreen') {
        handleFieldChange('rightContent', undefined)
      }
    },
    [handleFieldChange]
  )

  // Handle content type selection
  const handleContentTypeSelect = useCallback(
    (side: 'left' | 'right', contentType: 'image' | 'video' | 'text' | 'media-overlay') => {
      const field = side === 'left' ? 'leftContent' : 'rightContent'
      const currentContent = value?.[field] || {}

      if (contentType === 'media-overlay') {
        // Image/Video with overlay text
        handleFieldChange(field, {
          ...currentContent,
          type: 'image', // Default to image, user can change
          overlayText: ''
        })
      } else {
        // Simple content type
        handleFieldChange(field, {
          ...currentContent,
          type: contentType,
          overlayText: undefined
        })
      }
    },
    [value, handleFieldChange]
  )

  // Render content selection box
  const renderContentBox = (side: 'left' | 'right', title: string) => {
    const field = side === 'left' ? 'leftContent' : 'rightContent'
    const content = value?.[field]

    if (!content?.type) {
      // Show selection options
      return (
        <Card
          padding={4}
          radius={2}
          shadow={1}
          style={{
            border: '2px dashed #ccc',
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text size={2} weight="semibold" style={{ marginBottom: '12px' }}>
            {title}
          </Text>

          <Flex direction="column" gap={3} style={{ width: '100%', maxWidth: '300px' }}>
            <Button
              mode="ghost"
              icon={ImageIcon}
              text="صورة فقط"
              onClick={() => handleContentTypeSelect(side, 'image')}
              style={{ justifyContent: 'flex-start', padding: '12px' }}
            />

            <Button
              mode="ghost"
              icon={PlayIcon}
              text="فيديو فقط"
              onClick={() => handleContentTypeSelect(side, 'video')}
              style={{ justifyContent: 'flex-start', padding: '12px' }}
            />

            <Button
              mode="ghost"
              icon={DocumentTextIcon}
              text="نص فقط"
              onClick={() => handleContentTypeSelect(side, 'text')}
              style={{ justifyContent: 'flex-start', padding: '12px' }}
            />

            <Button
              mode="ghost"
              icon={PlusIcon}
              text="صورة/فيديو + نص علوي"
              onClick={() => handleContentTypeSelect(side, 'media-overlay')}
              style={{ justifyContent: 'flex-start', padding: '12px' }}
            />
          </Flex>
        </Card>
      )
    }

    // Show selected content - render the actual input fields
    return (
      <Card padding={4} radius={2} shadow={1}>
        <Stack space={4}>
          <Flex justify="space-between" align="center">
            <Text size={2} weight="semibold">{title}</Text>
            <Button
              mode="ghost"
              text="تغيير"
              tone="critical"
              onClick={() => handleFieldChange(field, undefined)}
              fontSize={1}
            />
          </Flex>

          {/* Render fields based on schemaType */}
          {schemaType.fields?.map((field) => {
            if (field.name === side === 'left' ? 'leftContent' : 'rightContent') {
              // This is an object field, render its input
              const objectField = field as any
              return objectField.type.inputComponent ? (
                <div key={field.name}>
                  {objectField.type.inputComponent({
                    ...props,
                    schemaType: objectField.type,
                    value: content,
                    onChange: (patch: any) => {
                      handleFieldChange(side === 'left' ? 'leftContent' : 'rightContent', patch)
                    }
                  })}
                </div>
              ) : null
            }
            return null
          })}
        </Stack>
      </Card>
    )
  }

  return (
    <Stack space={5}>
      {/* Section 1: Basic Info */}
      <Card padding={4} radius={2} shadow={1}>
        <Stack space={4}>
          <Text size={2} weight="bold">المعلومات الأساسية</Text>

          <Box>
            <Text size={1} weight="semibold" style={{ marginBottom: '8px' }}>
              عنوان المشروع
            </Text>
            <TextInput
              value={value?.title || ''}
              onChange={(event) => handleFieldChange('title', event.currentTarget.value)}
              placeholder="أدخل عنوان المشروع"
            />
          </Box>

          <Box>
            <Text size={1} weight="semibold" style={{ marginBottom: '8px' }}>
              الرابط (Slug)
            </Text>
            <Flex gap={2} align="center">
              <TextInput
                value={value?.slug?.current || ''}
                onChange={(event) =>
                  handleFieldChange('slug', {
                    _type: 'slug',
                    current: event.currentTarget.value
                  })
                }
                placeholder="project-slug"
                style={{ flex: 1 }}
              />
              <Button
                text="توليد تلقائي"
                mode="ghost"
                onClick={() => {
                  if (value?.title) {
                    const slug = value.title
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, '')
                      .replace(/\s+/g, '-')
                    handleFieldChange('slug', { _type: 'slug', current: slug })
                  }
                }}
              />
            </Flex>
          </Box>
        </Stack>
      </Card>

      {/* Section 2: Order */}
      <Card padding={4} radius={2} shadow={1}>
        <Stack space={3}>
          <Text size={2} weight="bold">الترتيب</Text>
          <TextInput
            type="number"
            value={value?.order?.toString() || '0'}
            onChange={(event) => handleFieldChange('order', parseInt(event.currentTarget.value) || 0)}
            placeholder="0"
          />
        </Stack>
      </Card>

      {/* Section 3: Layout Type */}
      <Card padding={4} radius={2} shadow={1}>
        <Stack space={4}>
          <Text size={2} weight="bold">نوع التخطيط</Text>

          <Flex gap={3}>
            <Button
              mode={layoutType === 'fullscreen' ? 'default' : 'ghost'}
              text="شاشة كاملة (1×1)"
              onClick={() => handleLayoutTypeChange('fullscreen')}
              tone={layoutType === 'fullscreen' ? 'primary' : 'default'}
              style={{
                flex: 1,
                padding: '16px',
                fontSize: '16px'
              }}
            />

            <Button
              mode={layoutType === 'split' ? 'default' : 'ghost'}
              text="مقسم (2×1)"
              onClick={() => handleLayoutTypeChange('split')}
              tone={layoutType === 'split' ? 'primary' : 'default'}
              style={{
                flex: 1,
                padding: '16px',
                fontSize: '16px'
              }}
            />
          </Flex>
        </Stack>
      </Card>

      {/* Section 4: Content (shown after layout selection) */}
      {layoutType && (
        <Card padding={4} radius={2} shadow={1}>
          <Stack space={4}>
            <Text size={2} weight="bold">المحتوى</Text>

            {layoutType === 'fullscreen' ? (
              <Stack space={3}>
                {renderContentBox('left', 'المحتوى')}
              </Stack>
            ) : (
              <Flex gap={4}>
                <Box style={{ flex: 1 }}>
                  {renderContentBox('left', 'المحتوى الأيسر')}
                </Box>
                <Box style={{ flex: 1 }}>
                  {renderContentBox('right', 'المحتوى الأيمن')}
                </Box>
              </Flex>
            )}
          </Stack>
        </Card>
      )}

      {/* Section 5: Background Color */}
      <Card padding={4} radius={2} shadow={1}>
        <Stack space={3}>
          <Text size={2} weight="bold">لون الخلفية</Text>
          <TextInput
            value={value?.backgroundColor || ''}
            onChange={(event) => handleFieldChange('backgroundColor', event.currentTarget.value)}
            placeholder="#000000"
          />
        </Stack>
      </Card>
    </Stack>
  )
}
