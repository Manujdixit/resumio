import { type NextRequest, NextResponse } from "next/server";
import { parseResume } from "@/lib/ats/parse-resume";
import { analyzeResume } from "@/lib/ats/rule-based-checker";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const jobDescription = formData.get("jobDescription") as string | undefined;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 1. Parse text from file
    let resumeText = "";
    try {
      resumeText = await parseResume(file);
    } catch (error) {
      console.error("Parsing error:", error);
      return NextResponse.json(
        { error: "Failed to parse file. Please upload a valid PDF or DOCX." },
        { status: 400 },
      );
    }

    if (!resumeText || resumeText.trim().length < 50) {
      return NextResponse.json(
        {
          error:
            "Could not extract enough text from the resume. Is it an image-based PDF?",
        },
        { status: 422 },
      );
    }

    // 2. Analyze
    const results = analyzeResume(resumeText, jobDescription || undefined);

    // 3. Return results
    return NextResponse.json({
      success: true,
      data: results,
      resumePreview: `${resumeText.substring(0, 200)}...`, // Verification debug
    });
  } catch (error) {
    console.error("ATS Check Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
