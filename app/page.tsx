"use client"

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Building, Camera, Upload, Search, Database, Globe, Star, GitBranch, Lock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ThreeScene } from "@/components/three-scene"
import { useTheme } from "next-themes"
import { motion, useScroll, useTransform } from "framer-motion"

export function HomePage() {
  const { theme } = useTheme()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="flex flex-col min-h-screen bg-black" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ThreeScene />
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"
        >
          <div className="container mx-auto px-4 h-full flex items-center justify-center">
            <div className="max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white tracking-tight">
                  AI Building Analysis
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                    {" "}for the Future
                  </span>
                </h1>
                <p className="text-xl mb-8 text-gray-300 leading-relaxed max-w-2xl mx-auto">
                  SABIROAD revolutionizes architectural analysis with advanced AI technology, 
                  making building classification faster and more accurate than ever.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                  <Button asChild size="lg" className="w-full sm:w-auto bg-white hover:bg-gray-100 text-black">
                    <Link href="/signup" className="flex items-center">
                      Start your free trial <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-white/20 hover:bg-white/10">
                    <Link href="/enterprise">Contact Sales →</Link>
                  </Button>
                </div>
              </motion.div>

              {/* Animated Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                {[
                  { number: "10M+", label: "Buildings Analyzed" },
                  { number: "99.9%", label: "Uptime" },
                  { number: "45K+", label: "Active Users" },
                  { number: "<5ms", label: "Response Time" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section with 3D Cards */}
      <section className="py-32 bg-neutral-950 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Building Analysis at Scale</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to analyze and understand buildings, powered by cutting-edge AI technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Global Analysis",
                description: "Analyze buildings from anywhere in the world with our AI-powered platform",
                gradient: "from-blue-500/20 to-purple-500/20"
              },
              {
                icon: Lock,
                title: "Secure & Private",
                description: "Enterprise-grade security with end-to-end encryption for all your data",
                gradient: "from-green-500/20 to-emerald-500/20"
              },
              {
                icon: GitBranch,
                title: "Version Control",
                description: "Track changes and maintain history of all building analyses",
                gradient: "from-orange-500/20 to-red-500/20"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 bg-black/40 backdrop-blur border-white/5 hover:border-white/10 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-32 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Experience the Power of AI Analysis
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Upload any building image and get instant analysis with detailed architectural insights.
              </p>
              <div className="space-y-4">
                {[
                  "Real-time classification",
                  "Architectural style detection",
                  "Material analysis",
                  "Structural assessment",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <Star className="h-5 w-5 text-blue-500 mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
              <Button asChild size="lg" className="mt-8 bg-white hover:bg-gray-100 text-black">
                <Link href="/demo">Try Live Demo</Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[400px] bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg overflow-hidden"
            >
              {/* Replace this div with your 3D model or demo visualization */}
              <div className="absolute inset-0">
                <ThreeScene />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-neutral-950 to-black relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Building Analysis?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Join thousands of architects and engineers using SABIROAD.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white hover:bg-gray-100 text-black">
                <Link href="/signup">Start Free Trial</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default HomePage;

