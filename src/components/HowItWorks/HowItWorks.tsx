import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import './HowItWorks.css'

const chapters = [
  { title: 'Connect your systems', description: 'Bring the tools behind your practice into one clear view.' },
  { title: 'Ask The Prism', description: 'Start with a real question about your practice.' },
  { title: 'Move forward with clarity', description: 'Turn an answer into a practical next step.' },
]

const sampleQuestion = 'What is the recommended workflow for follow-ups after first visit?'
const clamp = (value: number) => Math.min(1, Math.max(0, value))
const ease = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}

const systems = [
  { name: 'QuickBooks', className: 'quickbooks', mark: 'qb', logo: '' },
  { name: 'ChiroHD', className: 'chiro', mark: '', logo: '/chirohd-icon.svg' },
  { name: 'Meta Marketing', className: 'meta', mark: '', logo: '/meta-logo.svg' },
  { name: 'Google Ads', className: 'google', mark: '', logo: '/google-ads-logo.svg' },
]

function ConnectScene({ progress }: { progress: number }) {
  const connectProgress = ease(progress)
  return (
    <div className="how-connect" aria-label="QuickBooks, ChiroHD, Meta Marketing and Google Ads connect to Practice Prism">
      <div className="how-connect__halo how-connect__halo--one" />
      <div className="how-connect__halo how-connect__halo--two" style={{ transform: `translate(-50%, -50%) rotate(${connectProgress * 95}deg)` }} />
      <div className="how-connect__halo how-connect__halo--three" />
      <svg className="how-connect__paths" viewBox="0 0 1060 570" aria-hidden="true">
        <path style={{ strokeDashoffset: -150 * connectProgress }} d="M 212 175 C 328 170 350 276 479 285" />
        <path style={{ strokeDashoffset: -150 * connectProgress }} d="M 850 155 C 725 172 705 270 580 285" />
        <path style={{ strokeDashoffset: -150 * connectProgress }} d="M 205 420 C 335 405 355 306 479 285" />
        <path style={{ strokeDashoffset: -150 * connectProgress }} d="M 862 420 C 728 398 702 307 580 285" />
      </svg>
      <div className="how-connect__energy" aria-hidden="true" />
      {systems.map((system, index) => (
        <div className={`how-connect__system how-connect__system--${system.className}`} key={system.name} style={{ transform: `translateY(${-8 * connectProgress}px)` }}>
          <span className={`how-connect__mark how-connect__mark--${system.className}`} aria-hidden="true">{system.logo ? <img src={system.logo} alt="" /> : system.mark}</span>
          <span>{system.name}</span>
          <span className="how-connect__check" aria-hidden="true" style={{ opacity: ease((progress - (.48 + index * .11)) / .12), transform: `scale(${.6 + .4 * ease((progress - (.48 + index * .11)) / .12)})` }}>✓</span>
        </div>
      ))}
      <div className="how-connect__center">
        <div className="how-connect__prism"><img src="/hero-prism.svg" alt="" /></div>
        <span>PRACTICE<br /><strong>PRISM</strong></span>
      </div>
      <div className="how-connect__caption">YOUR PRACTICE, CONNECTED</div>
    </div>
  )
}

function ChatScene({ seconds }: { seconds: number }) {
  const typed = seconds >= .75 && seconds < 2.7
  const asked = seconds >= 2.7
  const analyzing = seconds >= 3.3 && seconds < 4.8
  const needsSource = seconds >= 4.8 && seconds < 6.25
  const answered = seconds >= 6.25
  const questionLength = Math.round(sampleQuestion.length * ease((seconds - .75) / 1.75))
  return (
    <div className="how-product" aria-label="Illustrative view of The Prism assistant">
      <div className="how-product__bar">
        <img src="/practice-prism-logo.png" alt="Practice Prism" />
        <span className="how-product__bar-title">PRACTICE INTELLIGENCE</span>
        <span className="how-product__avatar">SK</span>
      </div>
      <div className="how-product__body">
        <aside className="how-product__nav" aria-label="Product preview navigation">
          <span>◫ <b>Dashboard</b></span>
          <span>▤ <b>DNA Score</b></span>
          <span className="is-current">◇ <b>The Prism</b></span>
          <span>♙ <b>Experts</b></span>
          <span>▥ <b>Reports & Insights</b></span>
          <span>♧ <b>Integrations</b></span>
        </aside>
        <aside className="how-product__history">
          <div className="how-product__new">＋ &nbsp; New Chat</div>
          <div className="how-product__search">⌕ &nbsp; Search conversations</div>
          <span className="how-product__today">TODAY</span>
          {asked && <div className="how-product__conversation">Recommended Follow-Up Workflow</div>}
          <div>Billing and Payment Policy Summary</div>
          <div>Daily SOPs for Clinic Team Operations</div>
        </aside>
        <div className="how-product__chat">
          <div className="how-product__chat-top"><span className="how-product__expert">♙ &nbsp; Expert Help</span><strong>The Prism</strong><span className="how-product__filter">◇ &nbsp; All</span></div>
          {!asked ? (
            <div className="how-product__welcome">
              <h3>Hey Sheraz Khalid, how can I help you today?</h3>
              <p>I can help you analyze your clinic’s performance, answer financial or operational questions, review trends, and offer recommendations based on your data.</p>
              <div className="how-product__suggestions">
                <div className={`${seconds < 2.7 ? 'is-selected' : ''} ${seconds >= .45 && seconds < 1.1 ? 'is-clicked' : ''}`}>{sampleQuestion}<small>Systems</small></div>
                <div>How should we handle missed appointments and no-shows?<small>Systems</small></div>
                <div>What are the top actions we should take to improve patient retention?<small>Marketing</small></div>
              </div>
            </div>
          ) : (
            <div className="how-product__thread">
              <div className="how-product__question">{sampleQuestion}<small>Just now</small></div>
              {analyzing && <div className="how-product__thinking"><span className="how-product__assistant-mark">△</span><span className="how-product__spinner" />Figuring out where to look for the answer…</div>}
              {needsSource && <div className="how-product__reply"><span className="how-product__assistant-mark">△</span><div>I can provide guidance on follow-up workflows after a first visit from different sources, mainly your EHR system or general practice advice. The EHR source is slightly more relevant here. Which would you prefer me to use for your answer?<div className="how-product__sources"><span className="is-picked">Use my EHR data</span><span>General practice advice</span></div></div></div>}
              {answered && <div className="how-product__reply how-product__reply--result"><span className="how-product__assistant-mark">△</span><div><span className="how-product__demo-label">ILLUSTRATIVE RESPONSE · EHR CONTEXT</span><strong>A clearer first-visit follow-up workflow</strong><p>Assign an owner, schedule the next check-in, and review patients who have not booked their next appointment.</p><div className="how-product__workflow"><span>First visit</span><i>→</i><span>Follow-up</span><i>→</i><span>Review</span></div></div></div>}
            </div>
          )}
          <div className={`how-product__compose${typed ? ' is-typing' : ''}${seconds >= 2.5 && seconds < 3.2 ? ' is-sending' : ''}`}><span>{typed ? sampleQuestion.slice(0, questionLength) : 'Type a message'}{typed && <i className="how-product__caret" />}</span><b>➤</b></div>
        </div>
      </div>
    </div>
  )
}

function ResultCard() {
  return (
    <div className="how-result">
      <span className="how-result__label">THE NEXT STEP</span>
      <div className="how-result__icon">↗</div>
      <h3>Move forward<br />with clarity.</h3>
      <p>With the right context, The Prism turns a practice question into a practical next step.</p>
      <div className="how-result__trail"><span>Connected systems</span><i /><span>Better context</span><i /><strong>Clear next step</strong></div>
    </div>
  )
}

export function HowItWorks() {
  const reducedMotion = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)
  const [scrollStage, setScrollStage] = useState(0)
  const [stageSeconds, setStageSeconds] = useState(0)
  const stage = reducedMotion ? 2 : scrollStage
  const connectProgress = reducedMotion ? 1 : clamp(stageSeconds / 3.6)
  const chatSeconds = reducedMotion || stage === 2 ? 7 : stageSeconds

  useEffect(() => {
    if (reducedMotion) return
    const element = stageRef.current
    if (!element) return
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setEntered(true)
        observer.disconnect()
      }
    }, { threshold: .25 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    let frame = 0
    const update = () => {
      frame = 0
      const track = trackRef.current
      const stage = stageRef.current
      if (!track || !stage) return
      const stickyTop = parseFloat(window.getComputedStyle(stage).top) || 0
      const distance = Math.max(1, track.offsetHeight - stage.offsetHeight)
      const next = Math.min(1, Math.max(0, (stickyTop - track.getBoundingClientRect().top) / distance))
      setScrollStage(next < .34 ? 0 : next < .69 ? 1 : 2)
    }
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  useEffect(() => {
    if (!entered || reducedMotion || stage === 2) return
    setStageSeconds(0)
    const started = performance.now()
    const duration = stage === 0 ? 3600 : 7000
    let frame = 0
    const tick = (now: number) => {
      const elapsed = Math.min(duration, now - started)
      setStageSeconds(elapsed / 1000)
      if (elapsed < duration) frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [entered, reducedMotion, stage])

  return (
    <section className="how-section" id="how-it-works" aria-labelledby="how-title">
      <div className="how-section__inner">
        <div className="how-section__head">
          <div><span className="how-section__eyebrow">HOW IT WORKS</span><h2 id="how-title">From connected data<br />to a clear next step.</h2></div>
          <p>See how Practice Prism brings your systems together, understands your question, and helps you decide what comes next.</p>
        </div>
        <div className="how-section__scroll-track" ref={trackRef}>
        <div className={`how-section__stage how-section__stage--chapter-${stage}`} ref={stageRef}>
          <div className="how-section__step"><h3>{chapters[stage].title}</h3><p>{chapters[stage].description}</p></div>
          <div className="how-section__visual">
            <div className="how-section__connect-wrap" aria-hidden={stage !== 0} inert={stage !== 0}><ConnectScene progress={connectProgress} /></div>
            <div className="how-section__chat-wrap" aria-hidden={stage === 0} inert={stage === 0}><ChatScene seconds={chatSeconds} /></div>
            <div className="how-section__result-wrap" aria-hidden={stage !== 2}><ResultCard /></div>
          </div>
          <div className="how-section__footer">
            {!reducedMotion && <span className="how-section__scroll-cue">{stage === 2 ? 'Scroll up to replay' : 'Scroll to continue'} <span aria-hidden="true">↓</span></span>}
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
