export default function getConfig(config: any, key?: string): any | null {
  if (key === null) return config;

  let current = config;
  key.trim().split('.').forEach((token) => {
    current = current[token];
  });

  return current;
}
