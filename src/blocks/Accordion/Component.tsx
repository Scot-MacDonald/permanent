import * as Accordion from '@radix-ui/react-accordion'
import type { AccordionBlock as AccordionBlockProps } from 'src/payload-types'
import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & AccordionBlockProps

export const AccordionBlock: React.FC<Props> = ({ className, items }) => {
  return (
    <Accordion.Root type="multiple" className={cn('AccordionRoot pb-10 pl-4', className)}>
      {items?.map((item, index) => (
        <Accordion.Item
          key={index}
          value={`item-${index}`}
          className="AccordionItem border-b-[1px] border-b-[#00000014]"
        >
          <Accordion.Header className="AccordionHeader">
            <Accordion.Trigger className="AccordionTrigger py-10">
              <p className="">{item.title}</p>
              <span className="AccordionChevron">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <g fill="none" stroke="var(--violet-10)" strokeWidth="2">
                    {/* Horizontal line */}
                    <line x1="3" x2="21" y1="12" y2="12" />

                    {/* Vertical line */}
                    <line x1="12" x2="12" y1="3" y2="21" className="AccordionVerticalLine" />
                  </g>
                </svg>
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="AccordionContent">
            <RichText data={item.content} enableGutter={false} enableProse={false} />
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
