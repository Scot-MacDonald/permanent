'use client'

import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

const symbols = '@#*!?|!+[]/&()$-'.split('')
const originalText = 'PERMANENT©'

export const Logo = (props: Props) => {
  const { className, loading: loadingFromProps, priority: priorityFromProps } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'
  const [letters, setLetters] = useState(originalText.split(''))

  useEffect(() => {
    const flickerEffect = () => {
      const chosenIndexes: number[] = []

      // Select 3 unique random indexes, but exclude the last index (the © symbol)
      while (chosenIndexes.length < 3) {
        const randomIndex = Math.floor(Math.random() * (letters.length - 1)) // Exclude the last index
        if (!chosenIndexes.includes(randomIndex)) {
          chosenIndexes.push(randomIndex)
        }
      }

      let flickerCount = 0
      const flickerInterval = setInterval(() => {
        setLetters((prev) => {
          const newLetters = [...prev]
          chosenIndexes.forEach((index) => {
            newLetters[index] = symbols[Math.floor(Math.random() * symbols.length)]
          })
          return newLetters
        })

        flickerCount++
        if (flickerCount > 8) {
          clearInterval(flickerInterval)
          setLetters(originalText.split(''))
        }
      }, 100)
    }

    const interval = setInterval(flickerEffect, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <h6
      className={clsx('text-[22px] text-white dark:text-black', className)}
      style={{
        display: 'inline-block', // Ensures logo does not stretch
        width: '8em', // Fixed width (enough space for the longest string "PERMANENT")
        whiteSpace: 'nowrap', // Prevents text from wrapping
        fontFamily: '', // Ensures consistent width for each character
        fontWeight: 600, // Bold font weight
        // letterSpacing: '0.1em', // Adds space between characters
      }}
    >
      {letters.map((char, index) => (
        <span key={index} className="inline-block">
          {char}
        </span>
      ))}
    </h6>
  )
}

// import clsx from 'clsx'
// import React from 'react'

// interface Props {
//   className?: string
//   loading?: 'lazy' | 'eager'
//   priority?: 'auto' | 'high' | 'low'
// }

// export const Logo = (props: Props) => {
//   const { loading: loadingFromProps, priority: priorityFromProps, className } = props

//   const loading = loadingFromProps || 'lazy'
//   const priority = priorityFromProps || 'low'

//   return (
//     /* eslint-disable @next/next/no-img-element */
//     <img
//       alt="Payload Logo"
//       width={193}
//       height={34}
//       loading={loading}
//       fetchPriority={priority}
//       decoding="async"
//       className={clsx('max-w-[9.375rem] w-full h-[34px]', className)}
//       src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-logo-light.svg"
//     />
//   )
// }
