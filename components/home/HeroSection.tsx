import React from "react";
import { Button } from "../ui/button";
import { ArrowBigRight, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
      <div className="flex">
        <div className="flex relative px-5 py-2 rounded-full border-2 shadow-2xl border-rose-400 hover:bg-rose-200 transition-all duration-700 hover:border-slate-300">
          <Sparkles className="w-6 h-6 mr-2 text-rose-500 animate-pulse" />
          <p className="text-base text-rose-500 cursor-default">
            Powered by AI
          </p>
        </div>
      </div>

      <h1 className="font-bold text-4xl py-8 text-center max-w-xl">
        Transform PDFs into
        <span className="relative inline-block">
          <span className="relative z-10 px-2">concise</span>
          <span className="m-1 absolute inset-0 bg-rose-300/50 -rotate-2 transform -skew-y-1"></span>
        </span>
        summaries
      </h1>
      <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-8 lg:max-w-4xl">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error alias
        nostrum quo quia incidunt eius asperiores, accusamus tempora commodi
        excepturi.
      </h2>
      <div>
        <Button className=" mt-6 text-base sm:text-lg lg:text-lg px-8 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 rounded-full bg-linear-to-r from-slate-800 to-rose-500 hover:from-rose-500 hover:to-slate-800 shadow-lg">
          <Link href="/#pricing" className="flex gap-2 items-center">
            Try summarizer
            <ArrowRight className="animate-pulse" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
