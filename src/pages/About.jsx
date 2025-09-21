import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function About(){
  const ref = useRef(null)
  useEffect(()=>{
    gsap.fromTo(ref.current.children,{y:20,opacity:0},{y:0,opacity:1,stagger:.1,duration:.6})
  },[])
  return (
    <section className="section">
      <div ref={ref} className="wrap" style={{display:'grid',gap:24,gridTemplateColumns:'1fr 1.2fr'}}>
        <img src="/hero.jpg" alt="" loading="lazy" style={{width:'100%',borderRadius:14,objectFit:'cover',maxHeight:420}}/>
        <div>
          <h1 className="h1" style={{fontSize:'clamp(28px,4vw,48px)'}}>About Me</h1>
          <p className="lead">I’m Joško Leoni — web designer and front-end developer based in Dubrovnik. I craft fast, elegant sites with motion and clean code.</p>
          <p style={{color:'var(--muted)'}}>Stack: React, Vite, GSAP, SCSS, SEO best practices. I work end-to-end: structure, copy polish, UI, build, and deploy.</p>
        </div>
      </div>
    </section>
  )
}
