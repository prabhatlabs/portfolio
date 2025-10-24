"use client";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { navData } from "@/data/nav";
import { contactLinks } from "@/data/pages";
import Link from "next/link";
import { Fragment, useState } from "react";
import { BiWorld } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { TbMenu, TbSquareLetterPFilled } from "react-icons/tb";
import { ThemeToggle } from "./ui/ThemeToggle";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const NavBar = () => {
  const topContactLink = [contactLinks.twitter,  contactLinks.mail]
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full bg-background px-4">
      <nav className="flex justify-between items-center gap-2 lg:gap-4">
        {/* bigger screens */}
        <div className="hidden md:flex flex-1 gap-2 lg:gap-4 xl:gap-5 items-center h-14 py-4">
          {/* logo */}
          <Link
            href="/"
            className="hover:border-b border-muted-foreground transition-colors font-good-mono"
          >
            {/* {navData.title} */}
            <TbSquareLetterPFilled className="size-6" />
          </Link>

          {/* nav links */}
          {navData.navItems.map((item, i) => (
            <Link
              key={i}
              href={item.url}
              target={item.target}
              className="hover:border-b border-muted-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <Button
          variant={"ghost"}
          className="px-0 py-0 has-[>svg]:px-0 [&_svg:not([class*='size-'])]:size-5 flex md:hidden"
          onClick={() => setIsMenuOpen((p) => !p)}
        >
          {isMenuOpen ? <IoClose /> : <TbMenu />}
          <span className="text-lg">Menu</span>
        </Button>

        <div className="flex flex-1 justify-end gap-1 md:gap-2 items-center h-14 py-4">
          {topContactLink.map((link, i) => (
            <Fragment key={i}>
              <Link href={link.url} target={link.target} title={link.name}>
                <Button size="icon" variant={"ghost"}>
                  {link.icon ? (
                    <link.icon className="size-5" />
                  ) : (
                    <BiWorld className="size-5" />
                  )}
                </Button>
              </Link>
              <Separator orientation="vertical" />
            </Fragment>
          ))}
          <ThemeToggle />
        </div>
      </nav>
      
      {/* smaller screens */}
      <div className={`md:hidden absolute z-50 top-full left-0 p-4 flex flex-col gap-2 h-[calc(100dvh-50px)] w-full bg-background
        ${
          isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        } transition-all duration-150 ease-in-out`}>
        <Link href="/" className="text-2xl font-semibold mb-4">
          {navData.title}
        </Link>

        {/* nav links */}
        {navData.navItems.map((item, i) => (
          <Link
            key={i}
            href={item.url}
            target={item.target}
            className="text-xl font-semibold"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
