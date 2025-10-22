'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { urlFor } from '@/lib/sanity'
import { ContentItem, LogoSettings } from '@/lib/types'
import { replaceTemplateVars } from '@/lib/templateVars'
import {
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
  Circle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Maximize2,
  X
} from 'lucide-react'

interface ContentBlockProps {
  content: ContentItem
  logo?: any // Can be old or new format
}

// Icon mapping with Lucide React components
const iconMap: Record<string, any> = {
  star: Star,
  sparkles: Sparkles,
  target: Target,
  palette: Palette,
  theater: Drama,
  cinema: Film,
  mobile: Smartphone,
  lightbulb: Lightbulb,
  rocket: Rocket,
  lightning: Zap,
  fire: Flame,
  diamond: Diamond,
  crown: Crown,
  trophy: Trophy,
  music: Music,
  check: Check,
  arrow: ArrowRight,
}

export default function ContentBlock({ content, logo }: ContentBlockProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const modalVideoRef = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalPlaying, setModalPlaying] = useState(false)
  const [modalMuted, setModalMuted] = useState(true)
  const [modalProgress, setModalProgress] = useState(0)
  const [modalDuration, setModalDuration] = useState(0)

  useEffect(() => {
    if (!videoRef.current) return

    const video = videoRef.current

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            video.play()
            setIsPlaying(true)
          } else {
            video.pause()
            setIsPlaying(false)
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(video)

    // Event listeners for video
    const handleTimeUpdate = () => {
      setProgress((video.currentTime / video.duration) * 100)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('ended', handleEnded)

    return () => {
      observer.disconnect()
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = pos * videoRef.current.duration
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const openModal = () => {
    setIsModalOpen(true)
    if (modalVideoRef.current) {
      modalVideoRef.current.currentTime = 0  // Start from beginning
      modalVideoRef.current.play()
      setModalPlaying(true)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    if (modalVideoRef.current) {
      modalVideoRef.current.pause()
      setModalPlaying(false)
    }
  }

  const toggleModalPlay = () => {
    if (modalVideoRef.current) {
      if (modalPlaying) {
        modalVideoRef.current.pause()
      } else {
        modalVideoRef.current.play()
      }
      setModalPlaying(!modalPlaying)
    }
  }

  const toggleModalMute = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !modalMuted
      setModalMuted(!modalMuted)
    }
  }

  const restartModalVideo = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.currentTime = 0
      modalVideoRef.current.play()
      setModalPlaying(true)
    }
  }

  const handleModalProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalVideoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      modalVideoRef.current.currentTime = pos * modalVideoRef.current.duration
    }
  }

  useEffect(() => {
    if (!modalVideoRef.current) return

    const video = modalVideoRef.current

    const handleTimeUpdate = () => {
      setModalProgress((video.currentTime / video.duration) * 100)
    }

    const handleLoadedMetadata = () => {
      setModalDuration(video.duration)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [isModalOpen])

  // Auto-play video when modal opens
  useEffect(() => {
    if (isModalOpen && modalVideoRef.current) {
      const playVideo = async () => {
        try {
          modalVideoRef.current!.currentTime = 0
          modalVideoRef.current!.muted = false  // Unmute for fullscreen
          setModalMuted(false)
          await modalVideoRef.current!.play()
          setModalPlaying(true)
        } catch (error) {
          console.log('Auto-play blocked:', error)
        }
      }
      playVideo()
    }
  }, [isModalOpen])

  // Helper function to get styles based on overlay settings
  const getOverlayStyles = (overlayData?: any) => {
    if (!overlayData) return {}

    const overlay = overlayData

    // Font size classes
    const fontSizeClasses = {
      small: 'text-2xl md:text-3xl lg:text-4xl',
      medium: 'text-3xl md:text-4xl lg:text-5xl',
      large: 'text-4xl md:text-6xl lg:text-7xl',
      xlarge: 'text-5xl md:text-7xl lg:text-8xl',
    }

    // Font weight classes
    const fontWeightClasses = {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      bold: 'font-bold',
    }

    // Text align classes
    const textAlignClasses = {
      right: 'text-right',
      center: 'text-center',
      left: 'text-left',
    }

    // Vertical align classes
    const verticalAlignClasses = {
      top: 'items-start pt-12',
      center: 'items-center',
      bottom: 'items-end pb-12',
    }

    // Background color classes
    const backgroundColorClasses = {
      transparent: 'bg-transparent',
      blackLight: 'bg-black/20 backdrop-blur-sm',
      blackMedium: 'bg-black/40 backdrop-blur-sm',
      blackHeavy: 'bg-black/70 backdrop-blur-md',
      whiteLight: 'bg-white/20 backdrop-blur-sm',
      whiteMedium: 'bg-white/40 backdrop-blur-sm',
    }

    // Text color classes
    const textColorClasses = {
      white: 'text-white',
      black: 'text-black',
      gray: 'text-gray-300',
      gold: 'text-yellow-400',
      silver: 'text-gray-200',
    }

    return {
      fontSize: fontSizeClasses[overlay.fontSize || 'large'],
      fontWeight: fontWeightClasses[overlay.fontWeight || 'light'],
      textAlign: textAlignClasses[overlay.textAlign || 'center'],
      verticalAlign: verticalAlignClasses[overlay.verticalAlign || 'center'],
      backgroundColor: backgroundColorClasses[overlay.backgroundColor || 'blackMedium'],
      textColor: textColorClasses[overlay.textColor || 'white'],
    }
  }

  // Render overlay text with icon
  const renderOverlayContent = () => {
    // Parse overlayText if it's a string (JSON)
    let overlay: any = content.overlayText

    if (typeof content.overlayText === 'string') {
      try {
        overlay = JSON.parse(content.overlayText)
      } catch (e) {
        return null
      }
    }

    if (!overlay?.text) return null

    const styles = getOverlayStyles(overlay)
    const IconComponent = overlay.icon && overlay.icon !== 'none' ? iconMap[overlay.icon] : null

    // Icon position layout
    const getLayoutClass = () => {
      if (!IconComponent) return 'flex-col'

      switch (overlay.iconPosition) {
        case 'top':
          return 'flex-col'
        case 'bottom':
          return 'flex-col-reverse'
        case 'right':
          return 'flex-row-reverse'
        case 'left':
          return 'flex-row'
        default:
          return 'flex-col'
      }
    }

    // Check if HTML contains custom styling (complex HTML)
    const hasCustomHTML = overlay.html && (overlay.html.includes('<div') || overlay.html.includes('<h1') || overlay.html.includes('style='))

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`absolute inset-0 flex ${styles.verticalAlign} justify-center ${styles.backgroundColor} overflow-auto`}
        style={{ padding: '20px' }}
      >
        {hasCustomHTML ? (
          // For custom HTML, render without Tailwind classes
          <div
            dangerouslySetInnerHTML={{ __html: replaceTemplateVars(overlay.html, logo) }}
            style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          />
        ) : (
          // For simple text with icon
          <div className={`flex ${getLayoutClass()} items-center gap-6 w-full h-full`}>
            {IconComponent && (
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <IconComponent
                  className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 ${styles.textColor}`}
                  strokeWidth={1.5}
                />
              </motion.div>
            )}
            <div
              dangerouslySetInnerHTML={{ __html: replaceTemplateVars(overlay.html || overlay.text, logo) }}
              className={`${styles.fontSize} ${styles.fontWeight} ${styles.textAlign} ${styles.textColor} tracking-wide leading-tight whitespace-pre-wrap`}
            />
          </div>
        )}
      </motion.div>
    )
  }

  if (content.type === 'image' && content.image) {
    return (
      <div className="relative w-full h-full">
        <Image
          src={urlFor(content.image).url()}
          alt={content.image.alt || 'Project image'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {renderOverlayContent()}
      </div>
    )
  }

  if (content.type === 'video' && content.cloudinaryVideo) {
    return (
      <>
        <div 
          className="relative w-full h-full bg-black group"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <video
            ref={videoRef}
            src={content.cloudinaryVideo}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            preload="metadata"
          />
          {renderOverlayContent()}
          
          {/* Video Controls */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent px-6 pt-100 pb-10"
                style={{ pointerEvents: 'auto' }}
              >
                {/* Control Buttons - فوق شريط التقدم */}
                <div className="flex items-center justify-center gap-3 mb-10">
                  {/* Restart Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={restartVideo}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                    aria-label="إعادة التشغيل"
                  >
                    <RotateCcw className="w-4 h-4 text-white" />
                  </motion.button>

                  {/* Play/Pause Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={togglePlay}
                    className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
                    aria-label={isPlaying ? 'إيقاف' : 'تشغيل'}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-white" fill="white" />
                    ) : (
                      <Play className="w-5 h-5 text-white" fill="white" />
                    )}
                  </motion.button>

                  {/* Mute/Unmute Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleMute}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                    aria-label={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-white" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-white" />
                    )}
                  </motion.button>

                  {/* Fullscreen/Modal Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openModal}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                    aria-label="شاشة كاملة"
                  >
                    <Maximize2 className="w-4 h-4 text-white" />
                  </motion.button>
                </div>

                {/* Progress Bar */}
                <div>
                  <div 
                    className="relative h-1.5 bg-white/20 rounded-full cursor-pointer hover:h-2 transition-all group/progress"
                    onClick={handleProgressClick}
                  >
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-white rounded-full"
                      style={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity"
                      style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
                    />
                  </div>
                  
                  {/* Time Display */}
                  <div className="flex justify-between items-center mt-2 text-white text-xs font-medium opacity-80">
                    <span>{formatTime(videoRef.current?.currentTime || 0)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Fullscreen Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center"
              onClick={closeModal}
            >
              <div 
                className="relative w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeModal}
                  className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                  aria-label="إغلاق"
                >
                  <X className="w-6 h-6 text-white" />
                </motion.button>

                {/* Video Container */}
                <div className="relative w-full h-full max-w-7xl max-h-[90vh] mx-auto">
                  <video
                    ref={modalVideoRef}
                    src={content.cloudinaryVideo}
                    className="w-full h-full object-contain"
                    loop
                    muted={modalMuted}
                    playsInline
                    preload="metadata"
                  />

                  {/* Modal Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent px-8 pt-40 pb-12">
                    {/* Control Buttons */}
                    <div className="flex items-center justify-center gap-4 mb-10">
                      {/* Restart Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={restartModalVideo}
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                        aria-label="إعادة التشغيل"
                      >
                        <RotateCcw className="w-5 h-5 text-white" />
                      </motion.button>

                      {/* Play/Pause Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleModalPlay}
                        className="p-4 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
                        aria-label={modalPlaying ? 'إيقاف' : 'تشغيل'}
                      >
                        {modalPlaying ? (
                          <Pause className="w-6 h-6 text-white" fill="white" />
                        ) : (
                          <Play className="w-6 h-6 text-white" fill="white" />
                        )}
                      </motion.button>

                      {/* Mute/Unmute Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleModalMute}
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                        aria-label={modalMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
                      >
                        {modalMuted ? (
                          <VolumeX className="w-5 h-5 text-white" />
                        ) : (
                          <Volume2 className="w-5 h-5 text-white" />
                        )}
                      </motion.button>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div 
                        className="relative h-2 bg-white/20 rounded-full cursor-pointer hover:h-2.5 transition-all group/progress"
                        onClick={handleModalProgressClick}
                      >
                        <motion.div 
                          className="absolute top-0 left-0 h-full bg-white rounded-full"
                          style={{ width: `${modalProgress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                        <div 
                          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity shadow-lg"
                          style={{ left: `${modalProgress}%`, transform: 'translate(-50%, -50%)' }}
                        />
                      </div>
                      
                      {/* Time Display */}
                      <div className="flex justify-between items-center mt-3 text-white text-sm font-medium">
                        <span>{formatTime(modalVideoRef.current?.currentTime || 0)}</span>
                        <span>{formatTime(modalDuration)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  if (content.type === 'text' && content.text) {
    // Parse text if it's a JSON string (from OverlayTextInput)
    let textData: any = content.text

    if (typeof content.text === 'string') {
      try {
        textData = JSON.parse(content.text)
      } catch (e) {
        // If not JSON, treat as plain text
        textData = { text: content.text }
      }
    }

    // If we have HTML from the rich text editor or code editor
    if (textData.html) {
      const styles = getOverlayStyles(textData)

      // Check if HTML contains custom styling (complex HTML)
      const hasCustomHTML = textData.html && (textData.html.includes('<div') || textData.html.includes('<h1') || textData.html.includes('style='))

      return (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className={`relative w-full h-full flex ${styles.verticalAlign} justify-center ${styles.backgroundColor} overflow-auto`}
          style={{ padding: '20px' }}
        >
          {hasCustomHTML ? (
            // For custom HTML, render without Tailwind classes
            <div
              dangerouslySetInnerHTML={{ __html: replaceTemplateVars(textData.html, logo) }}
              style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            />
          ) : (
            // For simple text
            <div
              dangerouslySetInnerHTML={{ __html: replaceTemplateVars(textData.html, logo) }}
              className={`${styles.fontSize} ${styles.fontWeight} ${styles.textAlign} ${styles.textColor} tracking-wide leading-tight`}
            />
          )}
        </motion.div>
      )
    }

    // Fallback for plain text
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center w-full h-full p-12"
      >
        <p className="text-white text-2xl md:text-4xl font-light leading-relaxed text-center max-w-3xl rtl">
          {textData.text || content.text}
        </p>
      </motion.div>
    )
  }

  return null
}
