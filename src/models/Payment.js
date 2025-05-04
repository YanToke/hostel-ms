import pool from "@/database/database";

export async function getPaymentsByResidentId(id){
    const [payments] = await pool.query(`
    SELECT * FROM Payment WHERE resident_id=?
    `,[id]);
    return payments;
}

export async function getPreviousPaymentBefore(latestPaidDate,resident_id){
    const [payment] = await pool.query(`
    SELECT * FROM Payment WHERE due_date = (
        SELECT MAX(due_date) FROM Payment WHERE paid_date < ? AND resident_id=?
    )`,[latestPaidDate,resident_id]);
    return payment[0] || null;
}

export async function getAllResidentsPreviousPaymentsBefore(latestPaidDate){
    const [payment] = await pool.query(`
    SELECT * FROM Payment WHERE due_date = (
        SELECT MAX(due_date) FROM Payment WHERE paid_date < ?
    )`,[latestPaidDate]);
    return payment || null;
}

export async function getAllLatestResidentsPayments(){
    const [payment] = await pool.query(`
    SELECT Resident.*,MAX(Payment.due_date) as due_date FROM Resident INNER JOIN Payment ON
    Resident.id = Payment.resident_id group by Resident.id;`);
    return payment || null;
}


export async function createPayment(resident_id,paid_date,due_date,month,amount,status){
    await pool.query(`
    INSERT INTO Payment (resident_id,paid_date,due_date,month,amount,status) VALUES (?,?,?,?,?,?)
    `,[resident_id,paid_date,due_date,month,amount,status])
    return true;
}

export async function getAllUnpaidResidents(){
    let now = new Date();
    const residentPayments = await getAllLatestResidentsPayments();
    let overdueResidents = [];
    await residentPayments.forEach(async (residentPayment) => {
        let due_date =  new Date(residentPayment.due_date)
        due_date > now ? '' : overdueResidents.push(residentPayment);
    })
    
    return overdueResidents;
}

export async function getPreviousPaymentByRoomId(room_id){
    const [residents] = await pool.query(`
    SELECT Resident.*,MAX(Payment.due_date) as due_date FROM Resident INNER JOIN Payment ON
    Resident.id = Payment.resident_id  WHERE Resident.room_id = ? group by Resident.id;
    `,[room_id]);
    return residents;
}