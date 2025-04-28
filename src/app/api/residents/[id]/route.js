import { getDataFromForm } from "@/libs/utils";
import { countResidentsFromRoom, getResidentById, updateResident } from "@/models/Resident";
import { getRoomById } from "@/models/Room";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        let resident = await getResidentById(id);
        console.log(resident);
        //throw new Error("I am testing")
        if (!resident) {
            return NextResponse.json({ message: "No resident found" }, { status: 400 })
        }
        const formData = await request.formData();
        let { room_id, name, father_name,
            nrc_no, roll_no, major, address,
            student_phone, parent_phone, gender } = getDataFromForm(formData, 'room_id', 'name', 'father_name',
                'nrc_no', 'roll_no', 'major',
                'address', 'student_phone',
                'parent_phone', 'gender');
        const room = await getRoomById(room_id);
        if (!room) {
            return NextResponse.json({ message: "Room doesn't exist" }, { status: 400 });
        }
        if (resident.id != room_id) {
            const currentResident = await countResidentsFromRoom(room_id);
            if (currentResident == room.capacity) {
                return NextResponse.json({ message: "Room is Full" }, { status: 400 })
            }
        }
        const isUpdated = await updateResident(id, room_id, name, father_name,
            nrc_no, roll_no, major, address,
            student_phone, parent_phone, gender);
        if (!isUpdated) {
            return NextResponse.json({ message: "Cannot update resident" }, { status: 500 });
        }
        return NextResponse.json({ message: "successfully updated" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}