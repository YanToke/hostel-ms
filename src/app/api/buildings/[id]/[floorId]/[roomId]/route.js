import { getResidentsByRoomId } from '@/models/Resident'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const { roomId } = await params
  const residents = await getResidentsByRoomId(roomId)
  return NextResponse.json(residents, { status: 200 })
}
