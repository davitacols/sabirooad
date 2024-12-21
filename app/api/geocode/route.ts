import { NextRequest, NextResponse } from 'next/server'

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  if (!lat || !lng) {
    return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
    )

    if (!response.ok) {
      throw new Error('Geocoding API request failed')
    }

    const data = await response.json()

    if (data.status !== 'OK') {
      throw new Error(`Geocoding API error: ${data.status}`)
    }

    const address = data.results[0].formatted_address

    return NextResponse.json({
      address,
      coordinates: { lat: parseFloat(lat), lng: parseFloat(lng) }
    })
  } catch (error) {
    console.error('Geocoding error:', error)
    return NextResponse.json({ error: 'Failed to retrieve address' }, { status: 500 })
  }
}

