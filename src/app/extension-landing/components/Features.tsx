"use client"

import { motion } from "framer-motion"
import { Code, Brain, Zap, Workflow, Settings, Lock } from "lucide-react"

const features = [
  {
    icon: <Code size={32} />,
    title: "Smart Prompts",
    description: "Pre-built templates for common development tasks",
    className: "md:col-span-2 bg-purple-500/20",
  },
  {
    icon: <Brain size={32} />,
    title: "Multi-LLM",
    description: "Switch between different AI models seamlessly",
    className: "bg-blue-500/20",
  },
  {
    icon: <Zap size={32} />,
    title: "Quick Actions",
    description: "Instant access to AI-powered development tools",
    className: "bg-yellow-500/20",
  },
  {
    icon: <Workflow size={32} />,
    title: "Workflows",
    description: "Create custom automation for repetitive tasks",
    className: "bg-green-500/20",
  },
  {
    icon: <Settings size={32} />,
    title: "Customizable",
    description: "Adapt the tool to your development style",
    className: "md:col-span-2 bg-red-500/20",
  },
  {
    icon: <Lock size={32} />,
    title: "Secure",
    description: "Your data and prompts stay private",
    className: "bg-indigo-500/20",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`rounded-3xl p-6 backdrop-blur-sm ${feature.className}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-white mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

