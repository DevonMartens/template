/**
 * Function to truncate an address.
 *
 * @function    truncateAddress
 * @param       {string}          address
 * @param       {number}          start
 * @param       {number}          end
 * @returns     {string}          Truncated address
 */
export function truncateAddress(
  address: string,
  start: number = 6,
  end: number = 4,
): string {
  return address.slice(0, start) + "..." + address.slice(-end);
}
