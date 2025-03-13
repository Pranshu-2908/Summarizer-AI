"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";

export async function generatePdfSummary(
  uploadRespose: [
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
  if (!uploadRespose) {
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
  } = uploadRespose[0];

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
      summary = await generateSummaryFromOpenAI(pdfText);
      console.log({ summary });
    } catch (error) {
      console.log(error);
    }
    if (!summary) {
      return {
        success: false,
        message: "failed to generate summary",
        data: null,
      };
    }
  } catch (err) {
    return {
      success: false,
      message: "file upload fail",
      data: null,
    };
  }
}
