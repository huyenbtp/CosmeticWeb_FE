"use client";

export function clearAuth() {
  document.cookie = `access_token=; Max-Age=0; path=/`;
  document.cookie = `refresh_token=; Max-Age=0; path=/`;
  document.cookie = `auth_role=; Max-Age=0; path=/`;
}

export function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export function isLoggedIn(): boolean {
  return !!getCookie("access_token");
}

export function getRole(): string | null {
  return getCookie("auth_role");
}
