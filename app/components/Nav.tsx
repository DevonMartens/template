"use client";

import Link from "next/link";
import Image from "next/image";
import { useDisconnect, useAccount } from "wagmi";
import logo from "@/public/logo.png";

const Nav: React.FC = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <nav className="max-w-dvw min-w-full">
      <div className="flex justify-between items-center">
        <Link href={"/"} className="z-40 mr-auto">
          <Image
            src={logo}
            width={120}
            height={120}
            priority
            alt="logo"
            className="min-w-[60px] md:min-w-[120px]"
          />
        </Link>
        {isConnected && (
          <button
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            onClick={handleDisconnect}
          >
            Disconnect
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
