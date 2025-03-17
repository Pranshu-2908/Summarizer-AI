"use server";

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/gemini";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { formatFileNameAsTitle } from "@/utils/fomat";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PdfSummaryType {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function generatePdfSummary(
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
        };
      };
    }
  ]
) {
  if (!uploadResponse) {
    return {
      success: false,
      message: "file upload fail",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: filename },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "file upload fail",
      data: null,
    };
  }
  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log({ pdfText });
    let summary;
    try {
      summary = await generateSummaryFromGemini(pdfText);
      console.log({ summary });
    } catch (geminiError) {
      console.error(
        "Gemini api failed after openai quota exceeded",
        geminiError
      );
      throw new Error("Failed to generate summary with available AI providers");
    }
    if (!summary) {
      return {
        success: false,
        message: "failed to generate summary",
        data: null,
      };
    }
    const formattedFileName = formatFileNameAsTitle(filename);
    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        title: formattedFileName,
        summary,
      },
    };
  } catch (err) {
    return {
      success: false,
      message: "file upload fail",
      data: null,
    };
  }
}

async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  try {
    const sql = await getDbConnection();
    await sql`INSERT INTO pdf_summaries (
    user_id, 
    original_file_url, 
    summary_text, 
    title, 
    file_name 
) VALUES (
    ${userId},
    ${fileUrl},
    ${summary},
    ${title},
    ${fileName}
);
`;
  } catch (error) {
    console.log("Error saving PDF summary", error);
    throw error;
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  // user is logged in and has a userid
  // save pdf summary
  // save pdf summary function
  let savedSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not Found",
      };
    }
    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });
    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save Summary ",
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error in saving Pdf summary",
    };
  }
  // revalidate the cache
  revalidatePath(`/summaries/${savedSummary.id}`);
  return {
    success: true,
    message: "PDF summary saved Successfully",
    data: {
      id: savedSummary.id,
    },
  };
}
