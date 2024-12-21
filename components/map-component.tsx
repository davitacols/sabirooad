"use client"

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MapComponentProps {
  lat: number
  lng: number
  name: string
}

export function MapComponent({ lat, lng, name }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current) {
      const map = L.map(mapRef.current).setView([lat, lng], 13)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)

      L.marker([lat, lng]).addTo(map)
        .bindPopup(name)
        .openPopup()

      return () => {
        map.remove()
      }
    }
  }, [lat, lng, name])

  return <div ref={mapRef} className="h-full w-full" />
}

