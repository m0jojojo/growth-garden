import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import cases from '../data/cases.json'


function Page({ children }) {
  return <div className="page">{children}</div>
}

export function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const form = e.target
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })
      const result = await res.json().catch(() => ({}))
      if (!res.ok || !result.ok) throw new Error(result.error || 'Could not send your message. Please try again.')
      form.reset()
      setStatus('sent')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  return (
    <Page>
      <h1>It's nice to <span>meet ya</span></h1>
      <p>For general enquiries, please fill out the form to get in touch.</p>
      <form className="form" onSubmit={submit}>
        <input name="name" placeholder="Name" required maxLength={100} />
        <input name="email" type="email" placeholder="Email *" required maxLength={200} />
        <input name="phone" type="tel" placeholder="Phone number" maxLength={30} />
        <textarea name="comment" rows="5" placeholder="Comment" maxLength={5000} />
        <input name="website" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <p style={{ fontSize: 14 }}>By submitting this form I accept the <Link to="/privacy-policy" style={{ color: 'var(--purple)' }}>Privacy Policy</Link> of this site.</p>
        <button className="btn" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send'}</button>
        {status === 'sent' && <div className="notice" role="status">Thanks! We've got your message and will get back to you soon.</div>}
        {status === 'error' && <div className="notice error" role="alert">{error}</div>}
      </form>
    </Page>
  )
}

const isStat = (l) => /^\d+[\d.,]*\s*(%|\+|[MKmk]\+?|x)/.test(l)

export function CaseStudy() {
  const { slug } = useParams()
  const lines = cases[slug]
  if (!lines) return <NotFound />
  const [title, ...rest] = lines
  const stats = []
  const body = []
  for (let i = 0; i < rest.length; i++) {
    if (isStat(rest[i]) && rest[i + 1] && !isStat(rest[i + 1])) { stats.push([rest[i], rest[i + 1]]); i++ }
    else body.push(rest[i])
  }
  return (
    <Page>
      <p className="eyebrow"><Link to="/our-work">← Our Work</Link></p>
      <h1>{title}</h1>
      {body.map((l, i) => (l.length < 60 ? <h2 key={i}>{l}</h2> : <p key={i}>{l}</p>))}
      {stats.length > 0 && (
        <div className="case-stats">
          {stats.map(([v, l]) => <div key={l} className="case-stat"><strong>{v}</strong><span>{l}</span></div>)}
        </div>
      )}
      <Link to="/contact" className="btn">Start your campaign</Link>
    </Page>
  )
}

export function Policy({ kind }) {
  const posh = kind === 'posh'
  return (
    <Page>
      <h1>{posh ? 'POSH Policy' : 'Privacy Policy'}</h1>
      {posh && <p>Growth Garden — Policy No: HR/POSH/2025, dated 01.09.2025. Internal policy for prohibition, prevention and redressal of sexual harassment of women at workplace under the Sexual Harassment of Women at Workplace (Prevention, Prohibition & Redressal) Act, 2013.</p>}
      <p>The full policy text will be added here.</p>
    </Page>
  )
}

export function NotFound() {
  return (
    <Page>
      <h1>Page <span>not found</span></h1>
      <Link to="/" className="btn">Back home</Link>
    </Page>
  )
}
