import { useCallback, useEffect, useState, type CSSProperties } from 'react'
import { useReducedMotion } from 'motion/react'
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

// The Prism passes each column while it moves left, then sends its answer down the gold beam.
const rightColumn = { start: 3.05, end: 3.55 }
const middleColumn = { start: 4.05, end: 4.55 }
const leftColumn = { start: 5.2, end: 5.85 }
const logoEntrance = 1.1
const logoExit = 7.9
// Let the beam become visible as the first (rightmost) chip column begins to enter.
const beamStart = rightColumn.start - .4
const answerMoveStart = leftColumn.end
const answerSettle = 8.05
const headlineStart = 8.28
const actionsStart = 9.12
const animationEnd = 10.1
const answerHalfWidth = 130
const answerLineY = 442
const prismBeamY = 400
const prismBeamOffsetX = 68

function clamp(value: number) {
  return Math.max(0, Math.min(1, value))
}

function smoothstep(value: number) {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}

function prismCenterAt(seconds: number) {
  return 1655 - 2155 * clamp((seconds - logoEntrance) / (logoExit - logoEntrance))
}

function answerCenterAt(seconds: number, bleed: number) {
  const rightEdge = 1440 + bleed
  const startCenter = rightEdge + answerHalfWidth
  return startCenter + (720 - startCenter) * smoothstep((seconds - answerMoveStart) / (answerSettle - answerMoveStart))
}

function waveY(baseY: number, strand: number, x: number, endX: number) {
  const t = Math.max(0, Math.min(1, (x + 40) / (endX + 40)))
  const ease = t * t * (3 - 2 * t)
  const ripple = Math.sin(x / 118 + strand * .08) * 51 * (1 - ease)
  return (baseY + strand * 5 + ripple) * (1 - ease) + (450 + strand * 1.2) * ease
}

function convergedWaveY(baseY: number, strand: number, x: number, prismCenter: number, seconds: number) {
  const originalY = waveY(baseY, strand, x, 1440)
  const approach = smoothstep((seconds - logoEntrance) / .65)
  const funnel = smoothstep((x - (prismCenter - 530)) / 390) * approach
  return originalY + (425 + strand * .7 - originalY) * funnel
}

function wavePath(baseY: number, strand: number, startX: number, endX: number, prismCenter: number, seconds: number) {
  return Array.from({ length: 61 }, (_, index) => {
    const x = startX + ((endX - startX) * index) / 60
    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${convergedWaveY(baseY, strand, x, prismCenter, seconds).toFixed(1)}`
  }).join(' ')
}

function chipApproach(seconds: number, start: number, end: number) {
  return smoothstep((seconds - (start - .85)) / (end - start + .85))
}

function chipOpacity(progress: number, chipX: number, prismCenter: number) {
  const passedIntoPrism = smoothstep((chipX - (prismCenter - 10)) / 110)
  return (1 - progress) * (1 - passedIntoPrism)
}

function WaveScene({ seconds, bleed }: { seconds: number; bleed: number }) {
  const prismCenter = prismCenterAt(seconds)
  const prismOpacity = smoothstep((seconds - logoEntrance) / .45) * (1 - smoothstep((seconds - 6.8) / .65))
  const beamArrival = smoothstep((seconds - beamStart) / .1)
  const beamOpacity = beamArrival * (1 - .82 * smoothstep((seconds - answerSettle) / .4))
  const emissionOpacity = beamArrival * (1 - smoothstep((seconds - 6.2) / .7))
  const sourceOpacity = beamArrival * (1 - smoothstep((seconds - 7.1) / .55))
  const waveOpacity = 1 - smoothstep((seconds - leftColumn.end) / .7)
  const fadeStart = Math.max(0, prismCenter - 165 + bleed)
  const fadeEnd = Math.max(fadeStart + 1, prismCenter + 55 + bleed)
  const waveStart = -bleed - 40
  const waveEnd = 1440 + bleed
  const beamSourceX = prismCenter + prismBeamOffsetX
  const beamFirstTipX = prismCenterAt(beamStart) + prismBeamOffsetX + 65
  const answerLeft = answerCenterAt(seconds, bleed) - answerHalfWidth
  const beamReach = smoothstep((seconds - beamStart) / (answerMoveStart - beamStart))
  const beamTip = seconds < answerMoveStart ? beamFirstTipX + (waveEnd - beamFirstTipX) * beamReach : answerLeft
  const beamDrop = smoothstep((seconds - answerSettle) / .55)
  const beamSpread = smoothstep((seconds - answerSettle - .45) / .5)
  const beamY = answerLineY + 138 * beamDrop
  const beamEndX = beamTip + (waveEnd - beamTip) * beamSpread
  const beamSourceY = prismBeamY + (beamY - prismBeamY) * beamDrop
  const beamBend = Math.min(160, Math.max(20, (beamEndX - beamSourceX) * .25))
  const beamPath = `M ${beamSourceX} ${beamSourceY} C ${beamSourceX + beamBend} ${beamSourceY}, ${beamEndX - beamBend} ${beamY}, ${beamEndX} ${beamY}`
  return (
    <div className="wave-scene" aria-hidden="true">
      <svg
        className="wave-scene__lines"
        viewBox={`${-bleed} 0 ${1440 + bleed * 2} 900`}
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ left: -bleed, width: 1440 + bleed * 2, maskImage: `linear-gradient(to right, #000 0px, #000 ${fadeStart}px, transparent ${fadeEnd}px)`, opacity: waveOpacity }}
      >
        {streams.map(stream => (
          <g key={stream.name} className="wave-scene__stream" style={{ '--wave-color': stream.color } as CSSProperties}>
            {Array.from({ length: 9 }, (_, index) => (
              <path
                key={index}
                className={index === 4 ? 'wave-scene__bright' : ''}
                d={wavePath(stream.y, index - 4, waveStart, waveEnd, prismCenter, seconds)}
              />
            ))}
            <path
              className="wave-scene__pulse"
              d={wavePath(stream.y, 0, waveStart, waveEnd, prismCenter, seconds)}
            />
          </g>
        ))}
      </svg>

      {streams.map(stream => {
        const { start, end } = leftColumn
        const progress = smoothstep((seconds - start) / (end - start))
        const x = stream.badgeX + 70 * chipApproach(seconds, start, end)
        const originalOffset = stream.badgeY - waveY(stream.y, 0, stream.badgeX, 1440)
        const funnel = smoothstep((x - (prismCenter - 530)) / 390) * smoothstep((seconds - logoEntrance) / .65)
        const y = convergedWaveY(stream.y, 0, x, prismCenter, seconds) + originalOffset * (1 - funnel)
        return (
          <span
            className="wave-scene__badge"
            key={stream.name}
            style={{ left: x, top: y, opacity: chipOpacity(progress, x, prismCenter), transform: `scale(${1 - progress * .84})`, '--wave-color': stream.color } as CSSProperties}
          ><i />{stream.name}</span>
        )
      })}

      {streams.flatMap(stream => stream.particles.map((particle, index) => {
        const { start, end } = index === 0 ? middleColumn : rightColumn
        const progress = smoothstep((seconds - start) / (end - start))
        const x = particle.x + 70 * chipApproach(seconds, start, end)
        const y = convergedWaveY(stream.y, 0, x, prismCenter, seconds)
        return (
          <span
            className="wave-scene__particle"
            key={particle.label}
            style={{ left: x, top: y - 18, opacity: chipOpacity(progress, x, prismCenter), transform: `scale(${1 - progress * .85})`, '--wave-color': stream.color } as CSSProperties}
          >
            <i />{particle.label}
          </span>
        )
      }))}

      <svg className="wave-scene__gold-beam" viewBox={`${-bleed} 0 ${1440 + bleed * 2} 900`} aria-hidden="true" style={{ left: -bleed, width: 1440 + bleed * 2, opacity: beamOpacity }}>
        <defs>
          <linearGradient id="hero-output-gold" gradientUnits="userSpaceOnUse" x1="-400" y1="425" x2="1440" y2="425">
            <stop stopColor="#a66517" />
            <stop offset=".45" stopColor="#e1ad4c" />
            <stop offset=".78" stopColor="#fff0aa" />
            <stop offset="1" stopColor="#c18729" />
          </linearGradient>
        </defs>
        <path className="wave-scene__gold-glow" d={beamPath} />
        <path className="wave-scene__gold-halo" d={beamPath} />
        <path className="wave-scene__gold-core" d={beamPath} />
        <circle className="wave-scene__gold-tip" cx={beamEndX} cy={beamY} r="4" style={{ opacity: beamArrival * (1 - smoothstep((seconds - answerSettle) / .3)) }} />
      </svg>

      <div className="wave-scene__prism-wrap" style={{ left: prismCenter - 185, opacity: prismOpacity }}>
        <img src="/hero-prism.svg" className="wave-scene__prism" alt="" />
      </div>
      <div className="wave-scene__emission" style={{ left: beamSourceX, top: prismBeamY, opacity: emissionOpacity }} />
      <div className="wave-scene__source" style={{ left: beamSourceX, top: prismBeamY, opacity: sourceOpacity }} />
    </div>
  )
}

export function Hero() {
  const reducedMotion = useReducedMotion()
  const [elapsed, setElapsed] = useState(0)
  const [run, setRun] = useState(0)
  const [layout, setLayout] = useState({ scale: 1, bleed: 0 })
  const seconds = elapsed / 1000
  const answerVisible = seconds >= answerMoveStart
  const messageVisible = seconds >= headlineStart
  const answerOffset = Math.round(answerCenterAt(seconds, layout.bleed) - 720)
  const outcomes = ['Clarity.', 'Profitability.', 'Power.']

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
        <WaveScene seconds={seconds} bleed={layout.bleed} />

        <div className="final-stage" aria-hidden={!answerVisible} inert={!answerVisible}>
          <span className={`final-stage__eyebrow${messageVisible ? ' is-visible' : ''}`}>AI PRACTICE INTELLIGENCE FOR CHIROPRACTIC</span>
          <h1 className={messageVisible ? 'is-visible' : ''} aria-hidden={!messageVisible}>Your whole practice.<br /><em>One clear answer.</em></h1>
          <div className="final-stage__outcomes" aria-label="Clarity, Profitability, Power" style={{ transform: `translateX(calc(-50% + ${answerOffset}px))` }}>
            {outcomes.map(word => (
              <span key={word} className={seconds >= beamStart - .25 ? 'is-visible' : ''}>{word}</span>
            ))}
          </div>
          <div className={`final-stage__actions${seconds >= actionsStart ? ' is-visible' : ''}`} inert={seconds < actionsStart} aria-hidden={seconds < actionsStart}>
            <a className="button button--gold" href="#plans">Get Clarity with Prism</a>
            <button className="button button--dark" type="button" onClick={replay}>Replay the story</button>
          </div>
        </div>
      </div>
    </section>
  )
}
