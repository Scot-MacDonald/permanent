'use client'

import React, { useState } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, Menu } from 'lucide-react'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { DialogTitle } from '@radix-ui/react-dialog'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false) // State to manage sheet open/close
  const navItems = data?.navItems || []

  // Close the menu when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <nav className="relative flex items-center">
      {/* Hamburger Menu using Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button className="lg:hidden p-2 " aria-label="Toggle Menu">
            <Menu className="w-6 h-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="p-4 space-y-2">
          {/* DialogTitle for accessibility, wrapped in VisuallyHidden */}
          <VisuallyHidden>
            <DialogTitle>Navigation Menu</DialogTitle>
          </VisuallyHidden>

          {navItems.map(({ link }, i) => (
            <div key={i} onClick={handleLinkClick}>
              <CMSLink {...link} appearance="link" className="block" />
            </div>
          ))}
          {/* <Link href="/search" className="flex items-center" onClick={handleLinkClick}>
            <SearchIcon className="w-5 " />
            <span className="ml-2">Search</span>
          </Link> */}
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex gap-3 items-center">
        {navItems.map(({ link }, i) => (
          <CMSLink key={i} {...link} appearance="link" />
        ))}
        {/* <Link href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5 " />
        </Link> */}
      </div>
    </nav>
  )
}
