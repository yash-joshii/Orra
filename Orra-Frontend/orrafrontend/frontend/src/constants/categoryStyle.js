import { Laptop, Camera, Gamepad2, Plane, Headphones, Tv } from "lucide-react";

// Fixed pool — order doesn't matter, and you can add more entries any time
// without breaking previously-assigned icons for existing categories.
const ICON_POOL = [
  { icon: Laptop, iconBg: "bg-indigo-100", iconColor: "text-indigo-600" },
  { icon: Camera, iconBg: "bg-sky-100", iconColor: "text-sky-600" },
  { icon: Gamepad2, iconBg: "bg-violet-100", iconColor: "text-violet-600" },
  { icon: Plane, iconBg: "bg-sky-100", iconColor: "text-sky-500" },
  { icon: Headphones, iconBg: "bg-amber-100", iconColor: "text-amber-600" },
  { icon: Tv, iconBg: "bg-rose-100", iconColor: "text-rose-600" },
];

// Simple string hash -> stable index into ICON_POOL.
// Same category name always resolves to the same icon/color.
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // force 32-bit int
  }
  return Math.abs(hash);
}

// "GAMING_CONSOLE" -> "Gaming Console"
export function formatCategoryLabel(category) {
  return category
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getCategoryStyle(category) {
  const index = hashString(category) % ICON_POOL.length;
  return ICON_POOL[index];
}