import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { Contact, CaseStudy, Policy, NotFound } from './pages/Pages.jsx'
import { OurStory, OurWork, Career } from './pages/Company.jsx'
import { ServicePage, WhatWeDo } from './pages/Services.jsx'
import Home from './pages/Home.jsx'

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Our-Story', to: '/our-story' },
  { label: 'What we do', to: '/what-we-do' },
  { label: 'Our Work', to: '/our-work' },
  { label: 'Career', to: '/career' },
]


function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="header">
      <Link to="/" className="logo logo-text">Growth Garden</Link>
      <nav className={open ? 'open' : ''}>
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end onClick={() => setOpen(false)}>{n.label}</NavLink>
        ))}
      </nav>
      <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>
        <i className="fa fa-bars" />
      </button>
    </header>
  )
}

function Footer() {
  return (
    <footer id="contact">
      <div className="footer-top">
        <h2>Elevate Your Influence with Growth Garden!</h2>
        <p>Explore, Collaborate, Innovate, and Achieve</p>
        <Link to="/contact" className="btn">Let's Collaborate</Link>
        <div className="footer-cols">
          <div>
            <h4>Work with us</h4>
            <p><Link to="/career">Be a part of the team</Link></p>
          </div>
          <div>
            <h4>New Delhi</h4>
            <p>Metro Station-Saket, 241, Westend Marg, Saidulajab, Butterfly Park, Mittal Garden, Saket, New Delhi, Delhi 110030</p>
          </div>
          <div>
            <h4>Mumbai</h4>
            <p>1st Floor, Peninsula Park, Veera Desai Industrial Estate, Andheri West, Mumbai, Maharashtra 400047</p>
          </div>
          <div>
            <h4>Contact us</h4>
            <p><a href="mailto:contact@growthgarden.in">contact@growthgarden.in</a></p>
            <h4>Follow Us</h4>
            <p className="social"><i className="fa-brands fa-instagram" /> <i className="fa-brands fa-linkedin" /></p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <small>Copyright © {new Date().getFullYear()}, Growth Garden. All rights reserved.</small>
        <span><Link to="/posh-policy">POSH-Policy</Link> <Link to="/privacy-policy">Privacy policy</Link></span>
      </div>
    </footer>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/case/:slug" element={<CaseStudy />} />
          <Route path="/posh-policy" element={<Policy kind="posh" />} />
          <Route path="/privacy-policy" element={<Policy kind="privacy" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
