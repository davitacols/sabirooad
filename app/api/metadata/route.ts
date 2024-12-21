import { NextRequest, NextResponse } from 'next/server'

// Mock database for demonstration purposes
const buildingsDatabase = [
  {
    name: "Empire State Building",
    location: "New York City, NY",
    yearConstructed: 1931,
    height: "1,454 ft (443.2 m)",
    architect: "Shreve, Lamb & Harmon",
    description: "An iconic 102-story Art Deco skyscraper in Midtown Manhattan.",
    address: "350 Fifth Avenue, New York, NY 10118",
    coordinates: {
      lat: 40.7484,
      lng: -73.9857
    }
  },
  {
    name: "Burj Khalifa",
    location: "Dubai, United Arab Emirates",
    yearConstructed: 2010,
    height: "2,717 ft (828 m)",
    architect: "Adrian Smith",
    description: "The world's tallest building and a global icon.",
    address: "1 Sheikh Mohammed bin Rashid Blvd, Dubai, UAE",
    coordinates: {
      lat: 25.1972,
      lng: 55.2744
    }
  }
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search')

  if (!search) {
    return NextResponse.json({ error: 'Search term is required' }, { status: 400 })
  }

  const building = buildingsDatabase.find(b => 
    b.name.toLowerCase().includes(search.toLowerCase())
  )

  if (!building) {
    return NextResponse.json({ error: 'Building not found' }, { status: 404 })
  }

  return NextResponse.json(building, { status: 200 })
}

