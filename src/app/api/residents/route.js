import { getDataFromForm } from "@/libs/utils";
import { countResidentsFromRoom, createResident, deleteResidentById, getAllResidents } from "@/models/Resident";
import { getRoomById } from "@/models/Room";
import { NextResponse } from "next/server";

export async function GET() {
    const residents = await getAllResidents();
    return NextResponse.json(residents);
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        let { room_id, roll_no, name, major, status, phone } = getDataFromForm(formData, 'room_id', 'roll_no', 'name', 'major', 'status', 'phone');
        const room = await getRoomById(room_id);
        if (!room) {
            return NextResponse.json({ message: "Room doesn't exist" }, { status: 400 });
        }
        const currentResident = await countResidentsFromRoom(room_id);
        if (currentResident >= room.capacity) {
            return NextResponse.json({ message: "Room is full" }, { status: 400 })
        }
        const isInserted = await createResident(room_id, name, roll_no, major, phone, status);
        if (!isInserted) {
            return NextResponse.json({ message: "Something goes wrong" }, { status: 500 })
        }
        return NextResponse.json({ message: "Successfully inserted" }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something goes wrong" }, { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const isDeleted = await deleteResidentById(id);
        if (!isDeleted) {
            return NextResponse.json({ message : "Cannot delete resident"}, { status: 500 })
        }
        return NextResponse.json({ message: "Successfully deleted" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Can't Delete resident" }, { status: 500 })        

    }
}