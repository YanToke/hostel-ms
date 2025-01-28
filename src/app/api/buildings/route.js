import { getAllBuildings } from "@/models/Building"
import { NextResponse } from "next/server";

export async function GET(){
    const buildings = await getAllBuildings();
    return NextResponse.json(buildings,{status : 200});
}