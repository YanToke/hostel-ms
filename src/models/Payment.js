import pool from "@/database/database";

export async function getPaymentsByResidentId(id){
    const [payments] = await pool.query(`
    SELECT * FROM Payment WHERE resident_id=?
    `,[id]);
    return payments;
}

export async function getPreviousPaymentBefore(latestDate,resident_id){
    const [payment] = await pool.query(`
    SELECT * FROM Payment WHERE due_date = (
        SELECT MAX(due_date) FROM Payment WHERE paid_date < ? AND resident_id=?
    )`,[latestDate,resident_id]);
    return payment[0] || null;
}

export async function createPayment(resident_id,paid_date,due_date,month,amount,status){
    await pool.query(`
    INSERT INTO Payment (resident_id,paid_date,due_date,month,amount,status) VALUES (?,?,?,?,?,?)
    `,[resident_id,paid_date,due_date,month,amount,status])
    return true;
}


