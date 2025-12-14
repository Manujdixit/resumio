import { auth } from "@resumio/auth";
import { db, schema } from "@resumio/db";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// GET: Fetch chat messages for a resume
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resumeId = req.nextUrl.searchParams.get("resumeId");
    if (!resumeId) {
      return NextResponse.json(
        { error: "resumeId is required" },
        { status: 400 }
      );
    }

    // Verify user owns the resume
    const resume = await db.query.resume.findFirst({
      where: and(
        eq(schema.resume.id, resumeId),
        eq(schema.resume.userId, session.user.id)
      ),
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    // Get chat messages for this resume
    const chatRecord = await db.query.chatMessage.findFirst({
      where: and(
        eq(schema.chatMessage.resumeId, resumeId),
        eq(schema.chatMessage.userId, session.user.id)
      ),
    });

    return NextResponse.json({ messages: chatRecord?.messages ?? [] });
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

// POST: Save chat messages for a resume
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { resumeId, messages } = await req.json();

    if (!resumeId) {
      return NextResponse.json(
        { error: "resumeId is required" },
        { status: 400 }
      );
    }

    // Verify user owns the resume
    const resume = await db.query.resume.findFirst({
      where: and(
        eq(schema.resume.id, resumeId),
        eq(schema.resume.userId, session.user.id)
      ),
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    // Check if chat record exists
    const existingChat = await db.query.chatMessage.findFirst({
      where: and(
        eq(schema.chatMessage.resumeId, resumeId),
        eq(schema.chatMessage.userId, session.user.id)
      ),
    });

    if (existingChat) {
      // Update existing record
      await db
        .update(schema.chatMessage)
        .set({
          messages,
          updatedAt: new Date(),
        })
        .where(eq(schema.chatMessage.id, existingChat.id));
    } else {
      // Create new record
      await db.insert(schema.chatMessage).values({
        resumeId,
        userId: session.user.id,
        messages,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving chat messages:", error);
    return NextResponse.json(
      { error: "Failed to save messages" },
      { status: 500 }
    );
  }
}
