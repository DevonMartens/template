/* eslint-disable @typescript-eslint/no-explicit-any */

interface EIP1193Provider {
  request: (request: { method: string; params?: Array<any> }) => Promise<any>;
}

interface Window {
  ethereum: EIP1193Provider;
}
