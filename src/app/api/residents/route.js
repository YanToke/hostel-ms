import { getDataFromForm } from '@/libs/utils'
import {
  countResidentsFromRoom,
  createResident,
  deleteResidentById,
  getAllResidents,
} from '@/models/Resident'
import { getRoomById } from '@/models/Room'
import { NextResponse } from 'next/server'

export async function GET() {
  const residents = await getAllResidents()
  return NextResponse.json(residents)
}

export async function POST(request) {
  try {
    const formData = await request.formData()
    let {
      room_id,
      name,
      father_name,
      nrc_no,
      roll_no,
      major,
      address,
      student_phone,
      parent_phone,
      gender,
    } = getDataFromForm(
      formData,
      'room_id',
      'name',
      'father_name',
      'nrc_no',
      'roll_no',
      'major',
      'address',
      'student_phone',
      'parent_phone',
      'gender'
    )
    const room = await getRoomById(room_id)
    if (!room) {
      return NextResponse.json(
        { message: "Room doesn't exist" },
        { status: 400 }
      )
    }
    const currentResident = await countResidentsFromRoom(room_id)
    if (currentResident == room.capacity) {
      return NextResponse.json({ message: 'Room is full' }, { status: 400 })
    }
    const isInserted = await createResident(
      room_id,
      name,
      father_name,
      nrc_no,
      roll_no,
      major,
      address,
      student_phone,
      parent_phone,
      gender
    )
    if (!isInserted) {
      return NextResponse.json(
        { message: 'Something goes wrong' },
        { status: 500 }
      )
    }
    return NextResponse.json(
      { message: 'Successfully inserted' },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something goes wrong' },
      { status: 500 }
    )
  }
}
