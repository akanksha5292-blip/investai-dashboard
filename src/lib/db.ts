// Re-exports cache functions (in-memory, works on serverless hosts like Vercel)
export { getCached, setCache } from "./cache";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function saveAnalysis(type: string, symbol: string | null, data: unknown) {
  void type;
  void symbol;
  void data;
}
