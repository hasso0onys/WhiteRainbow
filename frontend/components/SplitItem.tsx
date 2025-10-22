'use client'

import { motion } from 'framer-motion'
import { Project, LogoSettings } from '@/lib/types'
import ContentBlock from './ContentBlock'

interface SplitItemProps {
  project: Project
  logo?: any // Can be old or new format
}

export default function SplitItem({ project, logo }: SplitItemProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.3 }}
      className="project-section relative w-full"
      style={{
        height: 'calc(100vh - 124px)', // Mobile: 64px top + 60px bottom = 124px
        backgroundColor: project.backgroundColor || '#000000',
        scrollMarginTop: '64px', // Align with TopBar height on mobile
      }}
    >
      <div className="flex flex-col md:flex-row w-full h-full">
        {/* Left Content */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full">
          <ContentBlock content={project.leftContent} logo={logo} />
        </div>

        {/* Right Content */}
        {project.rightContent && (
          <div className="w-full md:w-1/2 h-1/2 md:h-full">
            <ContentBlock content={project.rightContent} logo={logo} />
          </div>
        )}
      </div>
    </motion.section>
  )
}
