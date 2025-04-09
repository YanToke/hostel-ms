import { getRoomById } from '@/models/Room'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  const { roomId } = params

  try {
    const room = await getRoomById(Number(roomId))
    if (!room) {
      return NextResponse.json({ message: 'Room not found' }, { status: 404 })
    }
    return NextResponse.json(room)
  } catch (error) {
    return NextResponse.json({ message: 'Server Error' }, { status: 500 })
  }
}
