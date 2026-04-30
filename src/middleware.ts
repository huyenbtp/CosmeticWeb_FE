import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Các route yêu cầu role cụ thể
const roleRoutes = {
  admin: ["/admin"],
  warehouse_manager: ["/warehouse"],
  order_processing: ["/order-processing"],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const role = req.cookies.get("auth_role")?.value;

  const { pathname } = req.nextUrl;

  // Nếu chưa đăng nhập
  if (!token) {
    if (pathname.startsWith("/login")) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ Nếu vào "/admin" → tự redirect sang "/admin/dashboard"
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // ✅ Nếu vào "/warehouse" → tự redirect sang "/warehouse/dashboard"
  if (pathname === "/warehouse") {
    return NextResponse.redirect(new URL("/warehouse/dashboard", req.url));
  }

  // ✅ Nếu vào "/order-processing" → tự redirect sang "/order-processing/dashboard"
  if (pathname === "/order-processing") {
    return NextResponse.redirect(new URL("/order-processing/dashboard", req.url));
  }

  // Nếu đăng nhập nhưng vào nhầm role
  if (role === "admin" && !pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  if (role === "warehouse_manager" && !pathname.startsWith("/warehouse")) {
    return NextResponse.redirect(new URL("/warehouse/dashboard", req.url));
  }

  if (role === "order_processing" && !pathname.startsWith("/order-processing")) {
    return NextResponse.redirect(new URL("/order-processing/dashboard", req.url));
  }

  // Nếu đã login và truy cập /login → chuyển sang dashboard đúng role
  if (pathname.startsWith("/login")) {
    const redirectUrl =
      role === "admin"
        ? "/admin/dashboard"
        : role === "warehouse_manager"
          ? "/warehouse/dashboard"
          : "/order-processing/dashboard";
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  return NextResponse.next();
}

// Áp dụng middleware cho tất cả các route
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
