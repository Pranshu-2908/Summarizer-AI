import BgGradient from "@/components/common/BgGradient";
import EmptySummary from "@/components/summaries/EmptySummary";
import SummaryCard from "@/components/summaries/SummaryCard";
import { Button } from "@/components/ui/button";
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const user = await currentUser();
  if (!user?.id) return redirect("/sign-in");

  const userId = user?.id;
  const uploadLimit = 5;
  const summaries = await getSummaries(userId);
  return (
    <main className="min-h-screen">
      <BgGradient className="from-emerald-400 via-teal-400 to-cyan-400" />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex gap-4 mb-8 justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-slate-800 to-rose-600 bg-clip-text text-transparent">
                Your Summaries
              </h1>
              <p className="text-gray-600">
                Transform your PDFs into concise,actionable insights
              </p>
            </div>
            <Button className="bg-rose-500 text-white hover:scale-105 transition-all duration-300">
              <Link href="/upload" className="flex">
                <Plus className="w-5 h-5 mr-2" />
                New Summary
              </Link>
            </Button>
          </div>
          <div className="mb-6">
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-700">
              <p className="text-sm">
                You have reached the limit of {uploadLimit} uploads on the basic
                plan!!.
                <Link
                  href="/#pricing"
                  className="text-rose-800 underline font-medium underline-offset-4 inline-flex items-center"
                >
                  Click here to upgrade to Pro{" "}
                  <ArrowRight className="w-4 h-4 inline-block" />
                </Link>
                for unlimited uploads
              </p>
            </div>
          </div>

          {summaries.length === 0 ? (
            <EmptySummary />
          ) : (
            <div className="grid grid-col-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
              {summaries.map((summary, index) => (
                <SummaryCard key={index} summary={summary} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
