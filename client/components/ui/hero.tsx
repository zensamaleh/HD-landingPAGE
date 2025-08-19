"use client";
import { useEffect, useRef, useState } from "react";
import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react";
import { motion } from "framer-motion";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "./navbar";
import { RainbowButton } from "./rainbow-button";
import { SaveButton } from "./save-button";
import { FeatureStepsDemo } from "../blocks/feature-section-demo";

const AnimatedNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Features", link: "#features" },
    { name: "Pricing", link: "#pricing" },
    { name: "Docs", link: "#docs" },
  ];

  return (
    <div className="relative z-20 w-full">
      <Navbar className="fixed top-0 inset-x-0 px-4 md:px-6">
        <NavBody className="!bg-black/20 backdrop-blur-sm border border-white/10 !min-w-0">
          <NavbarLogo />
          <NavItems
            items={navItems}
            className="text-white/80 hover:text-white"
          />
          <div className="flex items-center space-x-4">
            <SaveButton
              text={{
                idle: "Save me, please!",
                saving: "Working on it...",
                saved: "Saved! Woohoo!"
              }}
            />
          </div>
        </NavBody>
        <MobileNav className="!bg-black/20 backdrop-blur-sm border border-white/10 mx-4">
          <MobileNavHeader className="px-4 py-3">
            <NavbarLogo />
            <div className="text-white">
              <MobileNavToggle
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            className="!bg-black/90 border border-white/10"
          >
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="mt-4 w-full">
              <SaveButton
                text={{
                  idle: "Save me, please!",
                  saving: "Working on it...",
                  saved: "Saved! Woohoo!"
                }}
              />
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
};

export default function ShaderShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true);
    const handleMouseLeave = () => setIsActive(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black relative overflow-hidden"
    >
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter
            id="glass-effect"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
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
          <filter
            id="gooey-filter"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
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
          <linearGradient
            id="logo-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
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

      <AnimatedNavbar />

      <div className="flex flex-col">
        <main className="flex-grow flex items-center justify-center text-white text-center px-4 md:px-6">
          <div className="max-w-lg">
            <div
              className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative"
              style={{
                filter: "url(#glass-effect)",
              }}
            >
              <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
              <span className="text-white/90 text-xs font-light relative z-10">
                ✨ New Paper Shaders Experience
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-white mb-4">
              <span className="font-medium italic instrument">Beautiful</span>{" "}
              Shader
              <br />
              <span className="font-light tracking-tight text-white">
                Experiences
              </span>
            </h1>

            {/* Description */}
            <p className="text-xs font-light text-white/70 mb-4 leading-relaxed">
              Create stunning visual experiences with our advanced shader
              technology. Interactive lighting, smooth animations, and beautiful
              effects that respond to your every move.
            </p>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button className="px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer">
                Pricing
              </button>
              <RainbowButton className="text-white font-normal text-xs">
                Get Started
              </RainbowButton>
            </div>
          </div>
        </main>

        <section className="py-20 bg-black/20">
          <FeatureStepsDemo />
        </section>
      </div>

      <div className="absolute bottom-24 right-8 z-30">
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Pulsing Border Circle */}
          <PulsingBorder
            colors={[
              "#BEECFF",
              "#E77EDC",
              "#FF4C3E",
              "#00FF88",
              "#FFD700",
              "#FF6B35",
              "#8A2BE2",
            ]}
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
              <path
                id="circle"
                d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              />
            </defs>
            <text className="text-sm fill-white/80 instrument">
              <textPath href="#circle" startOffset="0%">
                Loxt - Mozzi • 21st.dev is amazing • 21st.dev is amazing •
                Loxt-MoZzI •
              </textPath>
            </text>
          </motion.svg>
        </div>
      </div>
    </div>
  );
}
