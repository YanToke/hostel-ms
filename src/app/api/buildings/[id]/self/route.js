import { getBuildingById } from "@/models/Building";
import { NextResponse } from "next/server";

export async function GET(request,{params}){
    const {id} = await params;
    const building = await getBuildingById(id);
    if(!building){
        return NextResponse.json({message : "No builidig is found"},{status : 404})
    }
    return NextResponse.json(building);
}