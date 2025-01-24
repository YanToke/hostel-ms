import pool from "@/database/database";

export async function getAllFloors(){
    const [floors] = await pool.query("SELECT * FROM FLOORS");
    return floors;
}