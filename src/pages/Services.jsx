import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { NotFound } from './Pages.jsx'

const SERVICES = {
  im: {
    title: 'Influencer Marketing',
    heading: ['Intuition meets', 'precision'],
    intro: "Welcome to the cutting edge of influencer marketing at Growth Garden, where intuition meets precision. Here, we don't rely on gut feelings; our campaigns are powered by data,",
    count: 10,
    ethics: [
      ['At Growth Garden, '], ['our business ethics are crystal clear ', true], ['and our approach is rigorously '], ['data-driven. ', true],
      ["We understand that influencer marketing isn't just about getting your brand out there. "], ["It's about creating measurable impact.", true],
    ],
    counters: [['Creators Collaborated With', 10000], ['Creators Exclusively Managed', 330], ['Bankable Campaigns Executed', 850]],
    mission: ['Our mission is clear', 'To transform influencer marketing from a game of chance into a precise tool'],
    cases: [['Samsung', 'samsung'], ['Skillshare', 'skillshare'], ['Audi', 'audi']],
  },
  tm: {
    title: 'Talent Management',
    heading: ['Elevate Your Stardom with', 'Growth Garden Talent Management'],
    intro: "Welcome to the beating heart of creator empowerment at Growth Garden. A sanctuary for creators seeking not just management but a transformative experience. At Growth Garden, we don't manage talent; we unleash it. Numbers don't lie; with 300+ exclusive creators, countless success stories, and a commitment to your journey. Dive into a world where your talent isn't just celebrated; it's elevated.",
    count: 10,
    ethics: [
      ['"In an industry shackled by limitations, '], ['Growth Garden is the game-changer. ', true],
      ["Traditional agencies fall short, confined to specific niches. But we? We're not just passionate about creators; we're obsessed. "],
      ['The problem? A lack of comprehensive solutions for all forms of creators. ', true],
      ['Growth Garden is here to bridge that gap, dismantle barriers and redefine your possibilities."'],
    ],
    counters: [['Influencers Collaborated With', 10000], ['Bankable Campaigns Executed', 300], ['Influencers Successfully Promoted', 850]],
    mission: ['Our mission is clear', "To propel you from where you are to where you've only dared to dream. At Growth Garden, we dance to the beat of your unique rhythm."],
    cases: [['Dharna', 'dharna'], ['Thugesh', 'thugesh'], ['Tech Burner', 'tech-burner']],
  },
  ibd: {
    title: 'Growth Garden Business Division',
    heading: ['Forge Your Entrepreneurial', 'Destiny with Creator Led Brands'],
    intro: '"Embark on a transformative journey of entrepreneurship with Creator Led Brands. We are the architects of influencer evolution, empowering creators to not only build personal brands but to establish thriving businesses. With a track record of turning dreams into reality, Creator Led Brands is your compass in navigating the complexities of launching and running a successful creator-led business."',
    count: 3,
    ethics: [
      ['In a landscape where influencers aspire for more than just likes, '], ['Creator Led Brands steps in as the catalyst for a new wave of entrepreneurial ventures. ', true],
      ['The challenge? A lack of comprehensive solutions tailored to creators looking to turn their influence into lasting brands. ', true],
      ['Creator Led Brands rises to bridge this gap, dismantling barriers and guiding influencers toward sustainable success.'],
    ],
    counters: [['Influencers Collaborated With', 300], ['Bankable Campaigns Executed', 850], ['Influencers Successfully Promoted', 330]],
    mission: ['Our mission is clear', "To provide a space where your creative endeavors are watered with careful data analysis and unwavering support. A community where challenges turn into shared triumphs."],
    cases: [['Layers', 'layers'], ['Overlays'], ['Neha Doodles Calendars']],
  },
  pbm: {
    title: 'CREST',
    heading: ['Crafting Personalities:', 'Building Your Digital Aura'],
    intro: "Growth Garden redefines your online identity, ensuring it transcends the digital realm. Your brand is not confined to a niche; instead, we craft a narrative that spans across various facets of your personality and accomplishments. It's not just about visibility; it's about creating a lasting legacy that extends beyond the confines of screens.",
    count: 4,
    ethics: [
      ["In the cluttered expanse of the online world, the problem lies in the narrow scope that fails to capture the diverse aspects of an individual's personality and achievements. "],
      ['Growth Garden recognizes this limitation and steps in as a solution to redefine personal branding. ', true],
      ["Our approach goes beyond mere visibility; we understand the need to craft a narrative that seamlessly weaves through various aspects of one's persona."],
    ],
    counters: [['Influencers Collaborated With', 10000], ['Bankable Campaigns Executed', 850], ['Influencers Successfully Promoted', 330]],
    mission: ['Our mission is clear', "We redefine personal branding with a commitment to tailor every aspect of your narrative. No cookie-cutter solutions here – we delve deep into the intricacies of your story, preferences, and aspirations."],
    cases: [],
  },
}

export const SERVICE_LIST = [
  ['Influencer Marketing', 'im'],
  ['Talent Management', 'tm'],
  ['Creator-Led Business', 'ibd'],
  ['Personal Branding', 'pbm'],
]

function Counter({ target, go }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!go) return
    let v = 0
    const step = target / 150
    const t = setInterval(() => {
      v = Math.min(v + step, target)
      setN(Math.ceil(v))
      if (v >= target) clearInterval(t)
    }, 10)
    return () => clearInterval(t)
  }, [go, target])
  return <p>{n.toLocaleString()}+</p>
}

export function ServicePage() {
  const { slug } = useParams()
  const data = SERVICES[slug]
  const [active, setActive] = useState(false)
  const [go, setGo] = useState(false)
  const counterRef = useRef(null)

  useEffect(() => {
    setActive(false)
    setGo(false)
    const t = requestAnimationFrame(() => requestAnimationFrame(() => setActive(true)))
    return () => cancelAnimationFrame(t)
  }, [slug])

  useEffect(() => {
    const el = counterRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setGo(true), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [slug])

  if (!data) return <NotFound />
  const imgs = Array.from({ length: data.count }, (_, i) => `/img/svc/${slug}/${i}.webp`)
  const slider = [...imgs, ...imgs]
  return (
    <div className="svc-page">
      <section className="sp-hero">
        <div className={`sp-hero-main ${active ? 'active' : ''}`}>
          <h3>{data.title}</h3>
          <h2>{data.heading[0]}<br />{data.heading[1]}</h2>
          <p>{data.intro}</p>
          {data.cases[0]?.[1] && <Link to={`/case/${data.cases[0][1]}`} className="sp-pill">Case Studies</Link>}
        </div>
      </section>

      <section className="sp-marquee">
        <div className="sp-track">
          {slider.map((src, i) => <img key={i} src={src} alt="community post" loading="lazy" />)}
        </div>
      </section>

      <section className="sp-ethics">
        <p>{data.ethics.map(([t, hl], i) => (hl ? <span key={i}>{t}</span> : t))}</p>
      </section>

      <section className="sp-counters" ref={counterRef}>
        {data.counters.map(([label, target]) => (
          <div key={label} className="sp-counter">
            <Counter target={target} go={go} />
            <h3>{label}</h3>
          </div>
        ))}
      </section>

      <section className="sp-mission">
        <h2>{data.mission[0]}</h2>
        <p>{data.mission[1]}</p>
      </section>

      {data.cases.length > 0 && (
        <section className="sp-cases">
          <h2>Case Studies</h2>
          <div className="sp-case-row">
            {data.cases.map(([name, cs]) => cs
              ? <Link key={name} to={`/case/${cs}`} className="sp-case">{name}</Link>
              : <span key={name} className="sp-case">{name}</span>)}
          </div>
        </section>
      )}
    </div>
  )
}

export function WhatWeDo() {
  return (
    <section className="wwd">
      <div className="wwd-flex">
        <div className="wwd-text">
          <h2>Here's What We Bring to the Table</h2>
          <p>Our Services: From Idea to Impact</p>
        </div>
        <div className="wwd-list">
          {SERVICE_LIST.map(([label, slug]) => (
            <Link key={slug} to={`/services/${slug}`}>
              <div className="wwd-row">
                <h3>{label}</h3>
                <span className="plus">
                  <svg viewBox="0 0 512 512"><path d="M492 236H276V20c0-11.046-8.954-20-20-20s-20 8.954-20 20v216H20c-11.046 0-20 8.954-20 20s8.954 20 20 20h216v216c0 11.046 8.954 20 20 20s20-8.954 20-20V276h216c11.046 0 20-8.954 20-20s-8.954-20-20-20z" fill="#fff" /></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
