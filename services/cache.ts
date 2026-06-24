type CacheEntry<T> = {
  expiresAt: number;
  promise?: Promise<T>;
  value?: T;
};

const cache = new Map<string, CacheEntry<unknown>>();
const DEFAULT_TTL_MS = 60_000;

export function cachedRequest<T>(
  key: string,
  fetcher: () => Promise<T>,
  fallback: T,
  ttlMs = DEFAULT_TTL_MS,
): Promise<T> {
  const now = Date.now();
  const current = cache.get(key) as CacheEntry<T> | undefined;

  if (current?.value && current.expiresAt > now) {
    return Promise.resolve(current.value);
  }

  if (current?.promise) {
    return current.promise;
  }

  const promise = fetcher()
    .catch(() => fallback)
    .then((value) => {
      cache.set(key, {
        value,
        expiresAt: Date.now() + ttlMs,
      });
      return value;
    });

  cache.set(key, {
    promise,
    expiresAt: now + ttlMs,
  });

  return promise;
}
