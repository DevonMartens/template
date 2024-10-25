"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAccount, useChains } from "wagmi";
import Nav from "@/app/components/Nav";
import { truncateAddress } from "@/app/helpers/truncateAddress";
import ClaimModal from "@/app/components/ClaimModal";
import { readContract } from "@wagmi/core";
import { MerkleAbi } from "@/abi/MerkleAbi";
import { addressAmountPairs } from "@/app/lib/addressAmountPairs";
import { config } from "@/config";
import { ContractFunctionExecutionError } from "viem";
import { twMerge } from "tailwind-merge";
import { token } from "./constants/token";

export default function Home() {
  const { isConnected, address } = useAccount();
  const chains = useChains();
  const [showClaimModal, setShowClaimModal] = useState(false);

  const [tokensAvailable, setTokensAvailable] = useState<string | null>(null);
  const [alreadyClaimed, setAlreadyClaimed] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const currentChain = chains[0].name;
  const noTokens = tokensAvailable === "0";
  const readableTokenValue = tokensAvailable
    ? (parseInt(tokensAvailable) / Math.pow(10, 18)).toLocaleString()
    : "0";

  useEffect(() => {
    const fetchTokenData = async () => {
      if (address && isConnected) {
        try {
          const selectedPair = addressAmountPairs.find((pair) => pair.address === address);

          if (selectedPair) {
            setTokensAvailable(selectedPair.amount);
            setError(null);
          } else {
            setTokensAvailable("0");
            setError("No claimable tokens.");
          }

          const contractAddress = process.env.NEXT_PUBLIC_MERKLE_CLAIM_ADDRESS;

          const hasClaimed = (await readContract(config, {
            address: contractAddress as `0x${string}`,
            abi: MerkleAbi,
            functionName: "claimed",
            args: [address],
          })) as boolean;

          setAlreadyClaimed(hasClaimed);
        } catch (err) {
          if (noTokens) {
            if (err instanceof ContractFunctionExecutionError) {
              setError("No claimable tokens.");
            } else {
              console.error("Error fetching token data", err);
              setError("An error occurred while fetching claim status.");
            }
          }
        }
      }
    };

    fetchTokenData();
  }, [address, isConnected, tokensAvailable, noTokens]);

  const handleClaim = () => {
    console.log("Coming soon!");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen max-h-screen p-8 pt-12 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Nav />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {isConnected ? (
            showClaimModal ? (
              <ClaimModal setShowClaimModal={setShowClaimModal} onClaim={handleClaim} />
            ) : (
              <div className="flex flex-col items-center space-y-2">
                {error ? (
                  <p>{error}</p>
                ) : tokensAvailable !== null ? (
                  <>
                    <p>
                      You have {readableTokenValue} {token} available.
                    </p>
                    <p>
                      {alreadyClaimed
                        ? "You have already claimed your tokens."
                        : "You have not claimed your tokens yet."}
                    </p>
                  </>
                ) : (
                  <p>Loading token data...</p>
                )}
                <button
                  className={twMerge(
                    `relative rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 overflow-hidden`,
                    noTokens || alreadyClaimed
                      ? "text-neutral-700 cursor-not-allowed"
                      : `cursor-pointer text-neutral-50 bg-black hover:bg-neutral-900`
                  )}
                  onClick={() => setShowClaimModal(true)}
                  disabled={noTokens || !!alreadyClaimed}
                >
                  Claim
                </button>

                <div className="flex flex-col items-center">
                  <small> Connected to {currentChain} </small>
                  <small> with {address && truncateAddress(address)} </small>
                </div>
              </div>
            )
          ) : (
            <w3m-connect-button loadingLabel="Loading..." label="Connect Wallet" />
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.amgistudios.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to amgistudios.com →
        </a>
      </footer>
    </div>
  );
}
