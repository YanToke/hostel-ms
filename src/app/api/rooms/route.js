import { getDataFromForm, handleImage } from '@/libs/utils'
import { createRoom, getAllRooms } from '@/models/Room'
import { NextResponse } from 'next/server'

export async function GET() {
  const rooms = await getAllRooms()
  return NextResponse.json(rooms)
}

export async function POST(request) {
  try {
    const formData = await request.formData()
    console.log(formData)
    let { name, img, floor_id, capacity } = getDataFromForm(
      formData,
      'name',
      'img',
      'floor_id',
      'capacity'
    )
    capacity = parseInt(capacity)
    console.log('capacity in the backend: ', capacity)
    console.log('Type of capacity in the backend: ', typeof capacity)
    if (!floor_id) {
      return NextResponse.json(
        { message: 'floor_id is required' },
        { status: 400 }
      )
    }
    if (img) {
      const filename = await handleImage('room-images', img)
      await createRoom(floor_id, name, '/room-images/' + filename, capacity)
      return NextResponse.json({ message: 'Successfully Created' })
    }
    img = process.env.DEFAULT_ROOM_IMAGE
    await createRoom(floor_id, name, img, capacity)
    return NextResponse.json({ message: 'Successfully Created' })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Cannot create Room' }, { status: 500 })
  }
}
