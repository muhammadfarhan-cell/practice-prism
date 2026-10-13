import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import './PracticeIntelligence.css'

const question = 'How did profit this month compare to last month?'
const focusAreas = [
  { label: 'Marketing & growth', score: '62', color: 'purple' },
  { label: 'Cash & debt', score: '70', color: 'gold' },
  { label: 'Labor & team', score: '76', color: 'cyan' },
]

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const reveal = (progress: number, start: number, end: number) => {
  const value = clamp((progress - start) / (end - start))
  return value * value * (3 - 2 * value)
}

export function PracticeIntelligence() {
  const reducedMotion = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const [playbackProgress, setPlaybackProgress] = useState(0)
  const progress = reducedMotion ? 1 : playbackProgress
  const cardsReveal = reveal(progress, 0, .1)
  const scoreReveal = reveal(progress, .08, .52)
  const questionReveal = reveal(progress, .08, .48)
  const answerReveal = reveal(progress, .5, .68)
  const chartReveal = reveal(progress, .58, .86)
  const resultReveal = reveal(progress, .78, .91)
  const typedQuestion = question.slice(0, Math.round(question.length * questionReveal))

  useEffect(() => {
    if (reducedMotion) return
    const stage = stageRef.current
    if (!stage) return
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setStarted(true)
        observer.disconnect()
      }
    }, { threshold: 0, rootMargin: '0px 0px 200px 0px' })
    observer.observe(stage)
    return () => observer.disconnect()
  }, [reducedMotion])

  useEffect(() => {
    if (!started || reducedMotion) return
    let frame = 0
    let startTime: number | null = null
    const duration = 3800
    const tick = (time: number) => {
      if (startTime === null) startTime = time
      const next = clamp((time - startTime) / duration)
      setPlaybackProgress(next)
      if (next < 1) frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [started, reducedMotion])

  return (
    <section className="intelligence-section" id="know-your-practice" aria-labelledby="intelligence-title">
      <div className="intelligence-section__inner">
        <div className="intelligence-section__head">
          <div>
            <span className="intelligence-section__eyebrow">KNOW YOUR PRACTICE</span>
            <h2 id="intelligence-title">See where you stand.<br />Know what to do next.</h2>
          </div>
          <p>Your practice numbers become a health score, clear answers, and practical next steps.</p>
        </div>

        <div className="intelligence-section__track">
          <div className="intelligence-section__stage" ref={stageRef}>
            <article className="intelligence-card intelligence-card--score" style={{ opacity: .74 + .26 * cardsReveal, transform: `translateY(${18 * (1 - cardsReveal)}px)` }}>
              <div className="intelligence-card__top">
                <h3>Practice DNA Score</h3>
                <span className="intelligence-card__badge">SAMPLE</span>
              </div>
              <div className="intelligence-score" aria-label={`Sample Practice DNA Score: ${Math.round(78 * scoreReveal)} out of 100`}>
                <img className="intelligence-score__base" src="/dna-ring-base.svg" alt="" width="200" height="200" />
                <img className="intelligence-score__progress" src="/dna-ring-progress.svg" alt="" width="200" height="200" style={{ maskImage: `conic-gradient(#000 ${scoreReveal * 360}deg, transparent 0)`, WebkitMaskImage: `conic-gradient(#000 ${scoreReveal * 360}deg, transparent 0)` }} />
                <div className="intelligence-score__value"><strong>{Math.round(78 * scoreReveal)}</strong><span>OUT OF 100</span></div>
              </div>
              <h4>One number. A clearer picture.</h4>
              <p className="intelligence-card__description">15 chiropractic statistics across five areas of practice health, with your lowest-scoring areas shown first.</p>
              <div className="intelligence-card__divider" />
              <span className="intelligence-card__micro">WHERE TO FOCUS NEXT</span>
              <div className="intelligence-focus">
                {focusAreas.map((area, index) => {
                  const itemReveal = reveal(progress, .32 + index * .07, .52 + index * .07)
                  return <div className="intelligence-focus__row" key={area.label} style={{ opacity: itemReveal, transform: `translateY(${12 * (1 - itemReveal)}px)` }}><span>{area.label}</span><strong className={`intelligence-focus__score intelligence-focus__score--${area.color}`}>{area.score}</strong></div>
                })}
              </div>
            </article>

            <article className="intelligence-card intelligence-card--prism" style={{ opacity: .74 + .26 * cardsReveal, transform: `translateY(${18 * (1 - cardsReveal)}px)`, borderColor: progress > .48 ? '#465fff' : '#29354a' }}>
              <div className="intelligence-card__prism-kicker"><span>THE PRISM</span><p>Your numbers. Your answers.</p></div>
              <h3>Ask your practice anything.</h3>
              <p className="intelligence-card__prism-intro">Get answers in plain English, backed by your connected data, tables, and charts.</p>
              <div className="intelligence-question" aria-label="Example question">
                <span>{typedQuestion || <span className="intelligence-question__placeholder">Ask a question about your practice</span>}</span>
                {questionReveal > 0 && questionReveal < 1 && <span className="intelligence-question__cursor" aria-hidden="true" />}
              </div>
              <div className="intelligence-answer" style={{ opacity: .16 + .84 * answerReveal }}>
                <h4>{resultReveal > .9 ? 'Profit increased by 15.2%' : 'Comparing monthly profit…'}</h4>
                <p style={{ opacity: answerReveal }}>Your profit rose from $18,400 to $21,200.</p>
                <div className="intelligence-chart" aria-label="Illustrative profit comparison: $18,400 last month and $21,200 this month">
                  <div className="intelligence-chart__column"><strong style={{ opacity: chartReveal }}>$18.4k</strong><span className="intelligence-chart__bar intelligence-chart__bar--last" style={{ transform: `scaleY(${chartReveal})` }} /><span>Last month</span></div>
                  <div className="intelligence-chart__column"><strong style={{ opacity: chartReveal }}>$21.2k</strong><span className="intelligence-chart__bar intelligence-chart__bar--current" style={{ transform: `scaleY(${chartReveal})` }} /><span>This month</span></div>
                </div>
                <small>Illustrative clinic data</small>
              </div>
              <div className="intelligence-examples" style={{ opacity: reveal(progress, .82, .96) }}>
                <span>What is my cost per new patient?</span>
                <span>What if I cut my top expenses by 10%?</span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
