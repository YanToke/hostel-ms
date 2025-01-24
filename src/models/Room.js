import pool from "@/database/database";

export async function getAllRooms(){
    const [rooms] = await pool.query("SELECT * FROM ROOMS");
    return rooms;
}