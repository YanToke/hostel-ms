import { deleteImage, getDataFromForm, handleImage } from "@/libs/utils";
import { deleteRoomById, getRoomById, updateRoom } from "@/models/Room";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const room = await getRoomById(id);
        console.log("Room  by id is ", room);
        if (!room) {
            return NextResponse.json({ message: "Room doesn't exist" }, { status: 400 });
        }
        const formData = await request.formData();
        let { floorId, name, img, capacity } = getDataFromForm(formData, "floorId", "name", "img", "capacity")
        console.log("Image is ", img);
        if (typeof img === 'string') {
            img = img.split('/')[2];
            console.log(img);
        } else if (img && img.name !== '' && `/room-images/${img.name}` === '/room-images/room.jpg') {
            console.log("If statement")
            console.log("Env image is", process.env.DEFAULT_ROOM_IMAGE)

            img = process.env.DEFAULT_ROOM_IMAGE;
        }
        else if (img && img.name !== '' && `/room-images/${img.name}` === room.img) {
            console.log("If else 1")
            img = img;
        }
        else if (img && img.name !== '' && `/room-images/${img.name}` !== '/room-images/room.jpg') {
            console.log("If else 2");
            if (room.img.split("/")[2] !== 'room.jpg') {
                await deleteImage("room-images", room.img.split("/")[2]);
            }
            img = await handleImage("room-images", img);
        }
        else if (!img || img == null || img.name == '') {
            console.log("If else 3")
            img = process.env.DEFAULT_ROOM_IMAGE;
            if (room.img.split("/")[2] !== 'room.jpg') {
                await deleteImage("room-images", room.img.split("/")[2]);
            }
        }
        name = name || room.name;
        img = img || room.img;
        floorId = floorId || room.floor_id;
        capacity = capacity || room.capacity;
        console.log(name, img, floorId, capacity);
        const isSuccess = await updateRoom(id, floorId, name, '/room-images/' + img, capacity);
        if (isSuccess) {
            return NextResponse.json({ message: "Successfully updated" }, { status: 200 });
        }
        else {
            return NextResponse.json({ message: "Error in updating room" }, { status: 500 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Can't update room" }, { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const isSuccess = await deleteRoomById(id);
        if (isSuccess) {
            return NextResponse.json({ message: "Successfully deleted" }, { status: 200 })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Can't Delete room" }, { status: 500 })
    }

}