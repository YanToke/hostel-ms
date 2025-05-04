import { getPaymentsByResidentId, getPreviousPaymentBefore } from "@/models/Payment";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = await params;
    try {
        let payments = await getPaymentsByResidentId(id);
        if (!payments) {
            return NextResponse.json({ message: "Cannot get payment" }, { status: 400 })
        }
        payments = await computeStatus(payments);
        console.log(payments)
        return NextResponse.json(payments, { status: 200 });
    } catch (error) {
        console.log(error);
        NextResponse.json({ message: "Cannot get payment" }, { status: 500 })
    }
}

async function computeStatus(payments) {
    const updatedPayment = await Promise.all(
        payments.map(async (payment) => {
            const paid_date = new Date(payment.paid_date);
            if (payment.status == 'over-paid') {
                console.log("Hi over-paid")
                const previousPayment = await getPreviousPaymentBefore(paid_date, payment.resident_id);
                console.log("previious paent is", previousPayment)
                const previous_due_date = new Date(previousPayment.due_date);
                console.log("previosu due date is", previous_due_date, paid_date);
                payment.day_late = Math.ceil((paid_date - previous_due_date) / (1000 * 60 * 60 * 24));

                console.log('difference is ', payment.day_late);
            } else {
                payment.day_late = '-'
            }
            payment.due_date = new Date(payment.due_date).toISOString().split('T')[0];
            payment.paid_date = new Date(payment.due_date).toISOString().split('T')[0];
            return payment;
        }))
    return updatedPayment;
}
