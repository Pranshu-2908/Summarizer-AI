import { FileText } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const EmptySummary = () => {
  return (
    <div className="text-center py-12">
      <div>
        <div className="flex flex-col items-center gap-4 ">
          <FileText className="w-16 h-16 text-gray-400" />
          <h2 className="text-2xl font-semibold text-gray-600">
            No Summaries yet
          </h2>
          <p className="text-base max-w-md text-gray-500">
            Upload your first PDF to get started with AI-powered summaries
          </p>
          <Button className="bg-rose-500 text-white hover:scale-105 transition-all duration-300">
            <Link href="/upload">Create your first summary</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptySummary;
