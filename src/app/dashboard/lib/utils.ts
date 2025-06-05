export function maskKey(key: string) {
  if (!key) return "";
  // Show first 6, mask the rest except last 4
  return (
    key.slice(0, 6) +
    "-" +
    "*".repeat(Math.max(0, key.length - 10)) +
    key.slice(-4)
  );
} 