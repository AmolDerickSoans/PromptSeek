"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-end items-center">
        <nav className="hidden md:block">
          <ul className="flex space-x-6 text-white">
            <li>
              <Link href="#features" className="hover:text-primary transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="#how-it-works" className="hover:text-primary transition-colors">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="#integrations" className="hover:text-primary transition-colors">
                Integrations
              </Link>
            </li>
          </ul>
        </nav>
        <Link
          href="#get-extension"
          className="hidden md:inline-flex ml-6 bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-full hover:bg-white/20 transition-colors"
        >
          Get Extension
        </Link>
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4 text-white">
              <li>
                <Link href="#features" onClick={() => setIsMenuOpen(false)}>
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" onClick={() => setIsMenuOpen(false)}>
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#integrations" onClick={() => setIsMenuOpen(false)}>
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="#get-extension" onClick={() => setIsMenuOpen(false)}>
                  Get Extension
                </Link>
              </li>
            </ul>
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}

