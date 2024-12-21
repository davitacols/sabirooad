import { NextRequest, NextResponse } from 'next/server'
import { Storage } from '@google-cloud/storage'
import vision from '@google-cloud/vision'

const GOOGLE_CLOUD_VISION_API_KEY = process.env.GOOGLE_CLOUD_VISION_API_KEY
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY

if (!GOOGLE_CLOUD_VISION_API_KEY || !GOOGLE_MAPS_API_KEY) {
  console.error('Missing API keys for Vision or Maps services.')
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    console.log('File received:', file.name, 'Size:', file.size, 'Type:', file.type)

    // Validate file type (accept only images)
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validImageTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 })
    }

    // Upload file to Google Cloud Storage
    const storage = new Storage()
    const bucketName = process.env.GCS_BUCKET_NAME
    if (!bucketName) {
      throw new Error('GCS_BUCKET_NAME is not set')
    }
    const bucket = storage.bucket(bucketName)
    const fileName = `${Date.now()}-${file.name}`
    const gcsFile = bucket.file(fileName)

    const buffer = Buffer.from(await file.arrayBuffer())
    await gcsFile.save(buffer, {
      contentType: file.type,
      public: true,
    })
    console.log(`File uploaded to Google Cloud Storage: ${gcsFile.name}`)

    const fileUrl = `https://storage.googleapis.com/${bucketName}/${gcsFile.name}`
    console.log(`Public file URL: ${fileUrl}`)

    // Call Google Vision API for landmark detection
    const visionClient = new vision.ImageAnnotatorClient()
    const [result] = await visionClient.landmarkDetection(fileUrl)
    const landmarks = result.landmarkAnnotations

    if (!landmarks || landmarks.length === 0) {
      return NextResponse.json({ error: 'No landmarks detected in the image' }, { status: 400 })
    }

    // Extract landmark name
    const landmarkName = landmarks[0].description
    if (!landmarkName) {
      throw new Error('Landmark name not found')
    }
    console.log(`Detected landmark: ${landmarkName}`)

    // Call Google Maps Geocoding API
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      landmarkName
    )}&key=${GOOGLE_MAPS_API_KEY}`

    const geocodingResponse = await fetch(geocodingUrl)
    const geocodingData = await geocodingResponse.json()

    if (geocodingData.status !== 'OK') {
      return NextResponse.json({ error: 'Failed to retrieve geocoding data' }, { status: 500 })
    }

    const locationDetails = geocodingData.results[0]
    const { formatted_address, geometry } = locationDetails

    console.log(`Address: ${formatted_address}`)
    console.log(`Coordinates: ${geometry.location.lat}, ${geometry.location.lng}`)

    return NextResponse.json(
      {
        message: 'File uploaded and processed successfully',
        fileUrl,
        landmark: landmarkName,
        address: formatted_address,
        coordinates: geometry.location,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing request:', error)

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 })
    }
  }
}

