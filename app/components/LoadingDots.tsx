import React from "react";
import { twMerge } from "tailwind-merge";

type LoadingDotsProps = {
  dotStyles?: string;
  className?: string;
};

const LoadingDots: React.FC<LoadingDotsProps> = ({
  dotStyles = "bg-surface-onSurfaceDisabled",
  className = "",
}) => {
  const animationStyle = `
    @keyframes pulseAnimation {
      0% { transform: scale(1.1); opacity: 0; }
      10% { opacity: 1; }
      100% { opacity: 0; }
    }
    .dot {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background-color: currentColor;
      animation: pulseAnimation 1.5s ease-in-out infinite;
    }
    .dot1 { animation-delay: 0.5s; }
    .dot2 { animation-delay: 0.75s; }
    .dot3 { animation-delay: 1s; }
  `;

  return (
    <>
      <style>{animationStyle}</style>
      <div
        className={twMerge(
          "inline-flex pt-2 flex-nowrap gap-2 pl-1",
          className,
        )}
      >
        <div className={twMerge("dot dot1", dotStyles)} />
        <div className={twMerge("dot dot2", dotStyles)} />
        <div className={twMerge("dot dot3", dotStyles)} />
      </div>
    </>
  );
};

export default LoadingDots;
