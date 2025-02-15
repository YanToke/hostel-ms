import { getDataFromForm, handleImage } from "@/libs/utils";
import { createFloor } from "@/models/Floor";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const formData = await request.formData();
        let { name, img, building_id } = getDataFromForm(formData, 'name', 'img', 'building_id');
        if (!building_id) {
            return NextResponse.json({ message: "building_id is required" }, { status: 400 });
        }
        if (img) {
            const filename = await handleImage('floor-images',img);
            await createFloor(building_id, name, '/floor-images/'+filename);
            return NextResponse.json({ message: 'Successfully Created' })
        }
        img = '/floor-images/floor.jpg';
        await createFloor(building_id, name, img);
        return NextResponse.json({ message: 'Successfully Created' })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Cannot create Floor" }, { status: 500 });
    }
}