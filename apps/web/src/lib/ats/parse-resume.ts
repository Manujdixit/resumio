import mammoth from "mammoth";
import { extractText } from "unpdf";

/**
 * Detects file type based on magic numbers in the buffer
 */
function detectFileType(
  buffer: ArrayBuffer | Buffer,
): "pdf" | "docx" | "unknown" {
  let arr: Uint8Array;
  if (buffer instanceof Buffer) {
    arr = new Uint8Array(
      buffer.buffer,
      buffer.byteOffset,
      Math.min(buffer.byteLength, 8),
    );
  } else {
    arr = new Uint8Array(buffer.slice(0, 8));
  }

  // PDF magic number: %PDF
  if (
    arr[0] === 0x25 &&
    arr[1] === 0x50 &&
    arr[2] === 0x44 &&
    arr[3] === 0x46
  ) {
    return "pdf";
  }

  // DOCX (ZIP) magic number: PK (0x50, 0x4B)
  if (arr[0] === 0x50 && arr[1] === 0x4b) {
    return "docx";
  }

  return "unknown";
}

export async function parseResume(file: File | Buffer): Promise<string> {
  const buffer = file instanceof File ? await file.arrayBuffer() : file;

  // Detect file type using magic numbers
  const fileType = detectFileType(buffer);

  console.log(`[parseResume] Detected file type: ${fileType}`);

  // Try parsing based on detected file type
  if (fileType === "pdf") {
    try {
      const result = await parsePdf(buffer);
      console.log("[parseResume] PDF parsing successful");
      return result;
    } catch (error) {
      console.error("[parseResume] PDF parsing failed:", error);
      throw new Error(
        `Failed to parse PDF file: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  if (fileType === "docx") {
    try {
      const result = await parseDocx(buffer);
      console.log("[parseResume] DOCX parsing successful");
      return result;
    } catch (error) {
      console.error("[parseResume] DOCX parsing failed:", error);
      throw new Error(
        `Failed to parse DOCX file: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  // If file type is unknown, try both parsers as fallback
  console.log("[parseResume] Unknown file type, trying both parsers...");

  let pdfError: Error | null = null;
  let docxError: Error | null = null;

  try {
    const result = await parsePdf(buffer);
    console.log("[parseResume] PDF parsing successful (fallback)");
    return result;
  } catch (error) {
    pdfError =
      error instanceof Error ? error : new Error("Unknown PDF parsing error");
    console.error(
      "[parseResume] PDF fallback parsing failed:",
      pdfError.message,
    );
  }

  try {
    const result = await parseDocx(buffer);
    console.log("[parseResume] DOCX parsing successful (fallback)");
    return result;
  } catch (error) {
    docxError =
      error instanceof Error ? error : new Error("Unknown DOCX parsing error");
    console.error(
      "[parseResume] DOCX fallback parsing failed:",
      docxError.message,
    );
  }

  // Both parsers failed
  throw new Error(
    "Could not parse file. Supported formats: PDF, DOCX. " +
      `PDF error: ${pdfError?.message || "N/A"}, ` +
      `DOCX error: ${docxError?.message || "N/A"}`,
  );
}

async function parseDocx(buffer: ArrayBuffer | Buffer): Promise<string> {
  try {
    const arrayBuffer =
      buffer instanceof Buffer
        ? buffer.buffer.slice(
            buffer.byteOffset,
            buffer.byteOffset + buffer.byteLength,
          )
        : buffer;

    console.log("[parseDocx] Starting DOCX parsing...");

    const result = await mammoth.extractRawText({
      arrayBuffer: arrayBuffer as ArrayBuffer,
    });

    if (!result.value || result.value.trim().length === 0) {
      throw new Error("Extracted text is empty");
    }

    console.log(`[parseDocx] Extracted ${result.value.length} characters`);
    return result.value;
  } catch (error) {
    console.error("[parseDocx] Error:", error);
    throw error;
  }
}

async function parsePdf(buffer: ArrayBuffer | Buffer): Promise<string> {
  try {
    // Convert to Uint8Array for unpdf
    const data =
      buffer instanceof Buffer
        ? new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength)
        : new Uint8Array(buffer);

    console.log("[parsePdf] Starting PDF parsing with unpdf...");
    console.log(`[parsePdf] Buffer size: ${data.length} bytes`);

    if (data.length < 100) {
      throw new Error("File is too small to be a valid PDF");
    }

    // Use unpdf to extract text - optimized for serverless environments
    const { text } = await extractText(data, { mergePages: true });

    if (!text || text.trim().length === 0) {
      throw new Error("No text could be extracted from the PDF");
    }

    console.log(`[parsePdf] Extracted ${text.length} characters`);

    return text;
  } catch (error) {
    console.error("[parsePdf] Error:", error);
    throw error;
  }
}
