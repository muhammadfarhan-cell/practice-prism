import { useCallback, useEffect, useState, type CSSProperties } from 'react'
import { useReducedMotion } from 'motion/react'
import { DashboardPreview } from './DashboardPreview'
import './Hero.css'

type Stream = {
  name: string
  color: string
  y: number
  badgeX: number
  badgeY: number
  particles: { label: string; x: number }[]
}

const streams: Stream[] = [
  { name: 'FINANCES', color: '#526aff', y: 172, badgeX: 230, badgeY: 176, particles: [{ label: 'Revenue', x: 620 }, { label: 'Budgets', x: 960 }] },
  { name: 'CLINIC EHR', color: '#65dfc5', y: 404, badgeX: 270, badgeY: 384, particles: [{ label: 'Visits', x: 625 }, { label: 'New Patients', x: 940 }] },
  { name: 'MARKETING', color: '#bb96e5', y: 655, badgeX: 235, badgeY: 625, particles: [{ label: 'Leads', x: 615 }, { label: 'Ad Spend', x: 940 }] },
]

// The three chips in each vertical column travel together into the Prism.
const dataAbsorption = [
  { start: 4.25, end: 5.25 }, // Revenue, Visits, Leads
  { start: 2.9, end: 4.2 }, // Budgets, New Patients, Ad Spend
]
const categoryAbsorption = { start: 5.4, end: 6.7 }
const logoEntrance = 1.2
const logoTravel = 2.25
const dashboardReveal = 7.4
const finalLayout = 9.8
const animationEnd = 10.2

function clamp(value: number) {
  return Math.max(0, Math.min(1, value))
}

function smoothstep(value: number) {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}

function prismCenterAt(seconds: number) {
  return 1655 - 935 * smoothstep((seconds - logoEntrance) / logoTravel)
}

function waveY(baseY: number, strand: number, x: number, endX: number) {
  const t = Math.max(0, Math.min(1, (x + 40) / (endX + 40)))
  const ease = t * t * (3 - 2 * t)
  const ripple = Math.sin(x / 118 + strand * .08) * 51 * (1 - ease)
  return (baseY + strand * 5 + ripple) * (1 - ease) + (450 + strand * 1.2) * ease
}

function wavePath(baseY: number, strand: number, startX: number, endX: number) {
  return Array.from({ length: 61 }, (_, index) => {
    const x = startX + ((endX - startX) * index) / 60
    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${waveY(baseY, strand, x, 1440).toFixed(1)}`
  }).join(' ')
}

function WaveScene({ phase, seconds, bleed }: { phase: number; seconds: number; bleed: number }) {
  const prismCenter = prismCenterAt(seconds)
  const waveOpacity = 1 - smoothstep((seconds - categoryAbsorption.end) / .6)
  const fadeStart = Math.max(0, prismCenter - 220)
  const fadeEnd = Math.max(fadeStart + 1, prismCenter + 90)
  const waveStart = -bleed - 40
  const waveEnd = 1440 + bleed
  return (
    <div className={`wave-scene wave-scene--phase-${phase}`} aria-hidden={phase >= 3}>
      <svg
        className="wave-scene__lines"
        viewBox={`${-bleed} 0 ${1440 + bleed * 2} 900`}
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ left: -bleed, width: 1440 + bleed * 2, maskImage: `linear-gradient(to right, #000 0px, #000 ${fadeStart + bleed}px, transparent ${fadeEnd + bleed}px)`, opacity: waveOpacity }}
      >
        {streams.map(stream => (
          <g key={stream.name} className="wave-scene__stream" style={{ '--wave-color': stream.color } as CSSProperties}>
            {Array.from({ length: 9 }, (_, index) => (
              <path
                key={index}
                className={index === 4 ? 'wave-scene__bright' : ''}
                d={wavePath(stream.y, index - 4, waveStart, waveEnd)}
              />
            ))}
            <path
              className="wave-scene__pulse"
              d={wavePath(stream.y, 0, waveStart, waveEnd)}
            />
          </g>
        ))}
      </svg>

      {streams.map(stream => {
        const { start, end } = categoryAbsorption
        const progress = smoothstep((seconds - start) / (end - start))
        const x = stream.badgeX + (720 - stream.badgeX) * progress
        const lineY = stream.badgeY + waveY(stream.y, 0, x, 1440) - waveY(stream.y, 0, stream.badgeX, 1440)
        const y = lineY + (432 - lineY) * smoothstep((progress - .7) / .3)
        const absorb = smoothstep((seconds - (end - .38)) / .38)
        return (
          <span
            className="wave-scene__badge"
            key={stream.name}
            style={{ left: x, top: y, opacity: 1 - absorb, transform: `scale(${1 - absorb * .82})`, '--wave-color': stream.color } as CSSProperties}
          ><i />{stream.name}</span>
        )
      })}

      {streams.flatMap(stream => stream.particles.map((particle, index) => {
        const { start, end } = dataAbsorption[index]
        const startX = particle.x - (index === 0 ? 190 : 300)
        const interceptX = prismCenterAt(end)
        const x = startX + (interceptX - startX) * smoothstep((seconds - start) / (end - start))
        const y = waveY(stream.y, 0, x, 1440)
        const absorb = smoothstep((seconds - (end - .38)) / .38)
        return (
          <span
            className="wave-scene__particle"
            key={particle.label}
            style={{ left: x, top: y - 18, opacity: 1 - absorb, transform: `scale(${1 - absorb * .85})`, '--wave-color': stream.color } as CSSProperties}
          >
            <i />{particle.label}
          </span>
        )
      }))}

      <div className="wave-scene__prism-wrap" style={{ left: prismCenter - 185 }}>
        <img src="/hero-prism.svg" className="wave-scene__prism" alt="" />
      </div>
      <div className="wave-scene__flash" />
    </div>
  )
}

export function Hero() {
  const reducedMotion = useReducedMotion()
  const [elapsed, setElapsed] = useState(0)
  const [run, setRun] = useState(0)
  const [layout, setLayout] = useState({ scale: 1, bleed: 0 })
  const seconds = elapsed / 1000
  const phase = seconds < logoEntrance ? 0 : seconds < logoEntrance + logoTravel ? 1 : seconds < dashboardReveal ? 2 : seconds < finalLayout ? 3 : 4

  useEffect(() => {
    const measure = () => {
      const scale = Math.min(window.innerWidth / 1440, (window.innerHeight - 96) / 900, 1)
      setLayout({ scale, bleed: Math.max(0, (window.innerWidth / scale - 1440) / 2) })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setElapsed(animationEnd * 1000)
      return
    }
    setElapsed(0)
    const started = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const next = Math.min(now - started, animationEnd * 1000)
      setElapsed(next)
      if (next < animationEnd * 1000) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [reducedMotion, run])

  const replay = useCallback(() => setRun(value => value + 1), [])

  useEffect(() => {
    window.addEventListener('prism:replay', replay)
    return () => window.removeEventListener('prism:replay', replay)
  }, [replay])

  return (
    <section className="hero-story" id="story" aria-label="Practice Prism product story">
      <div className="hero-story__space" aria-hidden="true" />
      <div className="hero-story__canvas" id="top" style={{ transform: `translate(-50%, -50%) scale(${layout.scale})` }}>
        <WaveScene phase={phase} seconds={seconds} bleed={layout.bleed} />

        <div className={`dashboard-stage dashboard-stage--phase-${phase}`} aria-hidden={phase < 3}>
          <div className="dashboard-stage__frame"><DashboardPreview /></div>
        </div>

        <div className={`final-stage ${phase === 4 ? 'is-visible' : ''}`} aria-hidden={phase !== 4} inert={phase !== 4}>
          <span className="final-stage__eyebrow">AI PRACTICE INTELLIGENCE FOR CHIROPRACTIC</span>
          <h1>Your whole practice.<br />One clear answer.</h1>
          <div className="final-stage__insight">
            <span className="final-stage__kicker">PRACTICE INSIGHTS</span>
            <h2>What the numbers<br />are telling you.</h2>
            <p className="final-stage__support">Your practice data becomes a clearer view of what matters most.</p>
            <p className="final-stage__next">Connect your practice data, ask a question, and find a clear next step.</p>
            <div className="final-stage__outcomes">
              <div><i className="blue" />Clarity</div>
              <div><i className="purple" />Profitability</div>
              <div><i className="gold" />Power</div>
            </div>
            <div className="final-stage__progress"><span /></div>
            <small>Your dashboard, your practice, one clear view.</small>
          </div>
          <div className="final-stage__actions"><a className="button button--gold" href="#plans">Get Clarity with Prism</a><button className="button button--dark" type="button" onClick={replay}>See how it works</button></div>
          <span className="final-stage__trial">Start with a 7-day free trial</span>
        </div>
      </div>
    </section>
  )
}
