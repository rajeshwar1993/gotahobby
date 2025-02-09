import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();

  const b = cookieStore.set("test", "TEST BEARER");

  return NextResponse.json({ data: "ok" });
}
