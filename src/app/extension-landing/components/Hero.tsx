"use client"

import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-[90%] mx-auto pt-20 pb-10">
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Prompt Seer
          </motion.h1>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6">
              <h2 className="text-xl md:text-2xl font-medium mb-4">
                Tired of tools that don&#39;t deliver the results you need?
              </h2>
              <p className="text-gray-400">Move seamlessly between different LLMs to leverage their unique strengths</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6">
              <h2 className="text-xl md:text-2xl font-medium mb-4">Optimize your usage</h2>
              <p className="text-gray-400">
                Reduce costs and follow software best practices to bring your ideas to life
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

