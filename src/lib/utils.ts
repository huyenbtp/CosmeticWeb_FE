import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function updateQueryParams(
  searchParams: URLSearchParams,
  updates: Record<string, string | number | null>
) {
  const params = new URLSearchParams(searchParams);

  Object.entries(updates).forEach(([key, value]) => {
    if (value === null || value === "") {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
  });

  return params.toString();
}

export function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeWords(str: string) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

export function getRoleName(role: string) {
  switch (role) {
    case "admin":
      return "Admin"
    case "warehouse_manager":
      return "Warehouse Manager"
    case "order_processing":
      return "Order Processing Staff"
    default:
      return ""
  }
}

export function getDaysBetweenTwoDates(firstDateInISO: string, secondDateInISO: string) {
  const startDate = new Date(firstDateInISO);
  const endDate = new Date(secondDateInISO);

  const firstDate = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const secondDate = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

  return Math.abs((firstDate - secondDate) / (24 * 60 * 60 * 1000));
}