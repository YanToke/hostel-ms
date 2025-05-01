import { getPaymentsByResidentId } from "@/models/Payment";
import { NextResponse } from "next/server";

export async function GET(request,{params}){
    const {id} = await params;
    try {
        const payments = await getPaymentsByResidentId(id);
        if(!payments){
           return NextResponse.json({message : "Cannot get payment"},{status : 400})
        }
        return NextResponse.json(payments,{status : 200});
    } catch (error) {
        console.log(error);
        NextResponse.json({message : "Cannot get payment"},{status : 500})
    }
}