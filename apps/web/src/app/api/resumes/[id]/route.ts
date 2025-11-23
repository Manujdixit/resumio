import { db, schema } from "@resumio/db";
import { auth } from "@resumio/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const resume = await db.query.resume.findFirst({
    where: and(
      eq(schema.resume.id, id),
      eq(schema.resume.userId, session.user.id)
    ),
  });

  if (!resume) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return NextResponse.json(resume);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { title, content, isPublic, thumbnail } = body;

  const updateData: Partial<typeof schema.resume.$inferInsert> = {
    updatedAt: new Date(),
  };

  if (title !== undefined) updateData.title = title;
  if (content !== undefined) updateData.content = content;
  if (isPublic !== undefined) updateData.isPublic = isPublic;
  if (thumbnail !== undefined) updateData.thumbnail = thumbnail;

  const [updatedResume] = await db
    .update(schema.resume)
    .set(updateData)
    .where(
      and(eq(schema.resume.id, id), eq(schema.resume.userId, session.user.id))
    )
    .returning();

  if (!updatedResume) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return NextResponse.json(updatedResume);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const [deletedResume] = await db
    .delete(schema.resume)
    .where(
      and(eq(schema.resume.id, id), eq(schema.resume.userId, session.user.id))
    )
    .returning();

  if (!deletedResume) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return NextResponse.json(deletedResume);
}
