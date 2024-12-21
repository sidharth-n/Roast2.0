const NAMES = {
  roasters: ["Mike", "Sarah", "Alex", "Emma", "Chris"],
  targets: ["John", "Jane", "Bob", "Alice", "Tom"]
} as const;

type NameType = keyof typeof NAMES;

export const getRandomName = (type: NameType): string => {
  const names = NAMES[type];
  return names[Math.floor(Math.random() * names.length)];
};