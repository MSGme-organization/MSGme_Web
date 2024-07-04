import { NextResponse } from "next/server";

export const response = {
    success: (message: string, data: any) => NextResponse.json({ message, data }, { status: 200 }),
    error: (message: string) => NextResponse.json({ message, data: null }, { status: 500 }),
    dataInvalid: (message: string) => NextResponse.json({ message, data: null }, { status: 403 }),
    dataConflict: (message: string) => NextResponse.json({ message, data: null }, { status: 409 }),
}