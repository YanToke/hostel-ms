import { deleteImage, getDataFromForm, handleImage } from "@/libs/utils";
import { deleteBuildingById, getBuildingById, getBuildingInformationsById, updateBuilding } from "@/models/Building";
import { getFloorsByBuildingId } from "@/models/Floor";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const floors = await getFloorsByBuildingId(id);
        return NextResponse.json(floors, { status: 200 });
    } catch (error) {
        console.log(error);
        NextResponse.json({ message: "Can't get Floors" }, { status: 500 })
    }

}

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const building = await getBuildingById(id);
        console.log("Buildig  by id is ", building);
        if (!building) {
            return NextResponse.json({ message: "Building doesn't exist" }, { status: 400 });
        }
        const formData = await request.formData();
        let { name, img } = getDataFromForm(formData, "name", "img")
        console.log("Image is ", img);
        if (img && img.name !== '' && `/building-images/${img.name}` === '/building-images/building.jpg') {
            console.log("If statement")
            console.log("Env image is",process.env.DEFAULT_BUILDING_IMAGE)

            img = process.env.DEFAULT_BUILDING_IMAGE;
        }
        else if (img && img.name !== '' && `/building-images/${img.name}` === building.img) {
            console.log("If else 1")
            img = img;
        }
        else if (img && img.name !== '' && `/building-images/${img.name}` !== '/building-images/building.jpg') {
            console.log("If else 2")

            if(building.img.split("/")[2] !== 'building.jpg'){
                await deleteImage("building-images", building.img.split("/")[2]);
            }
            img = await handleImage("building-images", img);
        }
        else if (!img || img == null || img.name == '') {
            console.log("If else 3")
            img = process.env.DEFAULT_BUILDING_IMAGE;
            if(building.img.split("/")[2] !== 'building.jpg'){
                await deleteImage("building-images", building.img.split("/")[2]);
            }
        }
        name = name || building.name;
        img = img || building.img;
        const isSuccess = await updateBuilding(id, name, '/buidling-images/' + img);
        if (isSuccess) {
            return NextResponse.json({ message: "Successfully updated" }, { status: 200 });
        }
        else {
            return NextResponse.json({ message: "Error in updating building" }, { status: 500 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Can't update floor" }, { status: 500 })
    }
}

export async function DELETE(request,{params}){
    try {
        const {id} = await params;
        const isSuccess = await deleteBuildingById(id);
        if(isSuccess){
            return NextResponse.json({message : "Successfully deleted"},{status : 200});
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Can't delete building" }, { status: 500 })
    }
}