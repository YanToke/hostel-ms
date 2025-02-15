import { getDataFromForm, handleImage } from "@/libs/utils";
import { createRoom } from "@/models/Room";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const formData = await request.formData();
        let { name, img, floor_id } = getDataFromForm(formData,'name','img','floor_id');
        if (!floor_id) {
            return NextResponse.json({ message: "floor_id is required" }, { status: 400 });
        }
        if (img) {
            const filename = await handleImage('room-images',img);
            await createRoom(floor_id, name, '/room-images/'+filename);
            return NextResponse.json({ message: 'Successfully Created' })
        }
        img = '/room-images/room.jpg';
        await createRoom(floor_id, name, img);
        return NextResponse.json({ message: 'Successfully Created' })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Cannot create Room" }, { status: 500 });
    }
}