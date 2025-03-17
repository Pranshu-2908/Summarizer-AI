"use client";
import { useRef, useState } from "react";
import UploadFormInput from "./UploadFormInput";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import {
  generatePdfSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { useRouter } from "next/navigation";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File size must be less than 20MB",
    })
    .refine((file) => file.type.startsWith("application/pdf"), {
      message: "File must be a PDF.",
    }),
});

const UploadForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("error occurred while uploading", err);
      toast(err.message);
    },
    onUploadBegin: (file) => {
      console.log("upload has begun for", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      //Validation the fields

      const validatedFields = schema.safeParse({ file });
      if (!validatedFields.success) {
        toast(
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file"
        );
        setIsLoading(false);
        return;
      }
      toast("Uploading PDF...");
      //uplaod the file to uploadthing
      const resp = await startUpload([file]);
      if (!resp) {
        toast("Please use a different file.");
        setIsLoading(false);
        return;
      }
      toast("Processing PDF. Please Wait...");
      //parse the pdf using lang chain
      //summarize the pdf using AI
      const result = await generatePdfSummary(resp);
      // console.log({ result });
      toast("PDF successfully summarized");
      const { data = null, message = null } = result || {};

      if (data) {
        toast("Saving the PDF...");
        let storeResults: any;
        if (data.summary) {
          //save the summary to the database
          storeResults = await storePdfSummaryAction({
            summary: data.summary,
            fileUrl: resp[0].serverData.file.url,
            title: data.title,
            fileName: file.name,
          });
          toast("Your PDF has been saved successfully");
          formRef.current?.reset();

          //redirect to the [id] summary page
          router.push(`/summaries/${storeResults.data.id}`);
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error Occured", error);
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UploadForm;
