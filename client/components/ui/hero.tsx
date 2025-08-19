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
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
          <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>
        </defs>
      </svg>

      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#000000", "#8b5cf6", "#ffffff", "#1e1b4b", "#4c1d95"]}
        speed={0.3}
        backgroundcolor="#000000"
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-60"
        colors={["#000000", "#ffffff", "#8b5cf6", "#000000"]}
        speed={0.2}
        wireframe="true"
        backgroundcolor="transparent"
      />

      <header className="relative z-20 flex items-center justify-between p-6">
        <motion.div
          className="flex items-center group cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.svg
            fill="currentColor"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="size-10 text-white group-hover:drop-shadow-lg transition-all duration-300"
            style={{
              filter: "url(#logo-glow)",
            }}
            whileHover={{
              fill: "url(#logo-gradient)",
              rotate: [0, -2, 2, 0],
              transition: {
                fill: { duration: 0.3 },
                rotate: { duration: 0.6, ease: "easeInOut" },
              },
            }}
          >
            <motion.path
              d="M15 85V15h12l18 35 18-35h12v70h-12V35L45 70h-10L17 35v50H15z"
              initial={{ pathLength: 1 }}
              whileHover={{
                pathLength: [1, 0, 1],
                transition: { duration: 1.2, ease: "easeInOut" },
              }}
            />
          </motion.svg>

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [-10, -20, -10],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="flex items-center space-x-2">
          <a
            href="#"
            className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            Features
          </a>
          <a
            href="#"
            className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            Docs
          </a>
        </nav>

        {/* Login Button Group with Arrow */}
        <div id="gooey-btn" className="relative flex items-center group" style={{ filter: "url(#gooey-filter)" }}>
          <button className="absolute right-0 px-2.5 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-19 z-0">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>
          <button className="px-6 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center z-10">
            Login
          </button>
        </div>
      </header>

      <main className="absolute bottom-24 left-8 z-20 max-w-lg">
        <div className="text-left">
          <div
            className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative"
            style={{
              filter: "url(#glass-effect)",
            }}
          >
            <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
            <span className="text-white/90 text-xs font-light relative z-10">✨ New Paper Shaders Experience</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-white mb-4">
            <span className="font-medium italic instrument">Beautiful</span> Shader
            <br />
            <span className="font-light tracking-tight text-white">Experiences</span>
          </h1>

          {/* Description */}
          <p className="text-xs font-light text-white/70 mb-4 leading-relaxed">
            Create stunning visual experiences with our advanced shader technology. Interactive lighting, smooth
            animations, and beautiful effects that respond to your every move.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4 flex-wrap">
            <button className="px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer">
              Pricing
            </button>
            <button className="px-8 py-3 rounded-full bg-white text-black font-normal text-xs transition-all duration-200 hover:bg-white/90 cursor-pointer">
              Get Started
            </button>
          </div>
        </div>
      </main>

      <div className="absolute bottom-16 right-8 z-30">
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Pulsing Border Circle */}
          <PulsingBorder
            colors={["#BEECFF", "#E77EDC", "#FF4C3E", "#00FF88", "#FFD700", "#FF6B35", "#8A2BE2"]}
            colorback="#00000000"
            speed={1.5}
            roundness={1}
            thickness={0.1}
            softness={0.2}
            intensity={5}
            spotspercolor={5}
            spotsize={0.1}
            pulse={0.1}
            smoke={0.5}
            smokesize={4}
            scale={0.65}
            rotation={0}
            frame={9161408.251009725}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
            }}
          />

          {/* Rotating Text Around the Pulsing Border */}
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{ transform: "scale(1.6)" }}
          >
            <defs>
              <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
            </defs>
            <text className="text-sm fill-white/80 instrument">
              <textPath href="#circle" startOffset="0%">
                Loxt - Mozzi • 21st.dev is amazing • 21st.dev is amazing • Loxt-MoZzI •
              </textPath>
            </text>
          </motion.svg>
        </div>
      </div>
    </div>
  )
}
