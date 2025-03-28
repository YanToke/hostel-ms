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

export async function createFloor(building_id,name,img){
    await pool.query(`INSERT INTO Floor (building_id,name,img) values (${building_id},'${name}','${img}');`);
    return true;
}

export async function updateFloor(id,building_id,name,img){
    await pool.query(`UPDATE Floor SET building_id=${building_id},name='${name}',img='${img}' WHERE id=${id};`)
    return true;
}

export async function deleteFloorById(id){
    await pool.query(`DELETE FROM Floor WHERE id=${id};`);
}