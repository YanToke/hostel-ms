import pool from "@/database/database"

export async function getAllResidents(){
    const [residents] = await pool.query(`SELECT * FROM Resident;`);
    return residents;
}


export async function getResidentById(id){
    const [resident] = await pool.query(`SELECT * FROM Resident WHERE id=?;`,[id]);
    return resident[0]
}

export async function getResidentsByRoomId(id){
    const [resident] = await pool.query(`SELECT * FROM Resident WHERE room_id=?;`,[id]);
    return resident;
}

export async function countResidentsFromRoom(id){
    const [result] = await pool.query(`SELECT COUNT(*) as count FROM Resident WHERE room_id=?;`,[id]);
    return result[0].count;
}

export async function createResident(roomId,name,rollNo,major,phone,status){
    await pool.query(`INSERT INTO Resident (room_id,name,roll_no,major,phone,status) VALUES (?,?,?,?,?,?)`,[roomId,name,rollNo,major,phone,status]);
    return true;
}

export async function updateResident(id,roomId,name,rollNo,major,phone,status){
    await pool.query(`UPDATE Resident SET room_id=?,name=?,roll_no=?,major=?,phone=?,status=? WHERE id=?`,[roomId,name,rollNo,major,phone,status,id]);
    return true;
}

export async function deleteResidentById(id){
    await pool.query(`DELETE FROM Resident WHERE id=${id};`);
    return true;
}