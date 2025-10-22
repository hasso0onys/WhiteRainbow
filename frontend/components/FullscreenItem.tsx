'use client'

import { motion } from 'framer-motion'
import { Project, LogoSettings } from '@/lib/types'
import ContentBlock from './ContentBlock'

interface FullscreenItemProps {
  project: Project
  logo?: any // Can be old or new format
}

export default function FullscreenItem({ project, logo }: FullscreenItemProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.3 }}
      className="project-section relative w-full"
      style={{
        height: 'calc(100vh - 140px)', // Total screen height minus top (80px) and bottom (60px) bars
        backgroundColor: project.backgroundColor || '#000000',
        scrollMarginTop: '80px', // Align with TopBar height
      }}
    >
      <ContentBlock content={project.leftContent} logo={logo} />
    </motion.section>
  )
}
