import { getDataFromForm, handleImage } from "@/libs/utils";
import { createBuilding, getAllBuildings } from "@/models/Building"
import { NextResponse } from "next/server";

export async function GET() {
    const buildings = await getAllBuildings();
    return NextResponse.json(buildings, { status: 200 });
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        let { name, img } = getDataFromForm(formData,'name','img');
        console.log("name",name,img)
        if (img) {
            const filename = await handleImage('building-images',img);
            await createBuilding(name, '/building-images/'+filename);
            return NextResponse.json({ message: 'Successfully Created' })
        }
        img = '/building-images/building.jpg';
        await createBuilding(name, img);
        return NextResponse.json({ message: 'Successfully Created' })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Cannot create building" }, { status: 500 });
    }
}