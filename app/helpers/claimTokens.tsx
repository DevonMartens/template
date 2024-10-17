import { keccak256, Contract, BigNumberish, ethers } from "ethers";
import { writeContract } from "@wagmi/core";
import { MerkleAbi } from "@/abi/MerkleAbi";
import { MerkleTree } from "merkletreejs";
import { addressAmountPairs } from "@/app/lib/addressAmountPairs";
import { config } from "@/config";

export async function claimTokens(amount: BigNumberish): Promise<void> {
  try {
    const contractAddress = process.env.NEXT_PUBLIC_MERKLE_CLAIM_ADDRESS;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const user = await signer.getAddress();

    const abiCoder = new ethers.AbiCoder();

    const hashAddressAmountPair = (
      user: string,
      amount: BigNumberish,
    ): string => {
      const encoded = abiCoder.encode(["address", "uint256"], [user, amount]);
      return keccak256(encoded);
    };
    const selectedPair = addressAmountPairs.find((pair) => pair.user === user);
    if (!selectedPair) {
      throw new Error(`User ${user} not found in AddressAmountPairs`);
    }

    const contract = new Contract(
      contractAddress as `0x${string}`,
      MerkleAbi,
      signer,
    );

    const merkleRoot = await contract.merkleRoot();
    console.log("merkleRoot (from contract):", merkleRoot);

    const leafNodes = addressAmountPairs.map((pair) =>
      hashAddressAmountPair(pair.user, pair.amount),
    );
    console.log("leafNodes", leafNodes);

    const merkleTree = new MerkleTree(leafNodes, keccak256, {
      sortPairs: true,
    });

    console.log("merkleTree (on frontend):", merkleTree.toString());

    const leaf = hashAddressAmountPair(user, amount);

    console.log("leaf (generated):", leaf);

    const proof = merkleTree.getHexProof(leaf);
    console.log("proof (generated):", proof);

    const generatedRoot = "0x" + merkleTree.getRoot().toString("hex");
    console.log("generatedRoot (from frontend):", generatedRoot);

    if (generatedRoot !== merkleRoot) {
      throw new Error("Merkle root mismatch between contract and frontend.");
    }

    if (!proof.length) {
      throw new Error(
        "Proof generation failed. The user may not be part of the Merkle tree.",
      );
    }

    await writeContract(config, {
      address: contractAddress as `0x${string}`,
      abi: MerkleAbi,
      functionName: "claimTokens",
      args: [amount, proof],
    });

    console.log(`Successfully claimed ${amount.toString()} tokens for ${user}`);
  } catch (error) {
    console.error("Error claiming tokens:", error);
    throw error;
  }
}
