import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

// import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
// import { Logo } from '@/components/Logo/Logo'
import Time from '@/components/Time'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto dark:bg-card ">
      <div className="w-full p-5 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center text-sm" href="/">
          {/* <Logo /> */}
          ©2025 PERMANENT Services GmbH
        </Link>
        <Time />
        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          {/* <ThemeSelector /> */}
          <nav className="flex flex-col md:flex-row gap-4 ">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="dark:bg-card  text-sm" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
