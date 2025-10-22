'use client'

import { Project, LogoSettings } from '@/lib/types'
import FullscreenItem from './FullscreenItem'
import SplitItem from './SplitItem'
import ScrollToTop from './ScrollToTop'

interface MediaGridProps {
  projects: Project[]
  logo?: any // Can be old or new format
}

export default function MediaGrid({ projects, logo }: MediaGridProps) {
  return (
    <>
      <ScrollToTop />
      <div className="w-full">
        {projects.map((project) => {
          if (project.layoutType === 'fullscreen') {
            return <FullscreenItem key={project._id} project={project} logo={logo} />
          }

          if (project.layoutType === 'split') {
            return <SplitItem key={project._id} project={project} logo={logo} />
          }

          return null
        })}
      </div>
    </>
  )
}
