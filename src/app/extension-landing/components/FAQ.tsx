"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "What is Prompt Seer?",
    answer:
      "Prompt Seer is a powerful tool that helps developers leverage multiple LLMs (Language Learning Models) to build software products. It provides prompt templates, checklists, and guidance throughout the development process.",
  },
  {
    question: "How does Prompt Seer work with different LLMs?",
    answer:
      "Prompt Seer integrates with various LLMs, allowing you to choose the best model for each specific task in your project. You can seamlessly switch between models to optimize your workflow and results.",
  },
  {
    question: "Is Prompt Seer suitable for beginners?",
    answer:
      "Yes, Prompt Seer is designed to be user-friendly for developers of all skill levels. Our templates and checklists provide guidance, making it easier for beginners to get started with AI-assisted development.",
  },
  {
    question: "Can I use Prompt Seer for commercial projects?",
    answer:
      "Prompt Seer can be used for both personal and commercial projects. Our pricing plans are designed to accommodate different project scales and requirements.",
  },
]

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                className="flex justify-between items-center w-full text-left p-4 bg-white rounded-lg shadow-md"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="font-semibold">{faq.question}</span>
                {activeIndex === index ? (
                  <ChevronUp className="text-primary" />
                ) : (
                  <ChevronDown className="text-primary" />
                )}
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white px-4 pb-4 rounded-b-lg shadow-md"
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

