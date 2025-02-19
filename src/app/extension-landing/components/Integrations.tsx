"use client"

import { motion } from "framer-motion"
import Image from "next/image"
 

const integrations = [
  { name: "ChatGPT", logo: "/landing-integerations/openai.svg" },
  { name: "Claud", logo: "/landing-integerations/claude-color.svg" },
  { name: "Gemini", logo: "/landing-integerations/gemini-color.svg" },
  { name: "Llama", logo: "/landing-integerations/meta-color.svg" },
  { name: "Qwen", logo: "/landing-integerations/qwen-color.svg" },
  { name: "Cohere", logo: "/landing-integerations/placeholder.svg" },
  { name: "Palm", logo: "/landing-integerations/placeholder.svg" },
  { name: "Bard", logo: "/landing-integerations/placeholder.svg" },
]

export default function Integrations() {
  return (
    <section id="integrations" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block px-4 py-1 rounded-full bg-white/10 text-sm mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Integrations
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Connect with LLMs
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            you use every day
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {integrations.map((integration, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-center">
              <Image
                src={integration.logo || "/placeholder.svg"}
                alt={integration.name}
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

