import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CheckIcon,
  IndianRupee,
  ReceiptIndianRupeeIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
type Plans = {
  id: String;
  name: String;
  price: number;
  description: String;
  items: String[];
  paymentLink: String;
  priceId: String;
};
const plans: Plans[] = [
  {
    id: "basic",
    name: "Basic",
    price: 100,
    description: "this is a basic plan",
    items: [
      "5 PDF summaries/month",
      "Standard Processing speed",
      "email support",
    ],
    paymentLink: "",
    priceId: "",
  },
  {
    id: "pro",
    name: "Pro",
    price: 500,
    description: "this is a pro plan",
    items: [
      "unlimited PDF summaries",
      "Priority Processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    paymentLink: "",
    priceId: "",
  },
];
const PricingSection = () => {
  return (
    <section className="relative overflow-hidden" id="pricing">
      <div className="py-12 lg:py-24 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12 lg:max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="font-bold text-xl uppercase mb-4 text-rose-500">
            Pricing
          </h2>
        </div>
        <div className="relative flex flex-col item-center justify-center lg:flex-row lg:items-center gap-8 mx-10 ">
          {plans.map((plan, ind) => (
            <PricingPlans key={ind} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};
function PricingPlans({ id, name, price, description, items }: Plans) {
  return (
    <div className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-500">
      <div
        className={cn(
          "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 rounded-2xl border-1 border-gray-500/20 shadow-2xl",
          id === "pro" && "border-rose-500 gap-5 border-2"
        )}
      >
        <div className="felx justify-between items-center gap-4">
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex">
            <IndianRupee size={32} className="mt-2" />
            <p className="text-5xl tracking-tight font-extrabold">{price}</p>
          </div>
          <div className="flex flex-col justify-end mb-2">
            <p className="text-xs uppercase font-semibold">INR</p>
            <p className="text-xs">/month</p>
          </div>
        </div>
        <div className="space-y-2.5 leading-relaxed text-base flex-1">
          {items.map((item, ind) => (
            <li key={ind} className="flex items-center gap-2">
              <CheckIcon size={16} />
              <span>{item}</span>
            </li>
          ))}
        </div>
        <div className="space-y-2 flex justify-center">
          <Link
            href="/payment"
            className="w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2"
          >
            Buy Now <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PricingSection;
