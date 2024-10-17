/* eslint-disable */

"use client";

import { useCallback, useEffect, useRef, forwardRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

const CanvasConfettiWrapper = forwardRef((props: any, ref: any) => (
  <ReactCanvasConfetti ref={ref} {...props} />
));

export default function Confetti() {
  const refAnimationInstance = useRef<((instance: any) => void) | null>(null);

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio: number, opts: any) => {
    if (typeof refAnimationInstance.current === "function") {
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.6 },
        particleCount: Math.floor(200 * particleRatio),
      });
    }
  }, []);

  useEffect(
    () => fire(),
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [],
  );

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  return (
    <CanvasConfettiWrapper
      refConfetti={getInstance}
      style={{
        position: "fixed",
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    />
  );
}
