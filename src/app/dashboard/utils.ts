export function maskKey(key: string) {
  if (!key) return "";
  return key.slice(0, 4) + "-" + "*".repeat(Math.max(0, key.length - 8)) + key.slice(-4);
} 