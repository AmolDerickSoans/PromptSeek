"use client"

import { motion } from "framer-motion"
import { Search, Code, Cpu, Rocket } from "lucide-react"

const steps = [
  {
    icon: <Search size={48} />,
    title: "Define Your Project",
    description: "Outline your software project and its requirements with AI assistance",
    image: "/placeholder.svg",
  },
  {
    icon: <Code size={48} />,
    title: "Generate Prompts",
    description: "Use our templates to create effective prompts for each development task",
    image: "/placeholder.svg",
  },
  {
    icon: <Cpu size={48} />,
    title: "Leverage Multiple LLMs",
    description: "Seamlessly switch between different AI models for optimal results",
    image: "/placeholder.svg",
  },
  {
    icon: <Rocket size={48} />,
    title: "Build and Launch",
    description: "Bring your project to life with AI-assisted development",
    image: "/placeholder.svg",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          How It Works
        </motion.h2>
        <div className="relative">
          {/* Curved connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-8 mb-16 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex-1">
                <div
                  className={`bg-white/10 backdrop-blur-sm rounded-3xl p-8 ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}
                >
                  <div className="text-primary mb-4">{step.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </div>
              <div className="flex-1">
                <div className="aspect-video rounded-3xl overflow-hidden bg-white/5">
                  {/* Add your step illustration/animation here */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

