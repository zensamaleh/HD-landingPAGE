"use client"
import { useEffect, useRef, useState } from "react"
import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react"
import { motion } from "framer-motion"

export default function ShaderShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Mesh Gradient */}
      <div className="absolute inset-0 opacity-60">
        <MeshGradient 
          speed={2}
          colors={["#6366f1", "#8b5cf6", "#ec4899", "#06b6d4", "#10b981"]}
          className="w-full h-full"
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 gap-1 h-full">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border-l border-white/10 h-full" />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 md:p-8">
        <div className="flex items-center space-x-8">
          <div className="text-xl font-bold">Paper</div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              Features
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              Docs
            </a>
          </div>
        </div>

        {/* Login Button Group with Arrow */}
        <div className="flex items-center space-x-4">
          <button className="hidden md:flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transform rotate-180">
              <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
            </svg>
          </button>
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors">
            Login
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm"
        >
          ✨ New Paper Shaders Experience
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          Beautiful Shader
          <br />
          Experiences
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mb-12 leading-relaxed"
        >
          Create stunning visual experiences with our advanced shader technology. Interactive lighting, smooth
          animations, and beautiful effects that respond to your every move.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-16"
        >
          <button className="px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors">
            Get Started
          </button>
          <button className="px-8 py-3 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
            Pricing
          </button>
        </motion.div>

        {/* Pulsing Border Circle */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative"
        >
          <div className="w-32 h-32 md:w-40 md:h-40">
            <PulsingBorder 
              size={160}
              strokeWidth={2}
              color="#ffffff"
              className="opacity-60"
            />
          </div>

          {/* Rotating Text Around the Pulsing Border */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <svg width="100%" height="100%" viewBox="0 0 160 160" className="text-white/60 text-xs">
                  <path
                    id="circle"
                    d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                    fill="transparent"
                  />
                  <text fontSize="11" letterSpacing="2">
                    <textPath href="#circle" startOffset="0%">
                      Loxt - Mozzi • 21st.dev is amazing • 21st.dev is amazing • Loxt-MoZzI •
                    </textPath>
                  </text>
                </svg>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
