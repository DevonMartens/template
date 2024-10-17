interface Input {
  internalType: string;
  name: string;
  type: string;
}

interface ErrorDefinition {
  inputs: Input[];
  name: string;
  type: string;
}

interface EventInput {
  indexed: boolean;
  internalType: string;
  name: string;
  type: string;
}

interface EventDefinition {
  anonymous: boolean;
  inputs: EventInput[];
  name: string;
  type: string;
}

interface Output {
  internalType: string;
  name: string;
  type: string;
  components?: Input[];
}

/**
 * Interface representing the definition of a function in a smart contract ABI.
 */
export interface FunctionDefinition {
  inputs: Input[];
  name: string;
  outputs?: Output[];
  stateMutability: string;
  type: string;
}

interface ContractDefinition {
  inputs?: Input[];
  stateMutability?: string;
  type: string;
  name?: string;
  outputs?: Output[];
}

/**
 * Type representing the various definitions in a smart contract ABI.
 */
type AbiData =
  | ContractDefinition
  | FunctionDefinition
  | EventDefinition
  | ErrorDefinition;

/**
 * ABI data for the NFTClaimable smart contract.
 * @type {AbiData[]}
 */
export const MerkleAbi: AbiData[] = [
  {
    inputs: [
      { internalType: "contract IERC20", name: "_token", type: "address" },
      { internalType: "bytes32", name: "_merkleRoot", type: "bytes32" },
      {
        internalType: "address",
        name: "_distributionAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "address", name: "claimant", type: "address" }],
    name: "AlreadyClaimed",
    type: "error",
  },
  { inputs: [], name: "InvalidProof", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "TransferFailed",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "claimant",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Claimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newDistributionAddress",
        type: "address",
      },
    ],
    name: "DistributionAddressUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "newMerkleRoot",
        type: "bytes32",
      },
    ],
    name: "MerkleRootUpdated",
    type: "event",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "bytes32[]", name: "merkleProof", type: "bytes32[]" },
    ],
    name: "claimTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "claimed",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "distributionAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "merkleRoot",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newDistributionAddress",
        type: "address",
      },
    ],
    name: "updateDistributionAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "newMerkleRoot", type: "bytes32" },
    ],
    name: "updateMerkleRoot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
