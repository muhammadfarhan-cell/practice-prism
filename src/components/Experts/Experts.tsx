import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import './Experts.css'

const steps = [
  { icon: '/expert-search.svg', title: 'Choose your expert', description: 'Find the right experience for your goals.' },
  { icon: '/expert-calendar.svg', title: 'Pick a time and share your goals', description: 'Book a session that fits your schedule.' },
  { icon: '/expert-video.svg', title: 'Meet on video', description: 'Get focused guidance for your practice.' },
]

const areas = ['Marketing', 'Financial', 'Operations', 'Patient Growth', 'Staffing & HR']

export function Experts() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.2 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [reducedMotion])

  return (
    <section
      id="experts"
      ref={sectionRef}
      className={`experts-section${visible || reducedMotion ? ' is-visible' : ''}`}
      aria-labelledby="experts-title"
    >
      <div className="experts-section__inner">
        <div className="experts-feature">
          <div className="experts-feature__copy">
            <span className="experts-feature__eyebrow">AI + HUMAN EXPERTISE</span>
            <h2 id="experts-title"><span>AI clarity.</span><span>Human expertise.</span></h2>
            <p className="experts-feature__description">When you want a human perspective, explore vetted experts available to meet with you.</p>
            <a className="experts-feature__cta" href="#expert-journey">Explore Experts <span aria-hidden="true">↗</span></a>
            <p className="experts-feature__footnote">Guidance for the next chapter of your practice.</p>
          </div>
          <div className="experts-feature__visual">
            <img src="/expert-consultation.png" alt="Experts discussing a practice plan together" />
            <div className="experts-feature__visual-shade" />
            <div className="experts-feature__caption">
              <span>A HUMAN PERSPECTIVE</span>
              <p>Turn your questions into a conversation.</p>
            </div>
          </div>
        </div>

        <div className="experts-journey" id="expert-journey" aria-label="How to meet an expert">
          {steps.map((step, index) => (
            <article className="experts-journey__card" key={step.title} style={{ '--card-index': index } as React.CSSProperties}>
              <div className="experts-journey__icon"><img src={step.icon} alt="" /></div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>

        <div className="experts-areas" aria-label="Expertise areas">
          {areas.map((area, index) => <span key={area} style={{ '--area-index': index } as React.CSSProperties}>{area}</span>)}
        </div>
      </div>
    </section>
  )
}
