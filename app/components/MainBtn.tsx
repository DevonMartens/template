import React from "react";
import { twMerge } from "tailwind-merge";

type HooliganButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  disabled?: boolean;
  className?: string;
  innerText: string | JSX.Element;
};

const MainBtn: React.FC<HooliganButtonProps> = ({
  onClick,
  disabled = false,
  className,
  innerText,
}) => {
  return (
    <button
      className={twMerge(
        "rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-24",
        // "bg-gradient-to-r from-purple-950 via-blue-950 to-green-950",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {innerText}
    </button>
  );
};

export default MainBtn;
