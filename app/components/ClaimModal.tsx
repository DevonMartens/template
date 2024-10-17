"use client";

import React, { useState, useEffect } from "react";
import MainBtn from "@/app/components/MainBtn";
import LoadingDots from "@/app/components/LoadingDots";
import Confetti from "@/app/components/Confetti";
import { useAccount } from "wagmi";
import { claimTokens } from "@/app/helpers/claimTokens";
import { addressAmountPairs } from "@/app/lib/addressAmountPairs";
import { token } from "@/app/constants/token";

interface ModalProps {
  setShowClaimModal: (show: boolean) => void;
  onClaim: () => void;
}

const ClaimModal: React.FC<ModalProps> = ({ setShowClaimModal, onClaim }) => {
  const { address } = useAccount();
  const [claiming, setClaiming] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [claimAmount, setClaimAmount] = useState<string | null>(null);

  useEffect(() => {
    if (address) {
      const selectedPair = addressAmountPairs.find(
        (pair) => pair.user === address,
      );

      if (selectedPair) {
        setClaimAmount(selectedPair.amount);
      } else {
        setClaimAmount("0");
      }
    }
  }, [address]);

  const handleClaim = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setClaiming(true);
    try {
      if (claimAmount && claimAmount !== "0") {
        await claimTokens(claimAmount);
        setSuccess(true);
        onClaim();
        setFailed(false);
      } else {
        throw new Error("No tokens available to claim.");
      }
    } catch (error) {
      setFailed(true);
      setSuccess(false);
      console.error("Failed to claim tokens:", error);
    } finally {
      setClaiming(false);
    }
  };

  const handleCloseModal = () => {
    if (!claiming) {
      setShowClaimModal(false);
    }
  };

  const readableClaimAmount =
    claimAmount !== "0" && claimAmount !== null
      ? (parseInt(claimAmount) / Math.pow(10, 18)).toLocaleString()
      : "0";

  return (
    <div className="flex p-4 mt-5 min-w-fit">
      <div className="relative flex flex-col items-center z-10 sm:px-5 hide-scrollbar overflow-hidden w-full">
        <div className="text-hooli text-center mb-5 px-5 pt-12">
          <p>
            {claimAmount !== "0" && claimAmount !== null
              ? `You are about to claim ${readableClaimAmount} ${token}`
              : "No claimable tokens"}
          </p>
        </div>

        <div className="flex justify-between space-x-6">
          <MainBtn
            onClick={handleClaim}
            disabled={claiming || success || failed || claimAmount === "0"}
            innerText={
              claiming ? (
                <>
                  <span>Claiming</span>
                  <LoadingDots />
                </>
              ) : success ? (
                <>
                  <span className={``}>Claimed!</span>
                  <Confetti />
                </>
              ) : failed ? (
                "Error"
              ) : (
                "Claim Now"
              )
            }
          />
          <MainBtn
            disabled={claiming}
            onClick={handleCloseModal}
            innerText="Back"
          />
        </div>
      </div>
    </div>
  );
};

export default ClaimModal;
