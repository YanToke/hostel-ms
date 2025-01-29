import { getBuildingInformationsById } from "@/models/Building";
import { NextResponse } from "next/server";

export async function GET(request,{params}){
    const {id} = await params;
    const buildingInfo = await getBuildingInformationsById(id);
    return NextResponse.json(buildingInfo,{status : 200});
}