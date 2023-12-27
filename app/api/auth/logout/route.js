import { connectToDB } from '@/utils/database';
import {  NextResponse } from "next/server";
export async function GET() {
    await connectToDB()
    const response = NextResponse.json({
        message: "Logout successful",
        success: true,
    })
    response.cookies.delete("token")
    return response;
}