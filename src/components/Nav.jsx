import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { lockScroll, unlockScroll } from '../utils/scrollLock.js'

export default function Nav(){
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    !isOpen ? lockScroll() : unlockScroll()
  }

  const closeMenu = () => {
    setIsOpen(false)
    unlockScroll()
  }

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') closeMenu()
    }

    const handleTab = (e) => {
      if (e.key !== 'Tab') return
      const focusableElements = document.querySelectorAll('.overlay a, .overlay button')
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('keydown', handleTab)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleTab)
    }
  }, [isOpen])

  return (
    <>
      <nav className="nav">
        <div className="wrap inner">
          <strong>JL • Web Design</strong>
          <div className="nav__desktop">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
          <button
            className={`hamburger ${isOpen ? 'is-open' : ''}`}
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="overlay__content">
            <button className="overlay__close" onClick={closeMenu} aria-label="Close menu">×</button>
            <nav className="overlay__nav">
              <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
              <NavLink to="/about" onClick={closeMenu}>About</NavLink>
              <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
