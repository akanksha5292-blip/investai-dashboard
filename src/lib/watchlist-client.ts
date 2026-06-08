import type { WatchlistItem } from "@/types";

const STORAGE_KEY = "investai-watchlist";

export function getWatchlist(): WatchlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WatchlistItem[]) : [];
  } catch {
    return [];
  }
}

export function saveWatchlist(items: WatchlistItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addToWatchlist(
  item: Omit<WatchlistItem, "id" | "addedAt">
): WatchlistItem {
  const items = getWatchlist();
  const newItem: WatchlistItem = {
    ...item,
    id: Date.now(),
    addedAt: new Date().toISOString(),
  };
  items.unshift(newItem);
  saveWatchlist(items);
  return newItem;
}

export function removeFromWatchlist(id: number) {
  const items = getWatchlist().filter((item) => item.id !== id);
  saveWatchlist(items);
}
