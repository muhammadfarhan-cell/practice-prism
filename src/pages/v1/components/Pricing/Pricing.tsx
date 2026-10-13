import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import './Pricing.css'

const plans = [
  {
    id: 'basic',
    eyebrow: 'EXPERT KNOWLEDGE',
    name: 'Clinic Basic',
    price: '$19',
    description: 'Answers and expertise at your fingertips.',
    features: [
      'Ask Prism general practice questions',
      'Access to human experts available to meet with you',
      'Additional users: $9.99/month each',
    ],
    action: 'Get Started with Basic',
  },
  {
    id: 'premium',
    eyebrow: 'YOUR DATA. YOUR ANSWERS.',
    name: 'Clinic Premium',
    price: '$99',
    description: 'Less searching. More confidence. Your entire practice, connected in real time.',
    features: [
      'Everything in Basic',
      'Direct integrations with financial software, clinic EHR, and marketing portals',
      'All your key statistics in one place, updated in real time',
      'Personalized answers from Prism, powered by your practice data',
      'Access to human experts available to meet with you',
      '3 additional users free, $9.99/user after that',
    ],
    action: 'Get Clarity with Prism',
  },
] as const

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (reducedMotion) { setVisible(true); return }
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setVisible(true); observer.disconnect() }
    }, { threshold: .15 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [reducedMotion])

  return (
    <section className={`pricing-section ${visible ? 'is-visible' : ''}`} id="plans" aria-labelledby="pricing-title" ref={sectionRef}>
      <div className="pricing-section__intro">
        <span className="pricing-section__eyebrow">CLINIC PLANS</span>
        <h2 id="pricing-title">Find your clarity.</h2>
        <p>Expert guidance to get started. Connected insights to see the full picture.</p>
      </div>

      <div className="pricing-section__cards">
        {plans.map(plan => (
          <article className={`pricing-card pricing-card--${plan.id}`} key={plan.id} aria-labelledby={`pricing-${plan.id}-title`}>
            <div className="pricing-card__content">
              <span className="pricing-card__eyebrow">{plan.eyebrow}</span>
              <h3 id={`pricing-${plan.id}-title`}>{plan.name}</h3>
              <p className="pricing-card__price"><strong>{plan.price}</strong><span>/month</span></p>
              <p className="pricing-card__description">{plan.description}</p>
              <div className="pricing-card__divider" />
              <ul className="pricing-card__features">
                {plan.features.map(feature => <li key={feature}><span aria-hidden="true">✓</span><span>{feature}</span></li>)}
              </ul>
            </div>
            <div className="pricing-card__footer">
              <a className={`pricing-card__action pricing-card__action--${plan.id}`} href="#login">{plan.action}</a>
              <span>7-day free trial</span>
            </div>
          </article>
        ))}
      </div>

      <p className="pricing-section__closing">AI answers when you need clarity. Human expertise when you want deeper support.</p>
    </section>
  )
}
