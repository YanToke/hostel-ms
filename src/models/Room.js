import pool from '@/database/database'

export async function getAllRooms() {
  const [rooms] = await pool.query('SELECT * FROM Room')
  return rooms
}

export async function getAvaiableRooms(){
  const [rooms] = await pool.query(`
  SELECT SUM(capacity)-(SELECT COUNT(*) FROM Resident) as available_room FROM Room;
  `);
  return rooms[0] ? rooms[0].available_room : 0;
}

export async function countAllRooms(){
  const [rooms] = await pool.query(`
  SELECT SUM(capacity) AS rooms FROM Room;
  `)
  return rooms[0] ? rooms[0].rooms : 0;
}

export async function getRoomsByFloorId(floor_id) {
  const [rooms] = await pool.query('SELECT * FROM Room WHERE floor_id = ?', [
    floor_id,
  ])
  return rooms
}

export async function getRoomById(id) {
  const [room] = await pool.query('SELECT * FROM Room WHERE id=?', [id])
  return room[0]
}

export async function createRoom(floor_id, name, img, capacity) {
  await pool.query(
    `INSERT INTO Room (floor_id,name,img,capacity) VALUES (${floor_id},'${name}','${img}',${capacity});`
  )
  return true
}

export async function updateRoom(id, floorId, name, img, capacity) {
  await pool.query(
    `UPDATE Room SET floor_id='${floorId}',name='${name}',img='${img}',capacity=${capacity} WHERE id=${id};`
  )
  return true
}

export async function deleteRoomById(id) {
  await pool.query(`DELETE FROM Room WHERE id=${id};`)
  return true
}
