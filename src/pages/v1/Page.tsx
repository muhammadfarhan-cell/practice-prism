import './global.css'
import { Header } from './components/Header'
import { Hero } from './components/Hero/Hero'
import { HowItWorks } from './components/HowItWorks/HowItWorks'
import { PracticeIntelligence } from './components/PracticeIntelligence/PracticeIntelligence'
import { Experts } from './components/Experts/Experts'
import { Pricing } from './components/Pricing/Pricing'
import { FAQ } from './components/FAQ/FAQ'
import { Footer } from './components/Footer/Footer'

function V1Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <PracticeIntelligence />
        <Experts />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}

export default V1Page
