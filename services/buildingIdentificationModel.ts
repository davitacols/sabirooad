import * as tf from '@tensorflow/tfjs'
import * as mobilenet from '@tensorflow-models/mobilenet'

interface LocationData {
  address: string
  coordinates: {
    lat: number
    lng: number
  }
}

class BuildingIdentificationModel {
  private model: mobilenet.MobileNet | null = null

  async loadModel() {
    try {
      console.log('Starting to load MobileNet model...')
      this.model = await mobilenet.load()
      console.log('MobileNet model loaded successfully')
    } catch (error) {
      console.error('Error loading MobileNet model:', error)
      throw new Error('Failed to load MobileNet model')
    }
  }

  async identifyBuilding(imageElement: HTMLImageElement): Promise<{ className: string; probability: number }[]> {
    if (!this.model) {
      throw new Error('Model not loaded')
    }

    try {
      const predictions = await this.model.classify(imageElement)

      const buildingClasses = ['building', 'house', 'apartment', 'skyscraper', 'office', 'church', 'castle']
      const buildingPredictions = predictions.filter(p => 
        buildingClasses.some(cls => p.className.toLowerCase().includes(cls))
      )

      return buildingPredictions
    } catch (error) {
      console.error('Error classifying image:', error)
      throw new Error('Failed to classify image')
    }
  }

  async getLocationData(lat: number, lng: number): Promise<LocationData> {
    try {
      const response = await fetch(`/api/geocode?lat=${lat}&lng=${lng}`)
      if (!response.ok) {
        throw new Error('Failed to retrieve location data')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching location data:', error)
      throw new Error('Failed to fetch location data')
    }
  }
}

export const buildingModel = new BuildingIdentificationModel()

