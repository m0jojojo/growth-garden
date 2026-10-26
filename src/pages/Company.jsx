import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import BrandSlider from '../components/BrandSlider.jsx'
import gsap from 'gsap'
import wavePath from '../data/wavePath.js'

const WAVE_TEXT = "We're not your average story; we don't ride the waves, we create them. We're not your average story; we don't ride the waves, we create them."

function IntroAnimation() {
  const root = useRef(null)
  useEffect(() => {
    const box = root.current.querySelector('.os-box')
    const circle = root.current.querySelector('.os-circle')
    const text = root.current.querySelector('.os-text')
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const demo = { rotation: -Math.PI / 2, radius: 300, opacity: 0, size: 150 }

    const updateBox = () => {
      gsap.set(box, {
        x: centerX + Math.cos(demo.rotation) * demo.radius,
        y: centerY + Math.sin(demo.rotation) * demo.radius,
        width: demo.size, height: demo.size, opacity: demo.opacity,
      })
    }
    const syncRadius = () => {
      const scale = gsap.getProperty(circle, 'scale')
      demo.radius = (250 * scale) / 2 + demo.size / 2 + 20
    }
    const startRotation = () => {
      demo.opacity = 1
      gsap.to(demo, {
        duration: 2, rotation: demo.rotation - Math.PI * 2, ease: 'none', repeat: 2,
        onUpdate: () => {
          updateBox()
          const progress = (-demo.rotation + Math.PI / 2) / (Math.PI * 2 * 3)
          demo.opacity = Math.min(demo.opacity, Math.max(1 - progress, 0))
        },
        onComplete: () => { demo.opacity = 0; updateBox() },
      })
    }

    const ctx = gsap.context(() => {
      gsap.set(circle, { xPercent: -50, yPercent: -50, x: centerX, y: centerY })
      gsap.set(box, { xPercent: -50, yPercent: -50, x: centerX, y: centerY, width: demo.size, height: demo.size, opacity: 0 })
      gsap.timeline()
        .fromTo(circle, { y: -400, opacity: 0, scale: 1 }, { y: centerY, opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' })
        .to(circle, { scale: 2, duration: 4, onUpdate: syncRadius })
        .add(startRotation, '>')
        .to(circle, { x: centerX - 900, y: -500, opacity: 0, scale: 3, duration: 6, onUpdate: syncRadius })
      gsap.from(text, { opacity: 0, y: 50, duration: 1, delay: 5, ease: 'power2.out' })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="os-intro" ref={root}>
      <div className="os-main">
        <div className="os-circle" />
        <div className="os-box" />
        <div id="os-greeting" />
      </div>
      <div className="os-text"><h1>We are <span>Growth Garden</span></h1></div>
    </section>
  )
}

function Waves() {
  const ref = useRef(null)
  useEffect(() => {
    let offset = -100
    let last = performance.now()
    let raf
    const frame = (now) => {
      const dt = (now - last) / 1000
      last = now
      offset += 9 * dt
      if (offset > 100) offset = -100
      ref.current?.setAttribute('startOffset', offset + '%')
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <section className="os-waves">
      <svg viewBox="0 0 1600 692" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path id="ribbonPath" d={wavePath} />
        <text><textPath ref={ref} href="#ribbonPath" startOffset="0%" className="os-wave-text">{WAVE_TEXT}</textPath></text>
      </svg>
    </section>
  )
}

export function OurStory() {
  return (
    <div className="os">
      <IntroAnimation />
      <Waves />
      <section className="os-creator">
        <div className="os-creator-in" style={{ backgroundImage: 'url(/img/story/ellipse.webp)' }}>
          <div className="os-creator-flex">
            <h2>Growth Garden kicked off when everyone was still trying to make sense of<br /><span>the creator economy.</span></h2>
            <p>From the ground up, we've revolutionized the content game. We're not just involved in crafting digital narratives; we shape businesses. We possess an unparalleled capacity to bring brands and creators together and ensure that collaborations become more than transactions.</p>
          </div>
        </div>
      </section>
      <section className="os-goal">
        <div className="os-goal-in" style={{ backgroundImage: 'url(/img/story/moon.webp)' }}>
          <h2><span>Our goal </span> is to shape how the world of today and tomorrow looks at the <span>creator economy</span>.</h2>
        </div>
      </section>
      <section className="os-redefine">
        <div className="os-redefine-grid">
          <div className="os-redefine-top">
            <h4>But hey,</h4>
            <h2>We <span>redefine</span><br /> industry standards.</h2>
          </div>
          <div className="os-redefine-text">
            <div className="os-block">
              <h3>we're not just about the glitz and glamor</h3>
              <p>At our core, we are a group of data nerds who know how to determine trends as well as create them. We are proficient in deciphering your identity, and craft strategies that seamlessly align with your unique persona and passions.</p>
            </div>
            <div className="os-block">
              <h3 className="purple">our mission IS SIMPLE</h3>
              <p>Level up your game and redefine your storytelling journey, making it an adventure that your audience won't want to miss.</p>
            </div>
          </div>
          <div className="os-redefine-img"><img src="/img/story/team.png" alt="Team" /></div>
        </div>
      </section>
    </div>
  )
}

const ARROW = (
  <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" /></svg>
)

const GROUPS = [
  { n: '01', title: 'Influencer Marketing', body: ['Step into the realm of unparalleled brand collaborations', 'and transformative campaigns with Growth Garden Influencer Marketing.'], items: [['Skillshare', '0.webp', '/case/skillshare'], ['Audi', '1.avif', '/case/audi'], ['Haier'  , '2.webp'], ['Samsung', '3.webp', '/case/samsung'], ['Honasa', '4.webp']] },
  { n: '02', title: 'Talent Managemnt', body: ['Welcome to the beating heart of creator empowerment at Growth Garden. A sanctuary for', 'creators seeking not just management but a transformative experience.'], items: [['Tech Burner', '5.webp', '/case/tech-burner'], ['Ritvi Shah', '6.webp'], ['Dharna', '7.webp', '/case/dharna'], ['Thugesh', '8.webp', '/case/thugesh'], ['Aaliyah Kashyap', '9.webp'], ['Saloni Gaur', '10.webp'], ['Raghav Sharma', '11.webp'], ['Neha Doodles', '12.webp']] },
  { n: '03', title: 'Creator-led Business (IBD)', body: ['Embark on a transformative journey of entrepreneurship with', 'Creator Led Brands.'], items: [['Layers', '13.webp', '/case/layers'], ['Overlays', '14.webp'], ['Neha Doodles Calendars', '15.webp']] },
]

export function OurWork() {
  return (
    <div className="ow">
      {GROUPS.map((g) => (
        <section key={g.n} className="h-work ow-sec">
          <div className="ow-head">
            <h3>{g.n}</h3>
            <h2>{g.title}</h2>
            <p>{g.body[0]}<br />{g.body[1]}</p>
          </div>
          <div className="h-work-in">
            <BrandSlider
              items={g.items}
              renderSlide={([name, file, to]) => (
                <>
                  <div className="h-brand-item">
                    <img src={`/img/ow/${file}`} alt={name} />
                    {to && <Link to={to} className="h-brand-arrow" aria-label={name}>{ARROW}</Link>}
                  </div>
                  <h3>{name}</h3>
                  <hr />
                </>
              )}
            />
          </div>
        </section>
      ))}
    </div>
  )
}
