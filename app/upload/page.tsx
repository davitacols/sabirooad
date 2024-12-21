"use client"

import { useState } from "react"
import { Upload, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BuildingClassifier } from "@/components/BuildingClassifier"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'success' | 'error' | null>(null)
  const [locationData, setLocationData] = useState<{ address: string; lat: number; lng: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    setIsUploading(true)
    setUploadStatus(null)
    setLocationData(null)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }
      setLocationData({ address: data.address, lat: data.coordinates.lat, lng: data.coordinates.lng })
      setUploadStatus('success')
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus('error')
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Upload Building Image</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image">Building Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
            {preview && (
              <div className="mt-4">
                <img src={preview} alt="Preview" className="max-w-full h-auto rounded-lg" />
              </div>
            )}
            <Button type="submit" className="w-full" disabled={!file || isUploading}>
              {isUploading ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" /> Upload Image
                </>
              )}
            </Button>
          </form>
          {uploadStatus === 'success' && locationData && (
            <Alert className="mt-4">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your image has been processed successfully. The building is located at:
                <strong> {locationData.address}</strong>
              </AlertDescription>
            </Alert>
          )}
          {uploadStatus === 'error' && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error || 'There was an error uploading your image. Please try again.'}
              </AlertDescription>
            </Alert>
          )}
          {locationData && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Map Location:</h3>
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${locationData.lat},${locationData.lng}`}
                width="100%"
                height="300"
                className="rounded-lg border"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

