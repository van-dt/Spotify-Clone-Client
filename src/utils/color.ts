export const getRandomColor = () => {
  const r = Math.floor(Math.random() * 156) + 100; // 100-255
  const g = Math.floor(Math.random() * 156) + 100; // 100-255
  const b = Math.floor(Math.random() * 156) + 100; // 100-255
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};
