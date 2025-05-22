import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="">
      <div className="pl-4 flex flex-col ">
        <div className="max-w-[640px] flex items-center ">
          {richText && (
            <RichText
              className="mb-0 text-[rgba(0,0,0,.6)] [&_p]:text-[16px]"
              data={richText}
              enableGutter={false}
            />
          )}
        </div>
        <div className="flex py-4  ">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
