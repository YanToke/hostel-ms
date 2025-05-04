import { getPreviousPaymentByRoomId } from '@/models/Payment';
import { getResidentsByRoomId } from '@/models/Resident'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    const { roomId } = await params
    let residents = await getPreviousPaymentByRoomId(roomId);
    residents = computeStatus(residents);
    console.log("Residents is",residents)
    return NextResponse.json(residents, { status: 200 })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Cannot get Residents" }, { status: 500 })
  }
}

function computeStatus(residents) {
  const now = new Date();
  residents.map((resident) => {
    const due_date = new Date(resident.due_date);
    due_date > now ? resident.status = "paid" : resident.status = "unpaid";
  })
  return residents;
}