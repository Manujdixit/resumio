import { generateText } from "ai";
import { type NextRequest, NextResponse } from "next/server";
import { chatModel } from "@/lib/constants/modals";

export interface CoverLetterRequest {
  resumeText: string;
  jobDescription: string;
  companyName?: string;
  jobTitle?: string;
}

export interface CoverLetterResponse {
  coverLetter: string;
  preview: string;
  keyPoints: string[];
  wordCount: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CoverLetterRequest;
    const { resumeText, jobDescription, companyName, jobTitle } = body;

    // Validate required fields
    if (!resumeText || resumeText.trim().length < 50) {
      return NextResponse.json(
        { error: "Please provide a valid resume with at least 50 characters" },
        { status: 400 },
      );
    }

    if (!jobDescription || jobDescription.trim().length < 50) {
      return NextResponse.json(
        {
          error:
            "Please provide a valid job description with at least 50 characters",
        },
        { status: 400 },
      );
    }

    // Generate cover letter using AI
    const prompt = buildCoverLetterPrompt({
      resumeText,
      jobDescription,
      companyName,
      jobTitle,
    });

    const { text } = await generateText({
      model: chatModel,
      prompt,
      temperature: 0.7,
      maxOutputTokens: 2000,
    });

    const coverLetter = text.trim();
    const wordCount = coverLetter
      .split(/\s+/)
      .filter((w) => w.length > 0).length;

    // Extract preview (first 150-200 characters, ending at a sentence boundary)
    const preview = extractPreview(coverLetter);

    // Extract key points using AI
    const keyPoints = await extractKeyPoints(
      coverLetter,
      resumeText,
      jobDescription,
    );

    const response: CoverLetterResponse = {
      coverLetter,
      preview,
      keyPoints,
      wordCount,
    };

    return NextResponse.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("Cover Letter Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate cover letter. Please try again." },
      { status: 500 },
    );
  }
}

function buildCoverLetterPrompt({
  resumeText,
  jobDescription,
  companyName,
  jobTitle,
}: CoverLetterRequest): string {
  return `Write a professional cover letter for the following:

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

COMPANY: ${companyName || "the company"}
POSITION: ${jobTitle || "the position"}

Requirements:
- Match the tone of the job description
- Highlight 2-3 most relevant experiences from the resume
- Connect specific skills to job requirements
- Show enthusiasm and cultural fit
- Keep it 250-400 words
- Use professional but engaging language
- Include proper business letter format

Generate only the cover letter text, no explanations.`;
}

function extractPreview(coverLetter: string): string {
  // Target around 150-200 characters, ending at a sentence boundary
  const targetLength = 175;
  const maxLength = 200;

  if (coverLetter.length <= targetLength) {
    return coverLetter;
  }

  // Find the end of a sentence within the target range
  let endIndex = targetLength;
  const sentenceEndRegex = /[.!?]\s+/g;
  let lastSentenceEnd = -1;

  // Look for sentence endings up to maxLength
  let match = sentenceEndRegex.exec(coverLetter);
  while (match !== null) {
    if (match.index <= maxLength) {
      lastSentenceEnd = match.index + 1;
    } else {
      break;
    }
    match = sentenceEndRegex.exec(coverLetter);
  }

  // If we found a good sentence end, use it
  if (lastSentenceEnd > targetLength * 0.7) {
    endIndex = lastSentenceEnd;
  } else {
    // Otherwise, find the last space before targetLength
    const lastSpace = coverLetter.lastIndexOf(" ", targetLength);
    if (lastSpace > targetLength * 0.7) {
      endIndex = lastSpace;
    }
  }

  return coverLetter.slice(0, endIndex).trim();
}

async function extractKeyPoints(
  coverLetter: string,
  resumeText: string,
  jobDescription: string,
): Promise<string[]> {
  try {
    const prompt = `Analyze this cover letter and identify the 3 key highlights that connect the candidate's experience to the job requirements.

COVER LETTER:
${coverLetter}

RESUME (for context):
${resumeText.slice(0, 1000)}

JOB DESCRIPTION (for context):
${jobDescription.slice(0, 1000)}

Provide exactly 3 bullet points summarizing what the cover letter emphasizes. Each point should be 1-2 sentences. Format as a simple list with no numbering or bullets, just the text separated by newlines.`;

    const { text } = await generateText({
      model: chatModel,
      prompt,
      temperature: 0.5,
      maxOutputTokens: 500,
    });

    // Parse the response into bullet points
    const points = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 10 && !line.startsWith("-"))
      .slice(0, 3);

    return points.length > 0 ? points : generateFallbackKeyPoints(coverLetter);
  } catch (error) {
    console.error("Error extracting key points:", error);
    return generateFallbackKeyPoints(coverLetter);
  }
}

function generateFallbackKeyPoints(coverLetter: string): string[] {
  // Simple fallback that extracts common themes
  const points: string[] = [];

  if (coverLetter.toLowerCase().includes("experience")) {
    points.push(
      "Highlights relevant professional experience matching job requirements",
    );
  }

  if (coverLetter.toLowerCase().includes("skill")) {
    points.push("Emphasizes key skills that align with the role");
  }

  if (
    coverLetter.toLowerCase().includes("achieve") ||
    coverLetter.toLowerCase().includes("result")
  ) {
    points.push("Showcases measurable achievements and results");
  }

  if (points.length === 0) {
    points.push("Personalized introduction tailored to the company");
    points.push("Connects resume experience to job requirements");
    points.push("Professional closing with clear next steps");
  }

  return points.slice(0, 3);
}
