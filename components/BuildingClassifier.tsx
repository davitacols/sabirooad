import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { buildingModel } from '@/services/buildingIdentificationModel'

interface BuildingClassifierProps {
  imageUrl: string
}

interface LocationData {
  address: string
  coordinates: {
    lat: number
    lng: number
  }
}

export function BuildingClassifier({ imageUrl }: BuildingClassifierProps) {
  const [predictions, setPredictions] = useState<{ className: string; probability: number }[]>([])
  const [locationData, setLocationData] = useState<LocationData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsLoading(true)
        await buildingModel.loadModel()
        setIsModelLoaded(true)
      } catch (err) {
        console.error('Failed to load model:', err)
        setError('Failed to load building identification model. Please try refreshing the page.')
      } finally {
        setIsLoading(false)
      }
    }

    loadModel()
  }, [])

  const classifyBuilding = async () => {
    if (!isModelLoaded) {
      setError('Model is not loaded yet. Please wait and try again.')
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      if (!imageRef.current) {
        throw new Error('Image not loaded')
      }

      const results = await buildingModel.identifyBuilding(imageRef.current)
      
      if (results.length === 0) {
        setError('No building detected in the image')
      } else {
        setPredictions(results)

        // For this example, we'll use a mock location. In a real application,
        // you would get this from the device's GPS or from image metadata.
        const mockLat = 40.7128
        const mockLng = -74.0060

        const locationData = await buildingModel.getLocationData(mockLat, mockLng)
        setLocationData(locationData)
      }
    } catch (err) {
      console.error('Classification error:', err)
      setError('Failed to classify the building. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <img 
        ref={imageRef} 
        src={imageUrl} 
        alt="Building to classify" 
        className="w-full rounded-lg" 
        crossOrigin="anonymous" 
      />
      <Button 
        onClick={classifyBuilding} 
        disabled={isLoading || !isModelLoaded}
      >
        {isLoading ? 'Processing...' : 'Identify Building'}
      </Button>
      
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {predictions.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Building Identification Results:</h3>
          <ul className="space-y-2">
            {predictions.map((prediction, index) => (
              <li key={index} className="flex justify-between">
                <span>{prediction.className}</span>
                <span>{(prediction.probability * 100).toFixed(2)}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {locationData && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Building Location:</h3>
          <p>{locationData.address}</p>
          <div className="mt-2 h-64 w-full">
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
    </div>
  )
}

