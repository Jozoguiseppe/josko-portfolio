import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'

export default function About(){
  const ref = useRef(null)
  useEffect(()=>{
    gsap.fromTo(ref.current.children,{y:20,opacity:0},{y:0,opacity:1,stagger:.1,duration:.6})
  },[])
  return (
    <>
      {/* Hero Section */}
      <section className="section">
        <div ref={ref} className="wrap" style={{display:'grid',gap:24,gridTemplateColumns:'1fr 1.2fr'}}>
          <img src="/hero.jpg" alt="Joško Leoni - Web Designer" loading="lazy" style={{width:'100%',borderRadius:14,objectFit:'cover',maxHeight:420}}/>
          <div>
            <h1 className="h1" style={{fontSize:'clamp(28px,4vw,48px)'}}>About Me</h1>
            <p className="lead">I'm passionate about creating digital experiences that combine clean design, smooth interactions, and strong performance. Whether you need a brand-new site or a refresh of your current one, I'll make sure your website looks amazing and delivers results.</p>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section">
        <div className="wrap">
          <h2 className="h1" style={{fontSize:'clamp(28px,4vw,44px)', textAlign: 'center', marginBottom: '48px'}}>Services Preview</h2>
          <div className="services">
            {[
              {
                title: 'Web Design',
                description: 'Clean, modern layouts with a clear hierarchy that make your brand shine.'
              },
              {
                title: 'Front-End Development', 
                description: 'Responsive, pixel-perfect builds using React, Vite, and GSAP for smooth animations.'
              },
              {
                title: 'SEO & Speed',
                description: 'Optimized for Core Web Vitals, semantic HTML, and fast load times — so you get found and stay ahead.'
              }
            ].map((service, i) => (
              <div className="service" key={i}>
                <h3 style={{marginTop:0, color: 'var(--accent-cyan)'}}>{service.title}</h3>
                <p style={{color:'var(--muted)', lineHeight: 1.6}}>{service.description}</p>
              </div>
            ))}
          </div>
          <div style={{textAlign: 'center', marginTop: '32px'}}>
            <Link to="/contact" className="btn">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="section">
        <div className="wrap">
          <h2 className="h1" style={{fontSize:'clamp(28px,4vw,44px)', textAlign: 'center', marginBottom: '48px'}}>Why Choose Me?</h2>
          <div className="services four-columns">
            {[
              {title: 'Performance-first', desc: 'Fast, reliable, and optimized for every device.'},
              {title: 'Design that converts', desc: 'Beautiful, clear, and user-focused.'},
              {title: 'Modern tech stack', desc: 'Built with today\'s best tools and practices.'},
              {title: 'Collaborative approach', desc: 'I bring your vision to life, step by step.'}
            ].map((item,i)=>(
              <div className="service" key={i} style={{textAlign: 'center'}}>
                <h3 style={{marginTop:0, color: 'var(--accent-cyan)'}}>{item.title}</h3>
                <p style={{color:'var(--muted)', lineHeight: 1.6}}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section" style={{background: 'linear-gradient(135deg, rgba(216,75,255,0.1), rgba(60,247,255,0.1))', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)'}}>
        <div className="wrap" style={{textAlign: 'center', maxWidth: 800}}>
          <h2 className="h1" style={{fontSize:'clamp(28px,4vw,44px)', marginBottom: '24px'}}>Let's Build Something Great Together</h2>
          <p className="lead" style={{fontSize: 'clamp(18px, 2.5vw, 24px)', lineHeight: 1.6, marginBottom: '32px'}}>
            Your website should do more than just exist — it should grow your business.
          </p>
          <Link to="/contact" className="btn cta" style={{fontSize: '18px', padding: '16px 32px'}}>Start Your Project</Link>
        </div>
      </section>
    </>
  )
}
