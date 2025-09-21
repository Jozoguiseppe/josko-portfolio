import React from 'react'

export default function Footer(){
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="wrap footer__inner">
        <div className="footer__left">© {year} Joško Leoni — Web Design, Dubrovnik</div>
        <nav className="footer__links" aria-label="Footer links">
          <a href="mailto:joskoleoni@gmail.com">Email</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer noopener">Instagram</a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer noopener">Facebook</a>
          <a href="https://wa.me/" target="_blank" rel="noreferrer noopener">WhatsApp</a>
        </nav>
      </div>
    </footer>
  )
}


