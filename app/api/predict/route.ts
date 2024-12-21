import { NextRequest, NextResponse } from 'next/server'
import * as tf from '@tensorflow/tfjs-node'
import * as mobilenet from '@tensorflow-models/mobilenet'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate file type (accept only images)
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validImageTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 })
    }

    // Load the MobileNet model
    const model = await mobilenet.load()

    // Convert the file to a tensor
    const buffer = await file.arrayBuffer()
    const tensor = tf.node.decodeImage(new Uint8Array(buffer))

    // Classify the image
    const predictions = await model.classify(tensor as tf.Tensor3D)

    // Clean up the tensor
    tensor.dispose()

    return NextResponse.json({ predictions }, { status: 200 })
  } catch (error) {
    console.error('Error processing request:', error)

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 })
    }
  }
}

