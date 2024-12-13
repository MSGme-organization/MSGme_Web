import { NextResponse } from "next/server";

export const response = {
  success: (message: string, data: any) =>
    NextResponse.json({ message, data }, { status: 200 }),
  error: (message: string) =>
    NextResponse.json({ message, data: null }, { status: 500 }),
  dataInvalid: (message: string, data: any = null) =>
    NextResponse.json({ message, data }, { status: 403 }),
  dataConflict: (message: string, data: any = null) =>
    NextResponse.json({ message, data }, { status: 409 }),
  unAuthorized: (message: string) =>
    NextResponse.json({ message, data: null }, { status: 401 }),
};
