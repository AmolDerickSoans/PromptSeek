import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Prompt Seer - Build Software with Multiple LLMs",
  description:
    "Leverage different LLMs for various tasks in building software products. Get prompt templates, checklists, and guidance to create your next big idea.",
  openGraph: {
    title: "Prompt Seer - Build Software with Multiple LLMs",
    description:
      "Leverage different LLMs for various tasks in building software products. Get prompt templates, checklists, and guidance to create your next big idea.",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

