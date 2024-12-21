"use client"

import { useState } from "react"
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Prediction = {
  label: string
  probability: number
}

export default function PredictPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const file = formData.get('image') as File

    if (!file) {
      setError('Please select an image file.')
      setIsLoading(false)
      return
    }

    try {
      const data = new FormData()
      data.append('file', file)

      const response = await fetch('/api/predict', {
        method: 'POST',
        body: data,
      })

      if (!response.ok) {
        throw new Error('Failed to process image')
      }

      const result = await response.json()
      setPredictions(result.predictions)
    } catch (error) {
      console.error('Prediction error:', error)
      setError('Failed to process the image. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Predict Building Type</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image">Building Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              <Search className="mr-2 h-4 w-4" /> 
              {isLoading ? 'Processing...' : 'Predict'}
            </Button>
          </form>
          {error && (
            <div className="mt-4 text-red-500">{error}</div>
          )}
          {predictions.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Predictions:</h3>
              <ul className="space-y-2">
                {predictions.map((prediction, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{prediction.label}</span>
                    <span>{(prediction.probability * 100).toFixed(2)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

