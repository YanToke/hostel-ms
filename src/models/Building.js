import pool from "@/database/database";

export async function getAllBuildings(){
    const [buildings] = await pool.query("SELECT * FROM BUILDINGS");
    return buildings;
}