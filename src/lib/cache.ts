import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

const memoryCache = new Map<string, CacheEntry<unknown>>();

const DEFAULT_TTL_MS = 15 * 60 * 1000;
const CACHE_DIR = path.join(process.cwd(), "data", "cache");

const getCacheFilePath = (key: string) => {
  const hash = crypto.createHash("sha1").update(key).digest("hex");
  return path.join(CACHE_DIR, `${hash}.json`);
};

const readFileCache = async <T>(key: string): Promise<CacheEntry<T> | null> => {
  try {
    const filePath = getCacheFilePath(key);
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content) as CacheEntry<T>;
  } catch {
    return null;
  }
};

const writeFileCache = async <T>(key: string, entry: CacheEntry<T>) => {
  await fs.mkdir(CACHE_DIR, { recursive: true });
  const filePath = getCacheFilePath(key);
  await fs.writeFile(filePath, JSON.stringify(entry), "utf-8");
};

export const getCached = async <T>(
  key: string,
  generator: () => Promise<T> | T,
  ttlMs = DEFAULT_TTL_MS
): Promise<T> => {
  const now = Date.now();
  const memory = memoryCache.get(key) as CacheEntry<T> | undefined;
  if (memory && memory.expiresAt > now) {
    return memory.value;
  }

  const disk = await readFileCache<T>(key);
  if (disk && disk.expiresAt > now) {
    memoryCache.set(key, disk as CacheEntry<unknown>);
    return disk.value;
  }

  const value = await Promise.resolve(generator());
  const entry = { value, expiresAt: now + ttlMs } satisfies CacheEntry<T>;
  memoryCache.set(key, entry as CacheEntry<unknown>);
  await writeFileCache(key, entry);
  return value;
};
