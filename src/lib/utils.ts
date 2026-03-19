import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes safely, resolving conflicts.
 * Uses clsx for conditional logic + twMerge for deduplication.
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-violet-500", "px-6")
 * // → "py-2 bg-violet-500 px-6"  (px-4 removed by twMerge)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}