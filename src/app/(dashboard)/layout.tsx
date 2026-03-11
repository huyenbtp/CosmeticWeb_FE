"use client";

import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { useRouter, usePathname } from "next/navigation";
import { getRole } from "@/lib/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState<"admin" | "warehouse_manager" | "order_processing" | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedRole = getRole() as
      | "admin"
      | "warehouse_manager"
      | "order_processing"
      | null;
    if (!savedRole) {
      router.push("/login");
    } else {
      setRole(savedRole);
    }
    console.log("saved role: " + savedRole)
  }, [router]);

  useEffect(() => {
    console.log("Route changed to:", pathname)
  }, [pathname])

  if (!role) return null;

  return (
    <div className="flex h-screen">
      <DashboardSidebar role={role} />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 h-full overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
