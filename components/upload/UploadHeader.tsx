import { Sparkles } from "lucide-react";
import React from "react";

const UploadHeader = () => {
  return (
    <div className="relative mx-auto flex flex-col gap-4 items-center justify-center ">
      <div className="flex">
        <div className="flex relative px-5 py-2 rounded-full border-2 shadow-2xl border-rose-400 hover:bg-rose-200 transition-all duration-700 hover:border-slate-300">
          <Sparkles className="w-6 h-6 mr-2 text-rose-500 animate-pulse" />
          <p className="text-base text-rose-500 cursor-default">
            AI-Powered Content Creation
          </p>
        </div>
      </div>

      <div className="font-bold text-4xl py-8 text-center max-w-xl">
        Start Uploading
        <span className="relative inline-block">
          <span className="relative z-10 px-2">Your PDFs</span>
          <span className="m-1 absolute inset-0 bg-rose-300/50 -rotate-2 transform -skew-y-1"></span>
        </span>
      </div>
      <div className="text-sm sm:text-lg lg:text-xl text-center px-4 lg:px-8 lg:max-w-4xl text-gray-500">
        <p>Upload your PDF and let AI do the magic</p>
      </div>

      <div></div>
    </div>
  );
};

export default UploadHeader;
