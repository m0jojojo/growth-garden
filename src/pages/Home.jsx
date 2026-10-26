import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const LINES = ['Crafting the core of', "Creators' Economy."]

const WORK = [
  { name: 'Tech Burner', tag: 'Talent Management', img: 'tech-burner.webp', to: '/case/tech-burner' },
  { name: 'Audi', tag: 'Influencer Marketing', img: 'audi.avif', to: '/case/audi' },
  { name: 'Layers', tag: 'Creator-led Business', img: 'layers.webp', to: '/case/layers' },
  { name: 'Skillshare', tag: 'Influencer Marketing', img: 'skillshare.webp', to: '/case/skillshare' },
  { name: 'Dharna', tag: 'Talent Management', img: 'dharna.webp', to: '/case/dharna' },
  { name: 'Sarkar', tag: 'Creator-Led Business', img: 'sarkar.jpg', href: 'https://www.sarkar.store/' },
  { name: 'Samsung', tag: 'Influencer Marketing', img: 'samsung.webp', to: '/case/samsung' },
  { name: 'Thugesh', tag: 'Talent Management', img: 'thugesh.webp', to: '/case/thugesh' },
]

const COUNTERS = [
  [10000, 'Creators', 'Collaborated With'],
  [330, 'Creators', 'Exclusively Managed'],
  [850, 'Bankable', 'Campaigns Executed'],
]

const SERVICES = [
  ['01', 'Influencer Marketing', 'Step into the realm of unparalleled brand collaborations and transformative campaigns with Growth Garden Influencer Marketing.', 'im'],
  ['02', 'Talent Management', 'Welcome to the beating heart of creator empowerment at Growth Garden. A sanctuary for creators seeking not just management but a transformative experience.', 'tm'],
  ['03', 'Creator Led Business', 'Embark on a transformative journey of entrepreneurship with Creator Led Brands.', 'ibd'],
  ['04', 'Personal Branding', 'Your brand is not confined to a niche; instead, we craft a narrative that spans across various facets of your personality and accomplishments.', 'pbm'],
]

function useReveal(threshold = 0.2) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, seen]
}

function Hero() {
  const [loading, setLoading] = useState(true)
  const [typed, setTyped] = useState(['', ''])
  const [done, setDone] = useState(false)

  useEffect(() => {
    const start = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(start)
  }, [])

  useEffect(() => {
    if (loading) return
    let line = 0
    let ch = 0
    let t
    const tick = () => {
      if (line >= LINES.length) return setDone(true)
      ch++
      setTyped((p) => p.map((s, i) => (i === line ? LINES[line].slice(0, ch) : s)))
      if (ch >= LINES[line].length) { line++; ch = 0 }
      t = setTimeout(tick, 80)
    }
    t = setTimeout(tick, 80)
    return () => clearTimeout(t)
  }, [loading])

  const cls = done ? 'fixedColor' : 'gradient'
  return (
    <section className="h-hero">
      {loading && <div className="h-loading" />}
      <div className={`h-hero-wrap ${loading ? '' : 'show'}`}>
        <h1>
          <span className={cls}>{typed[0]}</span>
          {typed[1] && <br />}
          <span className={cls}>{typed[1]}</span>
          <span className="h-dot" />
        </h1>
        <Link to="/contact" className="h-btn">Get In Touch <i className="first fa fa-arrow-right-long" /></Link>
      </div>
    </section>
  )
}

function VideoBand() {
  const ref = useRef(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {
      const resume = () => v.play().catch(() => {})
      document.addEventListener('click', resume, { once: true })
      document.addEventListener('touchstart', resume, { once: true })
    })
  }, [])
  return (
    <section className="h-video">
      <video ref={ref} autoPlay muted loop playsInline preload="auto" poster="/video/poster.jpg">
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
    </section>
  )
}

function Defines() {
  const [ref, seen] = useReveal(0.25)
  return (
    <section className="h-defines">
      <div className="h-defines-in">
        <div className="h-left">
          <h1><span>What</span> Defines Us</h1>
          <p>We craft compelling narratives and build strong, impactful partnerships that set new standards in the Indian creator economy.</p>
          <Link className="h-collab" to="/our-story">Dive Into Our Culture</Link>
        </div>
        <div className="h-right" ref={ref}>
          <div className={`h-right-in ${seen ? 'in' : ''}`}>
            <div className="h-bubble">We are the mapmakers of the content realm, navigating the digital landscape since its wild west days.</div>
            <div className="h-connector">
              <div className="h-dash">
                <svg xmlns="http://www.w3.org/2000/svg" width="280" height="422" viewBox="0 0 280 422" fill="none"><rect x="0.5" y="0.5" width="279" height="421" rx="29.5" stroke="white" strokeDasharray="4 4" /></svg>
              </div>
              <div className="h-circle-s"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="white" /></svg></div>
              <div className="h-circle-b"><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="50" fill="white" /></svg></div>
            </div>
            <div className="h-photo"><img src="/img/img1.webp" alt="Team" /></div>
          </div>
        </div>
      </div>
    </section>
  )
}

const ARROW = (
  <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" /></svg>
)

function WorkSlider() {
  return (
    <section className="h-work">
      <div className="h-work-in">
        <Swiper
          modules={[Autoplay, Navigation]}
          loop
          slidesPerView={1}
          spaceBetween={40}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        >
          {WORK.map((w) => (
            <SwiperSlide key={w.name}>
              <div className="h-brand-item">
                <img src={`/img/work/${w.img}`} alt={w.name} />
                {w.to
                  ? <Link to={w.to} className="h-brand-arrow" aria-label={w.name}>{ARROW}</Link>
                  : <a href={w.href} className="h-brand-arrow" target="_blank" rel="noopener noreferrer" aria-label={w.name}>{ARROW}</a>}
              </div>
              <h3>{w.name}</h3>
              <p>{w.tag}</p>
              <hr />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="h-viewall"><Link to="/our-work">View All</Link></div>
      </div>
    </section>
  )
}

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

function Counters() {
  const [ref, seen] = useReveal(0.25)
  return (
    <section className="h-counters" ref={ref}>
      {COUNTERS.map(([target, a, b]) => (
        <div key={b} className="h-counter">
          <Counter target={target} go={seen} />
          <h3>{a}<br />{b}</h3>
        </div>
      ))}
    </section>
  )
}

function Services() {
  const [ref, seen] = useReveal(0.1)
  return (
    <section className="h-services">
      <h2>Here's What We Bring to the Table</h2>
      <p className="sub">Our Services: From Idea to Impact</p>
      <div ref={ref} className={`h-svc-grid ${seen ? 'in' : ''}`}>
        {SERVICES.map(([num, title, body, slug]) => (
          <div key={num} className="h-svc" data-number={num}>
            <h3>{title}</h3>
            <p>{body}</p>
            <Link className="h-know" to={`/services/${slug}`} data-text="Know More">Know More</Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <VideoBand />
      <Defines />
      <WorkSlider />
      <Counters />
      <Services />
    </>
  )
}
