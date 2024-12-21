"use client"
import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    // Create a building-like geometry (cube)
    const geometry = new THREE.BoxGeometry(1, 2, 1)
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040)
    scene.add(ambientLight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    camera.position.z = 5

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0" />
}
