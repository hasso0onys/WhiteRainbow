import React, { useState, useRef, useEffect } from 'react'
import { StringInputProps, set, unset, useFormValue } from 'sanity'
import { Stack, Card, Text, Flex, Button, Select, Box, Label } from '@sanity/ui'
import { ImageIcon } from '@sanity/icons'
import imageUrlBuilder from '@sanity/image-url'
import { createClient } from '@sanity/client'

// Create Sanity client for image URLs
const client = createClient({
  projectId: '37ji4wok',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

// Image URL builder
const builder = imageUrlBuilder(client)
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Star,
  Sparkles,
  Target,
  Palette,
  Drama,
  Film,
  Smartphone,
  Lightbulb,
  Rocket,
  Zap,
  Flame,
  Diamond,
  Crown,
  Trophy,
  Music,
  Check,
  ArrowRight,
  Circle
} from 'lucide-react'

const iconOptions = [
  { value: 'star', label: 'نجمة', Icon: Star },
  { value: 'sparkles', label: 'بريق', Icon: Sparkles },
  { value: 'target', label: 'هدف', Icon: Target },
  { value: 'palette', label: 'فن', Icon: Palette },
  { value: 'theater', label: 'مسرح', Icon: Drama },
  { value: 'cinema', label: 'سينما', Icon: Film },
  { value: 'mobile', label: 'موبايل', Icon: Smartphone },
  { value: 'lightbulb', label: 'فكرة', Icon: Lightbulb },
  { value: 'rocket', label: 'صاروخ', Icon: Rocket },
  { value: 'lightning', label: 'برق', Icon: Zap },
  { value: 'fire', label: 'نار', Icon: Flame },
  { value: 'diamond', label: 'ماس', Icon: Diamond },
  { value: 'crown', label: 'تاج', Icon: Crown },
  { value: 'trophy', label: 'كأس', Icon: Trophy },
  { value: 'music', label: 'موسيقى', Icon: Music },
  { value: 'check', label: 'صح', Icon: Check },
  { value: 'arrow', label: 'سهم', Icon: ArrowRight },
]

const iconSvgMap: Record<string, string> = {
  star: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  sparkles: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>',
  target: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  rocket: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
  fire: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
  crown: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>',
  trophy: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
  check: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
  arrow: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  lightning: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  diamond: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"/></svg>',
  music: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
}

export default function OverlayTextInput(props: StringInputProps) {
  const { value, onChange } = props

  // Get parent content data (image/video)
  const parentValue = useFormValue([]) as any
  const contentType = parentValue?.type
  const image = parentValue?.image
  const videoUrl = parentValue?.cloudinaryVideo

  const currentValue = value ? JSON.parse(value as string) : {
    text: '',
    html: '',
    fontSize: 'large',
    fontWeight: 'light',
    textAlign: 'center',
    verticalAlign: 'center',
    icon: 'none',
    iconPosition: 'top',
    backgroundColor: 'blackMedium',
    textColor: 'white',
  }

  const [config, setConfig] = useState(currentValue)
  const editorRef = useRef<HTMLDivElement>(null)
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null)
  const [editorMode, setEditorMode] = useState<'visual' | 'code'>('visual')
  const [htmlCode, setHtmlCode] = useState(currentValue.html || '')

  // Default HTML template for pure text content (requested)
  const DEFAULT_TEXT_HTML = `
<div style="
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: clamp(12px, 4vw, 50px);
    height: 100%;
    width: 100%;
    background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
    font-family: 'Cairo', sans-serif;
    direction: rtl;
    box-sizing: border-box;
">
    <h2 style="
        margin: 0 0 clamp(15px, 3.5vw, 35px) 0;
        font-size: clamp(0.9em, 3.5vw, 2.2em);
        font-weight: 700;
        color: #ffffff;
        text-shadow: 2px 4px 12px rgba(0,0,0,0.6);
        letter-spacing: 0.8px;
        border-bottom: 2.5px solid #ffffff;
        padding-bottom: clamp(6px, 2vw, 18px);
        width: 100%;
    ">xxxxx</h2>
    
    <div style="width: 100%; display: flex; flex-direction: column; gap: clamp(12px, 2.5vw, 30px);">
        
        <div style="display: flex; flex-direction: column; gap: 5px;">
            <div style="
                font-size: clamp(0.55em, 1.8vw, 0.8em);
                color: #888888;
                text-transform: uppercase;
                letter-spacing: 1.8px;
                font-weight: 400;
            ">الموقع</div>
            <div style="
                font-size: clamp(0.95em, 2.8vw, 1.6em);
                color: #ffffff;
                font-weight: 600;
            ">xxxx</div>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 5px;">
            <div style="
                font-size: clamp(0.55em, 1.8vw, 0.8em);
                color: #888888;
                text-transform: uppercase;
                letter-spacing: 1.8px;
                font-weight: 400;
            ">عدد الأجهزة</div>
            <div style="
                font-size: clamp(0.95em, 2.8vw, 1.6em);
                color: #ffffff;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 9px;
            ">
                <span style="font-size: clamp(1.4em, 3.5vw, 2.2em); font-weight: 700;">x</span>
                <span style="font-size: 0.7em; color: #cccccc;">أجهزة</span>
            </div>
        </div>
        
    </div>
    
    <div style="
        width: clamp(60px, 18vw, 120px);
        height: 2.5px;
        background: linear-gradient(90deg, #ffffff, transparent);
        margin-top: clamp(15px, 3.5vw, 35px);
        opacity: 0.6;
    "></div>
</div>`

  // Auto-apply default template when field is the main "text" and empty
  useEffect(() => {
    const lastPathSegment = (props as any)?.path?.[(props as any)?.path?.length - 1]
    const fieldName = typeof lastPathSegment === 'string' ? lastPathSegment : (lastPathSegment?.toString?.() ?? '')
    const isMainTextField = fieldName === 'text'

    if (isMainTextField && (!currentValue.html || String(currentValue.html).trim() === '')) {
      const initial = { ...currentValue, html: DEFAULT_TEXT_HTML, text: 'نص' }
      setConfig(initial)
      setHtmlCode(DEFAULT_TEXT_HTML)
      onChange(set(JSON.stringify(initial)))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Generate image URL from Sanity image
  const imageUrl = image?.asset ? builder.image(image).width(800).url() : null

  // Track selected image in editor
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'IMG' && editorRef.current?.contains(target)) {
        setSelectedImage(target as HTMLImageElement)
        // Add selection border
        target.style.outline = '3px solid #3b82f6'
      } else {
        // Remove selection border from all images
        if (selectedImage) {
          selectedImage.style.outline = 'none'
          setSelectedImage(null)
        }
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [selectedImage])

  const updateValue = (newConfig: typeof config) => {
    setConfig(newConfig)
    onChange(set(JSON.stringify(newConfig)))
  }

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    saveContent()
  }

  const applyFontSize = (size: string) => {
    document.execCommand('fontSize', false, '7')
    const fontElements = editorRef.current?.querySelectorAll('font[size="7"]')
    fontElements?.forEach((element) => {
      const span = document.createElement('span')
      span.style.fontSize = size
      span.innerHTML = element.innerHTML
      element.parentNode?.replaceChild(span, element)
    })
    saveContent()
  }

  const applyColor = (color: string) => {
    document.execCommand('foreColor', false, color)
    saveContent()
  }

  const insertIcon = (iconKey: string) => {
    const svg = iconSvgMap[iconKey]
    if (svg && editorRef.current) {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        range.deleteContents()

        const span = document.createElement('span')
        span.innerHTML = svg
        span.style.display = 'inline-block'
        span.style.verticalAlign = 'middle'
        span.style.marginLeft = '0.2em'
        span.style.marginRight = '0.2em'
        span.contentEditable = 'false'

        range.insertNode(span)
        range.setStartAfter(span)
        range.setEndAfter(span)
        selection.removeAllRanges()
        selection.addRange(range)

        editorRef.current.focus()
        saveContent()
      }
    }
  }

  // Insert image from file
  const insertImage = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e: any) => {
      const file = e.target?.files?.[0]
      if (file && editorRef.current) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const imgDataUrl = event.target?.result as string

          const selection = window.getSelection()
          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0)

            const img = document.createElement('img')
            img.src = imgDataUrl
            img.style.maxWidth = '300px'
            img.style.height = 'auto'
            img.style.display = 'inline-block'
            img.style.margin = '8px'
            img.style.borderRadius = '4px'
            img.style.verticalAlign = 'middle'
            img.contentEditable = 'false'
            img.setAttribute('data-image-width', '300')

            range.deleteContents()
            range.insertNode(img)
            range.setStartAfter(img)
            range.setEndAfter(img)
            selection.removeAllRanges()
            selection.addRange(range)

            editorRef.current?.focus()
            saveContent()
          }
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  // Resize selected image
  const resizeImage = (size: 'small' | 'medium' | 'large' | 'full') => {
    if (selectedImage) {
      const sizeMap = {
        small: '200px',
        medium: '300px',
        large: '500px',
        full: '100%'
      }
      selectedImage.style.maxWidth = sizeMap[size]
      selectedImage.setAttribute('data-image-width', sizeMap[size])
      saveContent()
    }
  }

  // Delete selected image
  const deleteSelectedImage = () => {
    if (selectedImage) {
      selectedImage.remove()
      setSelectedImage(null)
      saveContent()
    }
  }

  const saveContent = () => {
    if (editorMode === 'visual' && editorRef.current) {
      // Clone the content to clean it before saving
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = editorRef.current.innerHTML

      // Remove all editor-only styles from images
      const images = tempDiv.querySelectorAll('img')
      images.forEach(img => {
        img.style.outline = 'none'
        img.style.cursor = ''
      })

      const html = tempDiv.innerHTML
      const text = editorRef.current.innerText
      setHtmlCode(html)

      const newConfig = { ...config, html, text }
      setConfig(newConfig)
      updateValue(newConfig)

      console.log('Saved (visual):', newConfig)
    } else if (editorMode === 'code') {
      // Save from code editor
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = htmlCode
      const text = tempDiv.innerText

      const newConfig = { ...config, html: htmlCode, text }
      setConfig(newConfig)
      updateValue(newConfig)

      console.log('Saved (code):', newConfig)
    }
  }

  // Switch between editor modes
  const switchToCodeMode = () => {
    if (editorRef.current) {
      setHtmlCode(editorRef.current.innerHTML)
    }
    setEditorMode('code')
  }

  const switchToVisualMode = () => {
    setEditorMode('visual')
    // Update visual editor with code changes
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = htmlCode
        saveContent()
      }
    }, 100)
  }


  const handleEditorInput = () => {
    saveContent()
  }

  useEffect(() => {
    if (editorRef.current && currentValue.html) {
      editorRef.current.innerHTML = currentValue.html
    }
  }, [])

  // Style mappings for preview
  const fontSizeMap = {
    small: '24px',
    medium: '32px',
    large: '48px',
    xlarge: '64px',
  }

  const fontWeightMap = {
    light: '300',
    normal: '400',
    medium: '500',
    bold: '700',
  }

  const backgroundColorMap = {
    transparent: 'transparent',
    blackLight: 'rgba(0, 0, 0, 0.2)',
    blackMedium: 'rgba(0, 0, 0, 0.4)',
    blackHeavy: 'rgba(0, 0, 0, 0.7)',
    whiteLight: 'rgba(255, 255, 255, 0.2)',
    whiteMedium: 'rgba(255, 255, 255, 0.4)',
  }

  const textColorMap = {
    white: '#ffffff',
    black: '#000000',
    gray: '#d1d5db',
    gold: '#fbbf24',
    silver: '#e5e7eb',
  }

  const alignItemsMap = {
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end',
  }

  const SelectedIcon = iconOptions.find(opt => opt.value === config.icon)?.Icon || Circle

  const flexDirectionMap: Record<string, 'row' | 'column' | 'row-reverse' | 'column-reverse'> = {
    top: 'column',
    bottom: 'column-reverse',
    right: 'row-reverse',
    left: 'row',
  }

  return (
    <Stack space={4}>
      {/* Editor Mode Tabs */}
      <Card padding={2} radius={2} shadow={1}>
        <Flex gap={2}>
          <Button
            mode={editorMode === 'visual' ? 'default' : 'ghost'}
            text="محرر مرئي"
            onClick={switchToVisualMode}
            tone={editorMode === 'visual' ? 'primary' : 'default'}
            style={{ flex: 1 }}
          />
          <Button
            mode={editorMode === 'code' ? 'default' : 'ghost'}
            text="HTML + CSS"
            onClick={switchToCodeMode}
            tone={editorMode === 'code' ? 'primary' : 'default'}
            style={{ flex: 1 }}
          />
        </Flex>
      </Card>

      {/* Visual Editor */}
      {editorMode === 'visual' && (
        <Card padding={3} radius={2} shadow={1}>
          <Stack space={3}>
            <Text size={1} weight="semibold">محرر النصوص المرئي</Text>

          {/* Toolbar */}
          <Stack space={2}>
            {/* Row 1: Text Formatting */}
            <Flex gap={1} wrap="wrap" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '8px' }}>
              <Button
                mode="ghost"
                icon={Bold}
                onClick={() => applyFormat('bold')}
                title="عريض"
                fontSize={1}
              />
              <Button
                mode="ghost"
                icon={Italic}
                onClick={() => applyFormat('italic')}
                title="مائل"
                fontSize={1}
              />
              <Button
                mode="ghost"
                icon={Underline}
                onClick={() => applyFormat('underline')}
                title="تحته خط"
                fontSize={1}
              />

              <Box style={{ width: '1px', height: '24px', backgroundColor: '#e0e0e0', margin: '0 4px' }} />

              <Button
                mode="ghost"
                icon={AlignRight}
                onClick={() => applyFormat('justifyRight')}
                title="يمين"
                fontSize={1}
              />
              <Button
                mode="ghost"
                icon={AlignCenter}
                onClick={() => applyFormat('justifyCenter')}
                title="وسط"
                fontSize={1}
              />
              <Button
                mode="ghost"
                icon={AlignLeft}
                onClick={() => applyFormat('justifyLeft')}
                title="يسار"
                fontSize={1}
              />
            </Flex>

            {/* Row 2: Font Size */}
            <Flex gap={2} align="center">
              <Text size={1} muted>حجم الخط:</Text>
              <Button
                mode="ghost"
                text="صغير"
                onClick={() => applyFontSize('0.75em')}
                fontSize={0}
              />
              <Button
                mode="ghost"
                text="عادي"
                onClick={() => applyFontSize('1em')}
                fontSize={1}
              />
              <Button
                mode="ghost"
                text="كبير"
                onClick={() => applyFontSize('1.5em')}
                fontSize={2}
              />
              <Button
                mode="ghost"
                text="كبير جداً"
                onClick={() => applyFontSize('2em')}
                fontSize={3}
              />
            </Flex>

            {/* Row 3: Colors */}
            <Flex gap={2} align="center" wrap="wrap">
              <Text size={1} muted>اللون:</Text>
              <Button
                mode="ghost"
                style={{ backgroundColor: '#ffffff', border: '1px solid #ccc', width: '32px', height: '32px' }}
                onClick={() => applyColor('#ffffff')}
                title="أبيض"
              />
              <Button
                mode="ghost"
                style={{ backgroundColor: '#000000', width: '32px', height: '32px' }}
                onClick={() => applyColor('#000000')}
                title="أسود"
              />
              <Button
                mode="ghost"
                style={{ backgroundColor: '#d1d5db', width: '32px', height: '32px' }}
                onClick={() => applyColor('#d1d5db')}
                title="رمادي"
              />
              <Button
                mode="ghost"
                style={{ backgroundColor: '#fbbf24', width: '32px', height: '32px' }}
                onClick={() => applyColor('#fbbf24')}
                title="ذهبي"
              />
              <Button
                mode="ghost"
                style={{ backgroundColor: '#e5e7eb', width: '32px', height: '32px' }}
                onClick={() => applyColor('#e5e7eb')}
                title="فضي"
              />
              <Button
                mode="ghost"
                style={{ backgroundColor: '#ef4444', width: '32px', height: '32px' }}
                onClick={() => applyColor('#ef4444')}
                title="أحمر"
              />
              <Button
                mode="ghost"
                style={{ backgroundColor: '#3b82f6', width: '32px', height: '32px' }}
                onClick={() => applyColor('#3b82f6')}
                title="أزرق"
              />
              <Button
                mode="ghost"
                style={{ backgroundColor: '#10b981', width: '32px', height: '32px' }}
                onClick={() => applyColor('#10b981')}
                title="أخضر"
              />
            </Flex>

            {/* Row 4: Image and Icons */}
            <Flex gap={2} align="center" wrap="wrap" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '8px' }}>
              <Text size={1} muted>إدراج:</Text>
              <Button
                mode="ghost"
                icon={ImageIcon}
                text="صورة"
                onClick={insertImage}
                fontSize={1}
                tone="primary"
              />
            </Flex>

            {/* Row 4.5: Image Controls (shown when image is selected) */}
            {selectedImage && (
              <Flex gap={2} align="center" wrap="wrap" style={{ backgroundColor: '#eff6ff', padding: '8px', borderRadius: '4px' }}>
                <Text size={1} weight="semibold" style={{ color: '#1e40af' }}>حجم الصورة:</Text>
                <Button
                  mode="ghost"
                  text="صغير"
                  onClick={() => resizeImage('small')}
                  fontSize={0}
                />
                <Button
                  mode="ghost"
                  text="متوسط"
                  onClick={() => resizeImage('medium')}
                  fontSize={1}
                />
                <Button
                  mode="ghost"
                  text="كبير"
                  onClick={() => resizeImage('large')}
                  fontSize={2}
                />
                <Button
                  mode="ghost"
                  text="كامل"
                  onClick={() => resizeImage('full')}
                  fontSize={1}
                />
                <Box style={{ width: '1px', height: '24px', backgroundColor: '#e0e0e0', margin: '0 4px' }} />
                <Button
                  mode="ghost"
                  text="حذف الصورة"
                  onClick={deleteSelectedImage}
                  tone="critical"
                  fontSize={1}
                />
              </Flex>
            )}

            {/* Row 5: Icons */}
            <Stack space={2}>
              <Text size={1} muted>إدراج أيقونة:</Text>
              <Flex gap={1} wrap="wrap">
                {iconOptions.map((option) => {
                  const Icon = option.Icon
                  return (
                    <Button
                      key={option.value}
                      mode="ghost"
                      onClick={() => insertIcon(option.value)}
                      title={option.label}
                      style={{ padding: '6px' }}
                    >
                      <Icon size={18} />
                    </Button>
                  )
                })}
              </Flex>
            </Stack>
          </Stack>

          {/* Editor */}
          <Box
            ref={editorRef}
            contentEditable
            onInput={handleEditorInput}
            style={{
              minHeight: '150px',
              padding: '16px',
              border: '2px solid #d0d0d0',
              borderRadius: '4px',
              outline: 'none',
              fontSize: '16px',
              lineHeight: '1.6',
              direction: 'rtl',
              backgroundColor: '#fafafa',
            }}
          />
          <Text size={0} muted>💡 حدد النص لتطبيق التنسيق. استخدم Enter لسطر جديد.</Text>
        </Stack>
      </Card>
      )}

      {/* Code Editor (HTML with inline CSS) */}
      {editorMode === 'code' && (
        <Card padding={3} radius={2} shadow={1}>
          <Stack space={3}>
            <Text size={1} weight="semibold">محرر الكود (HTML مع inline CSS)</Text>

            {/* Combined HTML + CSS Editor */}
            <Box>
              <Label muted size={1}>HTML مع inline styles</Label>
              <textarea
                value={htmlCode}
                onChange={(e) => {
                  setHtmlCode(e.target.value)
                }}
                onBlur={saveContent}
                placeholder='<div style="color: white; font-size: 24px; text-align: center;">النص هنا</div>'
                rows={16}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #d0d0d0',
                  borderRadius: '4px',
                  outline: 'none',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  lineHeight: '1.5',
                  backgroundColor: '#1e1e1e',
                  color: '#d4d4d4',
                  resize: 'vertical',
                }}
              />
              <Text size={0} muted style={{ marginTop: '8px' }}>
                💡 اكتب HTML مباشرة مع CSS inline styles داخل attribute style=""
              </Text>
            </Box>

            {/* Save Button */}
            <Button
              mode="default"
              text="💾 حفظ التغييرات"
              onClick={saveContent}
              tone="positive"
            />
          </Stack>
        </Card>
      )}

      {/* Global Settings */}
      <Card padding={3} radius={2} shadow={1}>
        <Stack space={3}>
          <Text size={1} weight="semibold">إعدادات عامة</Text>

          <Flex gap={3} wrap="wrap">
            {/* Vertical Align */}
            <Box flex={1} style={{ minWidth: '150px' }}>
              <Text size={1} muted>المحاذاة العمودية</Text>
              <Select
                value={config.verticalAlign}
                onChange={(e) => updateValue({ ...config, verticalAlign: e.currentTarget.value })}
              >
                <option value="top">أعلى</option>
                <option value="center">وسط</option>
                <option value="bottom">أسفل</option>
              </Select>
            </Box>

            {/* Background */}
            <Box flex={1} style={{ minWidth: '150px' }}>
              <Text size={1} muted>خلفية النص</Text>
              <Select
                value={config.backgroundColor}
                onChange={(e) => updateValue({ ...config, backgroundColor: e.currentTarget.value })}
              >
                <option value="transparent">شفاف</option>
                <option value="blackLight">أسود خفيف</option>
                <option value="blackMedium">أسود متوسط</option>
                <option value="blackHeavy">أسود ثقيل</option>
                <option value="whiteLight">أبيض خفيف</option>
                <option value="whiteMedium">أبيض متوسط</option>
              </Select>
            </Box>
          </Flex>
        </Stack>
      </Card>

      {/* Live Preview */}
      <Card padding={3} radius={2} shadow={1} tone="primary">
        <Stack space={3}>
          <Text size={1} weight="semibold">معاينة مباشرة</Text>

          <Box
            style={{
              width: '100%',
              height: '400px',
              background: imageUrl
                ? `url(${imageUrl})`
                : videoUrl
                  ? '#1a1a1a'
                  : '#000000',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              display: 'flex',
              alignItems: alignItemsMap[config.verticalAlign],
              justifyContent: 'center',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            {/* Video element if video URL exists */}
            {videoUrl && (
              <video
                src={videoUrl}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                autoPlay
                loop
                muted
                playsInline
              />
            )}

            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: backgroundColorMap[config.backgroundColor],
                backdropFilter: config.backgroundColor !== 'transparent' ? 'blur(8px)' : 'none',
                display: 'flex',
                alignItems: alignItemsMap[config.verticalAlign],
                justifyContent: 'center',
                padding: '32px',
              }}
            >
              {(config.html || config.text) && (
                <div
                  dangerouslySetInnerHTML={{ __html: config.html || config.text }}
                  style={{
                    fontSize: fontSizeMap[config.fontSize],
                    fontWeight: fontWeightMap[config.fontWeight],
                    color: textColorMap[config.textColor],
                    maxWidth: '800px',
                    lineHeight: '1.4',
                  }}
                />
              )}
            </div>
          </Box>
        </Stack>
      </Card>
    </Stack>
  )
}
