import { getDataFromForm } from "@/libs/utils";
import { getResidentById, updateResident } from "@/models/Resident";
import { getRoomById } from "@/models/Room";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        let resident = await getResidentById(id);
        if (!resident) {
            return NextResponse.json({ message: "No resident found" }, { status: 400 })
        }
        const formData = await request.formData();
        let { room_id, roll_no, name, major, status, phone } = getDataFromForm(formData, 'room_id', 'roll_no', 'name', 'major', 'status', 'phone');
        const room = await getRoomById(room_id);
        if (!room) {
            return NextResponse.json({ message: "Room doesn't exist" }, { status: 400 });
        }
        const isUpdated = await updateResident(id, room_id, name, roll_no, major, phone, status);
        if (!isUpdated) {
            return NextResponse.json({ message: "Cannot update resident" }, { status: 500 });
        }
        return NextResponse.json({ message: "successfully updated" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({message : "Something went wrong"},{status : 500});
    }
}