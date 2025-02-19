"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    name: "John Doe",
    role: "Software Engineer",
    content:
      "Prompt Seer has revolutionized the way I approach software development. The AI-assisted coding and multi-LLM integration have significantly boosted my productivity.",
    avatar: "/john-doe.jpg",
  },
  {
    name: "Jane Smith",
    role: "Product Manager",
    content:
      "As a product manager, Prompt Seer has been invaluable in helping me define project requirements and generate comprehensive task lists. It's a game-changer for project planning.",
    avatar: "/jane-smith.jpg",
  },
  {
    name: "Alex Johnson",
    role: "Startup Founder",
    content:
      "Prompt Seer allowed us to build our MVP in record time. The ability to leverage multiple LLMs for different aspects of our project was a game-changer.",
    avatar: "/alex-johnson.jpg",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <p className="text-gray-600 mb-4">{testimonial.content}</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

