"use client"

import { motion } from "framer-motion"
import { Chrome } from "lucide-react"

export default function CTA() {
  return (
    <section id="get-extension" className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ready to Supercharge Your Development?
        </motion.h2>
        <motion.p
          className="text-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Get the Prompt Seer extension for free and start building amazing software with the power of multiple LLMs.
        </motion.p>
        <motion.a
          href="#" // Replace with actual extension link
          className="inline-flex items-center bg-white text-primary px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Chrome className="mr-2" />
          Add to Chrome
        </motion.a>
      </div>
    </section>
  )
}

