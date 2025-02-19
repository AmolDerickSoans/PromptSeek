import Hero from "./components/Hero"
import Features from "./components/Features"
import HowItWorks from "./components/HowItWorks"
import Integrations from "./components/Integrations"
import UseCases from "./components/UseCases"
import FAQ from "./components/FAQ"
import CTA from "./components/CTA"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <Features />
      <HowItWorks />
      <Integrations />
      <UseCases />
      <FAQ />
      <CTA />
    </main>
  )
}

