import pool from "@/database/database";

export async function getAllFloors(){
    const [floors] = await pool.query("SELECT * FROM Floor");
    return floors;
}

export async function getFloorsByBuildingId(building_id){
    const [floors] = await pool.query("SELECT * FROM Floor WHERE building_id = ?",[building_id]);
    return floors;
}

export async function getFloorById(id){
    const [floor] = await pool.query("SELECT * FROM Floor WHERE id=?",[id]);
    return floor[0];
}