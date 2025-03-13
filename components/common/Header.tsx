import React from "react";
import NavLink from "./nav-link";
import { FileText } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
const Header = () => {
  const isLoggedIn = false;
  return (
    <nav className="container flex items-center justify-between mt-2">
      <div>
        <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <FileText className="w-5 h-5 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="font-extrabold lg:text-xl text-gray-700">
            Summary
          </span>
        </NavLink>
      </div>
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href="/#pricing">pricing</NavLink>
        <SignedIn>
          <NavLink href="/dashboard">Your Summaries</NavLink>
        </SignedIn>
      </div>

      <div className="flex gap-4 lg:gap-12 lg:justify-center">
        <SignedIn>
          <div className="flex gap-2 items-center my-auto">
            <NavLink href="/upload">Upload a PDF</NavLink>
            <div>Pro</div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>
        <SignedOut>
          <div>
            <NavLink href="/sign-in">Sign in</NavLink>
          </div>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Header;
