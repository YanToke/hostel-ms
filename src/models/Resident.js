import pool from "@/database/database"

export async function getAllResidents() {
    const [residents] = await pool.query(`SELECT * FROM Resident;`);
    return residents;
}

export async function countAllResidents(){
    const [residents] = await pool.query(`
    SELECT COUNT(*) as total_residents FROM Resident;
    `);
    return residents[0] ? residents[0].total_residents : 0;
}

export async function getAllMaleResidents(){
    const [residents] = await pool.query(`
        SELECT COUNT(*) AS male_resident FROM Resident WHERE gender='male'    
   `);
   return residents[0] ? residents[0].male_resident : 0 ;
}

export async function getAllFemaleResidents(){
    const [residents] = await pool.query(`
        SELECT COUNT(*) AS female_resident FROM Resident WHERE gender='female'    
   `);
   return residents[0] ? residents[0].female_resident : 0;
}

export async function getResidentById(id) {
    const [resident] = await pool.query(`SELECT * FROM Resident WHERE id=?;`, [id]);
    return resident[0]
}

export async function getResidentsByRoomId(id) {
    const [resident] = await pool.query(`SELECT * FROM Resident WHERE room_id=?;`, [id]);
    return resident;
}

export async function countResidentsFromRoom(id) {
    const [result] = await pool.query(`SELECT COUNT(*) as count FROM Resident WHERE room_id=?;`, [id]);
    return result[0].count;
}

export async function createResident(room_id, name, father_name, nrc_no, roll_no, major, address, student_phone, parent_phone, gender) {
    await pool.query(`INSERT INTO Resident (room_id,name,father_name,
        nrc_no,roll_no,major,address,
        student_phone,parent_phone,gender) 
        VALUES (?,?,?,?,?,?,?,?,?,?)`,
        [room_id, name, father_name, nrc_no, roll_no, major,
            address, student_phone, parent_phone, gender]);
    return true;
}

export async function updateResident(id, room_id, name, father_name, nrc_no, roll_no, major, address, student_phone, parent_phone, gender) {
    await pool.query(`UPDATE Resident SET room_id=?,name=?,
    father_name=?,nrc_no=?,roll_no=?,major=?,address=?,
    student_phone=?,parent_phone=?,gender=? WHERE id=?`, 
    [room_id, name, father_name, nrc_no, roll_no, major, 
        address, student_phone, parent_phone, gender, id]);
    return true;
}

export async function deleteResidentById(id) {
    await pool.query(`DELETE FROM Resident WHERE id=${id};`);
    return true;
}