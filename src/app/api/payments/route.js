import { getDataFromForm } from "@/libs/utils";
import { createPayment, getPreviousPaymentBefore } from "@/models/Payment";
import { NextResponse } from "next/server";



export async function POST(request) {
    try {
        const formData = await request.formData();
        let { resident_id, paid_date, due_date, month, amount } = getDataFromForm(formData, 'resident_id', 'paid_date', 'due_date', 'month', 'amount')
        let status;
        paid_date = new Date(paid_date);
        const previousPayment = await getPreviousPaymentBefore(paid_date, resident_id);
        if (previousPayment) {
            const previousDueDate = new Date(previousPayment.due_date);
            if (paid_date > previousDueDate) {
                status = "over-paid";
            } else {
                status = "under-paid";
            }
        }else{
            status = "under-paid";
        }
        const isCreated = await createPayment(resident_id, paid_date, due_date, month, amount, status);
        if (!isCreated) {
            return NextResponse.json({ message: "Cannot make payment" }, { status: 400 })
        }
        return NextResponse.json({ message: "Successfully make payment" }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Cannot make payment" }, { status: 500 })
    }
}