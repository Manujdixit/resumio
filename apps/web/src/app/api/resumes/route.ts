import { auth } from "@resumio/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db, schema } from "@resumio/db";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const resumes = await db.query.resume.findMany({
    where: eq(schema.resume.userId, session.user.id),
    orderBy: [desc(schema.resume.updatedAt)],
    columns: {
      id: true,
      title: true,
      updatedAt: true,
      isPublic: true,
      thumbnail: true,
      shareId: true,
    },
  });

  return NextResponse.json(resumes);
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { title, content } = body;

  const [newResume] = await db
    .insert(schema.resume)
    .values({
      userId: session.user.id,
      title: title || "Untitled Resume",
      content: content || {},
    })
    .returning();

  return NextResponse.json(newResume);
}
