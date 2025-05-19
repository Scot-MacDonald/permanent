import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses: Record<string, string> = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="w-full px-4">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <div
                className={cn(
                  size === 'max640'
                    ? 'col-span-4 lg:col-span-12 max-w-[640px] w-full'
                    : `col-span-4 lg:col-span-${colsSpanClasses[size!]}`,
                  {
                    'md:col-span-2': size !== 'full' && size !== 'max640',
                  },
                )}
                key={index}
              >
                {richText && <RichText data={richText} enableGutter={false} />}

                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
