import { deleteImage, getDataFromForm, handleImage } from '@/libs/utils'
import { deleteFloorById, getFloorById, updateFloor } from '@/models/Floor'
import { NextResponse } from 'next/server'

export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const floor = await getFloorById(id)
    console.log('Floor  by id is ', floor)
    if (!floor) {
      return NextResponse.json(
        { message: "Floor doesn't exist" },
        { status: 400 }
      )
    }
    const formData = await request.formData()
    let { buildingId, name, img } = getDataFromForm(
      formData,
      'buildingId',
      'name',
      'img'
    )
    console.log('Image is ', img)
    if (typeof img === 'string') {
      img = img.split('/')[2];
      console.log(img);
    } else if (
      img &&
      img.name !== '' &&
      `/floor-images/${img.name}` === '/floor-images/floor.jpg'
    ) {
      console.log('If statement')
      console.log('Env image is', process.env.DEFAULT_FLOOR_IMAGE)

      img = process.env.DEFAULT_FLOOR_IMAGE
    } else if (
      img &&
      img.name !== '' &&
      `/floor-images/${img.name}` === floor.img
    ) {
      console.log('If else 1')
      img = img
    } else if (
      img &&
      img.name !== '' &&
      `/floor-images/${img.name}` !== '/floor-images/floor.jpg'
    ) {
      console.log('If else 2')
      if (floor.img.split('/')[2] !== 'floor.jpg') {
        await deleteImage('floor-images', floor.img.split('/')[2])
      }
      img = await handleImage('floor-images', img)
    } else if (!img || img == null || img.name == '') {
      console.log('If else 3')
      img = process.env.DEFAULT_FLOOR_IMAGE
      if (floor.img.split('/')[2] !== 'floor.jpg') {
        await deleteImage('floor-images', floor.img.split('/')[2])
      }
    }
    name = name || floor.name
    img = img || floor.img
    buildingId = buildingId || floor.building_id
    console.log(name, img, buildingId)
    const isSuccess = await updateFloor(
      id,
      buildingId,
      name,
      '/floor-images/' + img
    )
    if (isSuccess) {
      return NextResponse.json(
        { message: 'Successfully updated' },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { message: 'Error in updating floor' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Can't update floor" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params

  const isSuccess = await deleteFloorById(id)

  if (isSuccess) {
    return NextResponse.json(
      { message: 'Successfully deleted' },
      { status: 200 }
    )
  } else {
    return NextResponse.json(
      { message: 'Failed to delete floor' },
      { status: 400 }
    )
  }
}
