/**
 * Replaces the domain of an image URL from "gateway.pinata" to "amgi.mypinata".
 *
 * @param {string} url - The original image URL.
 * @returns {string} - The updated image URL with the new domain.
 */
export const replaceImageDomain = (url: string) => {
  return url.replace("gateway.pinata", "amgi.mypinata");
};
