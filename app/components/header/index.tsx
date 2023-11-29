import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="w-100 max-w-[1024px] mr-auto ml-auto p-6 h-28 flex justify-between items-center">
      <div>
        <Link href="/">
          <Image
            src="/logo.png"
            width={230}
            height={200}
            alt="logo"
            className="object-fill"
          />
        </Link>
      </div>
      <button className="bg-green-400 text-neutral-900 text-lg cursor-pointer px-4 py-2 rounded-xl uppercase font-sans hover:bg-green-300">
        Login
      </button>
    </header>
  );
};

export default Header;
