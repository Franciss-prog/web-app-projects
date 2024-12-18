import Link from "next/link";
import React from "react";
import { DraftingCompass } from "lucide-react";
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-20 py-10 text-xl max-lg:text-lg">
      <Link href={"/"}><DraftingCompass className="text-5xl"/></Link>
      <section className="flex flex-row gap-28 max-lg:gap-20">
        <button>Coffee Menu</button>
        <button>About Us</button>
        <button>Best Selling</button>
        <Link href={'/auth'} className="bg-obsidian text-white py-4 rounded-2xl px-3">Buy Some Coffee</Link>
      </section>
    </nav>
  );
};

export default Navbar;
