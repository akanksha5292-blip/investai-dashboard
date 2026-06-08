const memoryCache = new Map<string, { value: unknown; expiresAt: number }>();

export function getCached<T>(key: string): T | null {
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    memoryCache.delete(key);
    return null;
  }
  return entry.value as T;
}

export function setCache(key: string, value: unknown, ttlMinutes = 30) {
  memoryCache.set(key, {
    value,
    expiresAt: Date.now() + ttlMinutes * 60 * 1000,
  });
}

export function clearCache() {
  memoryCache.clear();
}

export function clearCacheKey(key: string) {
  memoryCache.delete(key);
}
