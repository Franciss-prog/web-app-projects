"use client";

import React, { useState } from "react";
import { Coffee, AlignLeft } from "lucide-react";
import Link from "next/link";
const Navbar = () => {
  const [navToggle, setNavToggle] = useState(false);
  return (
    <nav className="bg-coffee flex max-w-full items-center justify-between px-20 py-10">
      <Link href="/" className="text-6xl font-bold">
        <Coffee />
      </Link>
      <div className="relative flex flex-col items-end gap-3">
        <button
          className=" w-fit rounded-md border border-white p-1 outline-none transition-all hover:bg-white hover:text-[#6F4E37]"
          onClick={() => setNavToggle(!navToggle)}
        >
          <AlignLeft />
        </button>
        <div
          className={`${
            navToggle ? "block" : "hidden"
          } absolute top-12 flex flex-col gap-4 border border-white px-4 py-2`}
        >
          <Link href="/auth">Login</Link>
          <Link href="/auth/register">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
