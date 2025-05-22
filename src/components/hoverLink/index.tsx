'use client'

import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType & { context?: 'header' | 'footer' | 'default' }> = (
  props,
) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    context = 'default', // Default unless specified
  } = props

  const pathname = usePathname()
  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug}`
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}
  const isActive = pathname === href

  // Apply hover effect only when used in HeaderNav
  const hoverEffect =
    context === 'header'
      ? `relative inline-block text-sm pl-4 text-black/60 hover:text-black/90
         before:absolute before:top-1/2 before:left-0 before:w-3 before:h-3 before:bg-current before:rounded-full 
         before:transform before:-translate-y-1/2 before:transition-transform 
         before:duration-700 before:ease-[cubic-bezier(0.19,1,0.22,1)] before:delay-0
         ${isActive ? 'text-black/90 before:scale-100' : 'before:scale-0 hover:before:scale-100 hover:before:delay-100'}`
      : ''

  if (appearance === 'inline') {
    return (
      <Link className={cn(hoverEffect, className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={cn(hoverEffect, className)} size={size} variant={appearance}>
      <Link href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
