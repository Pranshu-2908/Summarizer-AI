"use client";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UploadFormInput = ({ onSubmit }: UploadFormInputProps) => {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="flex justify-end item-center gap-1.5">
        <Input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          required
          className=""
        />
        <Button
          variant="outline"
          className="bg-rose-500 text-white hover:bg-rose-500 hover:text-white"
        >
          Upoad your PDF
        </Button>
      </div>
    </form>
  );
};

export default UploadFormInput;
