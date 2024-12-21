"use client"

import React, { useRef, useState, useCallback } from 'react'
import Webcam from 'react-webcam'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BuildingClassifier } from "@/components/BuildingClassifier"
import { Camera, RotateCw, Repeat } from 'lucide-react'

interface LocationData {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export default function CameraPage() {
  const webcamRef = useRef<Webcam>(null)
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [locationData, setLocationData] = useState<LocationData | null>(null)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment')

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    setImgSrc(imageSrc)
    setLocationData(null)
    setError(null)
  }, [webcamRef])

  const processImage = async () => {
    if (!imgSrc) return

    setIsProcessing(true)
    setError(null)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imgSrc }),
      })

      if (!response.ok) {
        throw new Error('Failed to process image')
      }

      const data = await response.json()
      setLocationData({
        address: data.address,
        coordinates: data.coordinates,
      })
    } catch (err) {
      console.error('Error processing image:', err)
      setError('Failed to process image. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const retake = () => {
    setImgSrc(null)
    setLocationData(null)
    setError(null)
  }

  const switchCamera = () => {
    setFacingMode(prevMode => prevMode === 'user' ? 'environment' : 'user')
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Real-time Camera</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
            {!imgSrc ? (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: facingMode }}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={imgSrc}
                alt="captured"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex justify-center space-x-4">
            {!imgSrc ? (
              <>
                <Button onClick={capture}>
                  <Camera className="mr-2 h-4 w-4" /> Capture Photo
                </Button>
                <Button onClick={switchCamera} variant="outline">
                  <Repeat className="mr-2 h-4 w-4" /> Switch Camera
                </Button>
              </>
            ) : (
              <>
                <Button onClick={processImage} disabled={isProcessing}>
                  {isProcessing ? 'Processing...' : 'Identify Building'}
                </Button>
                <Button variant="outline" onClick={retake}>
                  <RotateCw className="mr-2 h-4 w-4" /> Retake
                </Button>
              </>
            )}
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {locationData && (
            <div className="space-y-2">
              <h3 className="font-semibold">Building Location:</h3>
              <p>{locationData.address}</p>
              <div className="h-64 w-full">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${locationData.coordinates.lat},${locationData.coordinates.lng}`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
          {imgSrc && (
            <div className="mt-4">
              <BuildingClassifier imageUrl={imgSrc} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

