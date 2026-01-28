import { NextResponse } from "next/server";
import { parseResume } from "@/lib/ats/parse-resume";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only PDF and DOCX are supported" },
        { status: 400 },
      );
    }

    // Parse the resume
    const text = await parseResume(file);

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error parsing resume:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to parse resume",
      },
      { status: 500 },
    );
  }
}
