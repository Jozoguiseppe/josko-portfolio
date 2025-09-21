import React, { useState } from 'react'

export default function Contact(){
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  
  const valid = form.name && /\S+@\S+\.\S+/.test(form.email) && form.message.length > 5

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!valid || isSubmitting) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // For development, use mailto fallback
      if (import.meta.env.DEV) {
        const mailtoLink = `mailto:joskoleoni@gmail.com?subject=New Project — ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.name} <${form.email}>`
        window.location.href = mailtoLink
        setSubmitStatus({ type: 'success', message: 'Opening email client... (In production, this will send directly)' })
        setForm({ name: '', email: '', message: '' })
        setIsSubmitting(false)
        return
      }

      // For production, use the API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' })
        setForm({ name: '', email: '', message: '' }) // Reset form
      } else {
        setSubmitStatus({ type: 'error', message: result.error || 'Failed to send message. Please try again.' })
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section">
      <div className="wrap" style={{maxWidth:800}}>
        <h1 className="h1" style={{fontSize:'clamp(28px,4vw,48px)'}}>Let's work together</h1>
        <p className="lead">Tell me about your project. I'll reply with next steps and timeline.</p>
        
        {submitStatus && (
          <div style={{
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '24px',
            background: submitStatus.type === 'success' 
              ? 'rgba(60, 247, 255, 0.1)' 
              : 'rgba(255, 100, 100, 0.1)',
            border: `1px solid ${submitStatus.type === 'success' 
              ? 'rgba(60, 247, 255, 0.3)' 
              : 'rgba(255, 100, 100, 0.3)'}`,
            color: submitStatus.type === 'success' 
              ? 'var(--accent-cyan)' 
              : '#ff6464'
          }}>
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{display:'grid',gap:16}}>
            <input 
              required 
              placeholder="Your name" 
              value={form.name} 
              onChange={e=>setForm({...form, name:e.target.value})} 
              style={inputStyle}
              disabled={isSubmitting}
            />
            <input 
              required 
              placeholder="Email" 
              value={form.email} 
              onChange={e=>setForm({...form, email:e.target.value})} 
              style={inputStyle} 
              type="email"
              disabled={isSubmitting}
            />
            <textarea 
              required 
              placeholder="Message" 
              rows="6" 
              value={form.message} 
              onChange={e=>setForm({...form, message:e.target.value})} 
              style={{...inputStyle, resize:'vertical'}}
              disabled={isSubmitting}
            />
            <button 
              className="btn" 
              disabled={!valid || isSubmitting} 
              type="submit" 
              aria-disabled={!valid || isSubmitting}
              style={{opacity: isSubmitting ? 0.7 : 1}}
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

const inputStyle = {
  background:'rgba(255,255,255,.04)', color:'var(--fg)', border:'1px solid rgba(255,255,255,.12)',
  borderRadius:'14px', padding:'14px 16px', outline:'none'
}
