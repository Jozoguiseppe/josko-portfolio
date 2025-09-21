import React, { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

export default function Home(){
  const heroRef = useRef(null)
  const tilesRef = useRef([])
  const boxesRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let lenis

    // Smooth scroll if allowed
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.12, smoothWheel: true })
      const raf = (t)=>{ lenis.raf(t); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
    }

    // Animations
    if (!reduce) {
      const tl = gsap.timeline()
      tl.fromTo('.kicker',{y:20,opacity:0},{y:0,opacity:1,duration:.6})
        .fromTo('.h1',{y:20,opacity:0},{y:0,opacity:1,duration:.6},'-=.2')
        .fromTo('.lead',{y:20,opacity:0},{y:0,opacity:1,duration:.6},'-=.2')
        .fromTo('.cta',{y:12,opacity:0},{y:0,opacity:1,duration:.5},'-=.2')

      // Parallax tiles on scroll
      tilesRef.current.forEach((tile, i) => {
        const depth = Number(tile?.dataset?.depth || (i + 1))
        // You can tweak strength here
        // Example: const yStrength = depth * 14; const zStrength = depth * 8;
        const yStrength = depth * 12
        gsap.to(tile, {
          y: yStrength,
          rotateX: (i % 2 === 0 ? 1 : -1) * 2,
          rotateY: (i % 2 === 0 ? -1 : 1) * 1.5,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      // Reveal boxes on scroll
      gsap.utils.toArray(boxesRef.current?.querySelectorAll('.card') || []).forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: 'power2.out',
          delay: i * 0.06,
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
          },
        })
      })
    }

    // Mouse tilt (desktop only)
    const supportsPointerFine = window.matchMedia('(pointer:fine)').matches
    const onMove = (e) => {
      if (reduce || !supportsPointerFine) return
      const rect = heroRef.current?.getBoundingClientRect()
      if (!rect) return
      const mx = (e.clientX - rect.left) / rect.width - 0.5
      const my = (e.clientY - rect.top) / rect.height - 0.5
      tilesRef.current.forEach((tile, i) => {
        gsap.to(tile, {
          rotateY: mx * 8 + (i % 2 ? 2 : -2),
          rotateX: -my * 6 + (i % 2 ? -1.5 : 1.5),
          transformPerspective: 1200,
          duration: 0.4,
          ease: 'power2.out',
        })
      })
    }
    heroRef.current?.addEventListener('mousemove', onMove)

    return () => {
      heroRef.current?.removeEventListener('mousemove', onMove)
      if (lenis) lenis.destroy()
      ScrollTrigger.getAll().forEach(s=>s.kill())
    }
  },[])

  return (
    <>
      {/* 3D Hero with tiles (no portrait image) */}
      <header ref={heroRef} className="section hero3d">
        <div className="wrap">
          <div className="hero3d__stage" aria-hidden="true">
            {/* Tweak data-depth and inline translateZ strengths as desired */}
            <div className="tile" data-depth="1" ref={el => tilesRef.current[0] = el} style={{transform:'translateZ(40px)'}}></div>
            <div className="tile" data-depth="2" ref={el => tilesRef.current[1] = el} style={{transform:'translateZ(80px)'}}></div>
            <div className="tile" data-depth="3" ref={el => tilesRef.current[2] = el} style={{transform:'translateZ(120px)'}}></div>
            <div className="tile" data-depth="-1" ref={el => tilesRef.current[3] = el} style={{transform:'translateZ(-20px)'}}></div>
            <div className="tile" data-depth="-2" ref={el => tilesRef.current[4] = el} style={{transform:'translateZ(-60px)'}}></div>
          </div>

          <div className="hero3d__content">
            <div className="kicker">Web design • UX • Front-end</div>
            <h1 className="h1">Web Design That Turns Visitors Into Customers</h1>
            <p className="lead">I craft high-performance sites with expressive motion, clear hierarchy, and accessible UX.</p>
            <Link to="/contact" className="btn cta">Start a Project</Link>
          </div>
        </div>
      </header>

      {/* 3D Scrolling Boxes */}
      <section className="section boxes3d" ref={boxesRef}>
        <div className="wrap">
          <h2 className="h1" style={{fontSize:'clamp(28px,4vw,44px)'}}>3D Scrolling Boxes</h2>
          <div className="boxes3d__grid">
            {Array.from({length:6}).map((_,i) => (
              <article key={i} className="card" style={{transform:`translateZ(${(i%3)*10+10}px)`}}>
                <h3 style={{marginTop:0}}>Card {i+1}</h3>
                <p style={{color:'var(--muted)'}}>Hover to lift in 3D. Scroll to reveal. Tuned for performance and clarity.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section">
        <div className="wrap">
          <h2 className="h1" style={{fontSize:'clamp(28px,4vw,44px)'}}>Services</h2>
          <div className="services">
            {[
              {t:'Web Design',d:'Clean layouts, strong hierarchy, conversion-focused UI.'},
              {t:'Front-end Dev',d:'React, Vite, GSAP. Pixel-perfect, performant builds.'},
              {t:'SEO & Speed',d:'Core Web Vitals, semantic HTML, structured data.'}
            ].map((s,i)=>(
              <div className="service" key={i}>
                <h3 style={{marginTop:0}}>{s.t}</h3>
                <p style={{color:'var(--muted)'}}>{s.d}</p>
                <Link to="/contact" className="btn" style={{marginTop:'12px', fontSize:'14px', padding:'8px 16px'}}>Get Started</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Highlights Marquee */}
      <section className="marquee" aria-label="Case highlights">
        <div className="marquee__track">
          <span>Brand Systems</span>
          <span>Landing Pages</span>
          <span>React Frontends</span>
          <span>GSAP Interactions</span>
          <span>SEO & Speed</span>
          <span>Accessibility</span>
          {/* duplicate for seamless loop */}
          <span>Brand Systems</span>
          <span>Landing Pages</span>
          <span>React Frontends</span>
          <span>GSAP Interactions</span>
          <span>SEO & Speed</span>
          <span>Accessibility</span>
        </div>
      </section>

      {/**
       * GSAP tweak notes:
       * - Tiles parallax strength: change yStrength in tiles loop above
       *   Example: const yStrength = depth * 20 // stronger parallax
       * - Mouse tilt intensity: rotateX/rotateY multipliers in onMove
       * - Boxes reveal timing: change delay multiplier and duration in gsap.from for .card
       */}
    </>
  )
}
