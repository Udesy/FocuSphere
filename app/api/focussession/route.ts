import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  await connectToDB();

  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = session.user.email;
  const { date, sessionTime } = await req.json();

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Initialize focusSessions if it's not set
    if (!user.focusSessions) {
      user.focusSessions = {};
    }

    const current = user.focusSessions[date] || 0;
    user.focusSessions[date] = current + Number(sessionTime);
    user.markModified("focusSessions");

    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating focus data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
