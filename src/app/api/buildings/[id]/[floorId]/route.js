import { getRoomsByFloorId } from "@/models/Room";
import { NextResponse } from "next/server";

export async function GET(request,{params}){
    const {floorId} = await params;
    const rooms = await getRoomsByFloorId(floorId);
    return NextResponse.json(rooms,{status : 200})
}