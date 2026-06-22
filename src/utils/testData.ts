export function isAscending(arr: number[]): boolean {
  return arr.every((val, i) => i === 0 || arr[i - 1] <= val);
}
 
/** Returns true if the array is sorted in descending numeric order. */
export function isDescending(arr: number[]): boolean {
  return arr.every((val, i) => i === 0 || arr[i - 1] >= val);
}
 
/** Generates a random string, useful for unique test data (emails, usernames). */
export function randomString(length = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}
 
/** Simple sleep helper — use sparingly, prefer Playwright's auto-waiting. */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}