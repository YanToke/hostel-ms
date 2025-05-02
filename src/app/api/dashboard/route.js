import { getAllUnpaidResidents } from "@/models/Payment";
import { countAllResidents, getAllFemaleResidents, getAllMaleResidents } from "@/models/Resident";
import { countAllRooms, getAvaiableRooms } from "@/models/Room";
import { NextResponse } from "next/server";

export async function GET(request) {
    const totalResidents = await countAllResidents();
    const totalMaleResidents = await getAllMaleResidents();
    const totalFemaleResidents = await getAllFemaleResidents();
    const totalRooms = await countAllRooms();
    const unpaidResidents = await getAllUnpaidResidents();
    const availableRoom = await getAvaiableRooms();
    return NextResponse.json({
        totalResidents,
        totalMaleResidents,
        totalFemaleResidents,
        totalRooms,
        availableRoom,
        unpaidResidents,
    })
}