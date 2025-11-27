import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === "admin@hsconsultants.pk" && password === "hscadmin@123") {
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    //  localStorage.setItem("token",token);
    return NextResponse.json({ token });
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
