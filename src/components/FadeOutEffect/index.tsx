'use client'
import React, { useEffect } from 'react'

const FadeOutEffect: React.FC = () => {
  useEffect(() => {
    // Scroll event listener to adjust opacity of the fade element
    const handleScroll = () => {
      const fadeElement = document.querySelector('.fade-top') as HTMLElement
      const scrollPosition = window.scrollY

      // Adjust opacity based on scroll position (you can customize this formula)
      fadeElement.style.opacity = Math.min(scrollPosition / 200, 1).toString()
    }

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className="fade-top"
      style={{
        height: '300px',
        top: '50px',
        width: '100%',
        background: 'linear-gradient(to bottom, white, transparent)',
        position: 'fixed',
        // top: '30px',
        left: '0',
        zIndex: 7,
        pointerEvents: 'none',
        transition: 'opacity 0.1s ease',
        opacity: 0,
      }}
      aria-hidden="true"
    ></div>
  )
}

export default FadeOutEffect
