import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json(null);

  await connectToDB();
  const user = await User.findOne({ email: session.user.email });

  return NextResponse.json(user);
}
