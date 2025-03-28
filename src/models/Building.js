import pool from "@/database/database";

export async function getAllBuildings() {
    const [buildings] = await pool.query("SELECT * FROM Building");
    return buildings;
}

export async function getBuildingInformationsById(building_id) {
    const [queryResult] = await pool.query(`
        SELECT
            Floor.id AS floor_id,
            Floor.name AS floor_name,
            Floor.img AS floor_img,
            Room.id AS room_id,
            Room.name AS room_name,
            Room.img AS room_img
        FROM
            Floor
        LEFT JOIN
            Room ON Floor.id = Room.floor_id
        WHERE
            Floor.building_id = ?
    `, [building_id]);
    const result = queryResult.reduce((acc, row) => {
        const floorIndex = acc.findIndex(floor => floor.floor_id == row.floor_id);
        if (floorIndex == -1) {
            acc.push({
                floor_id: row.floor_id,
                floor_name: row.floor_name,
                floor_img: row.floor_img,
                rooms: row.room_id ? [{ room_id: row.room_id, room_name: row.room_name, room_img: row.room_img }] : []
            });
        } else {
            if (row.room_id) {
                acc[floorIndex].rooms.push({ room_id: row.room_id, room_name: row.room_name, room_img: row.room_img })
            }
        }
        return acc;
    }, []);
    return result;
}

export async function getBuildingById(buildingId){
    const [building] = await pool.query("SELECT * FROM Building WHERE id=?",[buildingId])
    return building[0];
}

export async function createBuilding(name,img){
    await pool.query(`INSERT INTO Building (name,img) values ('${name}','${img}');`);
    return true;
}

export async function updateBuilding(id,name,img){
    await pool.query(`UPDATE Building SET name='${name}',img='${img}' where id=${id};`);
    return true;
}

export async function deleteBuildingById(id){
    await pool.query(`DELETE FROM Building WHERE id=${id}`);
    return true;
}