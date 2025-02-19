"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: 29,
    features: ["Access to basic prompt templates", "Single LLM integration", "Basic task checklists", "Email support"],
  },
  {
    name: "Pro",
    price: 79,
    features: [
      "Access to all prompt templates",
      "Multi-LLM integration",
      "Advanced task checklists",
      "AI-powered insights",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Custom prompt templates",
      "Unlimited LLM integrations",
      "Custom AI model training",
      "Dedicated account manager",
      "24/7 premium support",
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">
                {typeof plan.price === "number" ? `$${plan.price}/mo` : plan.price}
              </p>
              <ul className="mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center mb-2">
                    <Check className="text-green-500 mr-2" size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                className="w-full bg-primary text-white py-2 px-4 rounded-full hover:bg-primary-dark transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

