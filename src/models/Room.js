import pool from "@/database/database";

export async function getAllRooms(){
    const [rooms] = await pool.query("SELECT * FROM Room");
    return rooms;
}

export async function getRoomsByFloorId(floor_id){
    const [rooms] = await pool.query("SELECT * FROM Room WHERE floor_id = ?",[floor_id]);
    return rooms;
}

export async function getRoomById(id){
    const [room] = await pool.query("SELECT * FROM Room WHERE id=?",[id]);
    return room[0];
}

export async function createRoom(floor_id,name,img){
    await pool.query(`INSERT INTO Room (floor_id,name,img) values ('${floor_id}','${name}','${img}');`);
    return true;
}