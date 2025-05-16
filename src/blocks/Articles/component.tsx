'use client'
import Link from 'next/link'
import { ArticlesBlock as ArticlesBlockProps } from 'src/payload-types'
import React, { useState, useEffect } from 'react'

type Props = {
  className?: string
} & ArticlesBlockProps

const hslToRgba = (h: number, s: number, l: number, a: number) => {
  s /= 100
  l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const aVal = s * Math.min(l, 1 - l)
  const f = (n: number) => l - aVal * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return `rgba(${Math.round(f(0) * 255)}, ${Math.round(f(8) * 255)}, ${Math.round(f(4) * 255)}, ${a})`
}

const ArticlesBlock: React.FC<Props> = ({ className, articles }) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const [hue, setHue] = useState(0)

  // Dynamic hue animation (keeps updating)
  useEffect(() => {
    let animationFrame: number
    const updateHue = () => {
      setHue((prevHue) => (prevHue + 0.5) % 360) // Smooth hue change
      animationFrame = requestAnimationFrame(updateHue)
    }
    animationFrame = requestAnimationFrame(updateHue)
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <div className={`max-w-[640px] mt-6 pl-4 ${className}`}>
      {articles?.map((article, index) => {
        const isHovered = hoveredIndex === index

        // Compute colors **once** so they match perfectly across all elements
        const baseColor = hslToRgba(hue, 80, 50, 1) // Solid color
        const semiTransparentColor = hslToRgba(hue, 80, 50, 0.2) // 20% opacity for background
        const borderColor = hslToRgba(hue, 80, 70, 0.8) // Border with slight fade

        return (
          <Link key={index} href={article.url} target="_blank" rel="noreferrer" className="block">
            <article
              className="article-link transition-all ease-in-out"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
              style={{
                backgroundColor: isHovered ? semiTransparentColor : 'transparent',
                borderColor:
                  isHovered || hoveredIndex === index + 1 ? borderColor : 'rgba(0, 0, 0, 0.2)',
                transition: 'border-color 0.3s ease-in-out',
              }}
            >
              <div className="min-w-[81px]">
                <h6
                  className="article-tag text-sm  "
                  style={{
                    backgroundColor: isHovered ? baseColor : 'gray',
                    color: isHovered ? '#fff' : '',
                  }}
                >
                  {article.batch}
                </h6>
              </div>
              <h3 className="article-title w-[166px] gap-x-[8px] text-sm flex items-center">
                <span>{article.title}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`hidden lg:block opacity-100 transition-opacity   ${
                    isHovered ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  <rect
                    width="16"
                    height="16"
                    rx="8"
                    fill={isHovered ? baseColor : 'transparent'}
                  />
                  <path
                    d="M5 8H11M11 8L8.1875 11M11 8L8.1875 5"
                    stroke="white"
                    strokeOpacity="0.9"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                  />
                </svg>
              </h3>
              <h3 className="article-desc w-[244px] text-sm">
                {Array.isArray(article.services) ? (
                  article.services.map((service, idx) => (
                    <span key={idx}>
                      {typeof service === 'string' ? service : service?.service}
                      {idx < article.services.length - 1 && ', '}
                    </span>
                  ))
                ) : (
                  <span>No services available</span>
                )}
              </h3>

              <h3 className="article-date text-sm">
                {article.year} - <span className="!opacity-0 invisible">0000</span>
              </h3>
            </article>
          </Link>
        )
      })}
    </div>
  )
}

export default ArticlesBlock
