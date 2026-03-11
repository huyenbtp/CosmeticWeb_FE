"use client";

export function clearAuth() {
  document.cookie = `auth_token=; Max-Age=0; path=/`;
  document.cookie = `auth_role=; Max-Age=0; path=/`;
}

export function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export function isLoggedIn(): boolean {
  return !!getCookie("auth_token");
}

export function getRole(): string | null {
  return getCookie("auth_role");
}
