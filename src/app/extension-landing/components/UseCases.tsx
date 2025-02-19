"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const useCases = [
  {
    title: "Web Development",
    description: "Build responsive and dynamic websites with AI-assisted coding.",
    image: "/web-development.jpg",
  },
  {
    title: "Mobile Apps",
    description: "Create cross-platform mobile applications with intelligent UI/UX suggestions.",
    image: "/mobile-apps.jpg",
  },
  {
    title: "Data Analysis",
    description: "Process and visualize complex datasets with AI-powered insights.",
    image: "/data-analysis.jpg",
  },
]

export default function UseCases() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={useCase.image || "/placeholder.svg"}
                alt={useCase.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

