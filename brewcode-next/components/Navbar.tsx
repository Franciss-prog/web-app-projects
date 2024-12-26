import React, { FC } from "react";
import { CodeXml, AlignRight } from "lucide-react";
import Link from "next/link";
import { NavbarProps } from "@/types/type";

const Navbar: FC<NavbarProps> = ({ scroll }) => {
  return (
    <nav className="flex flex-row items-center justify-between px-20 py-10 max-md:px-10 ">
      {/* logo */}
      <Link href={"/"}>
        <CodeXml />
      </Link>
      {/* Navigations */}
      <section className="flex flex-row gap-20 max-md:hidden">
        <button
          className="outline-none hover:underline"
          onClick={() => scroll("home")}
        >
          Home
        </button>

        <button
          className="outline-none hover:underline"
          onClick={() => scroll("about")}
        >
          About
        </button>
        <button
          className="outline-none hover:underline"
          onClick={() => scroll("selling")}
        >
          Best Selling
        </button>
      </section>

      {/* responsive navigations */}
      <section className=" flex-row gap-20 hidden max-md:flex">
        <button>
          <AlignRight />
        </button>
      </section>
    </nav>
  );
};

export default Navbar;
