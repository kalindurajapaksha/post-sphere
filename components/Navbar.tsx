"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="container flex items-center justify-between py-24 pb-10">
      <Link href="/" className="lg:flex-1 text-3xl font-extrabold  font-serif">
        PostSphere
      </Link>
      {pathname === "/" && <SearchBar />}
      <div className="lg:flex-1 flex justify-end">
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
