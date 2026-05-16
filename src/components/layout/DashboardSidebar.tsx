"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Archive,
  Percent,
  Bell,
  Home,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
  Grid2X2,
  BadgeCheck,
  UserLock,
  UserStar,
  Settings2,
  Handbag,
  ShoppingBasket,
  Tags,
  BookOpen,
  ArrowDownToLine,
  ArrowUpToLine,
  BarChart3,
  Star,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarItem {
  href?: string;
  label: string;
  icon: LucideIcon;
  children?: SidebarItem[]; // submenu
}

interface DashboardSidebarProps {
  role: "admin" | "warehouse_manager" | "order_processing";
}

const navigationItems = {
  admin: [
    { href: "/admin/dashboard", label: "Dashboard", icon: Home },
    {
      label: "Master Data",
      icon: BookOpen,
      children: [
        { href: "/admin/products", label: "Products", icon: Package },
        { href: "/admin/categories", label: "Categories", icon: Grid2X2 },
        { href: "/admin/brands", label: "Brands", icon: BadgeCheck },
        { href: "/admin/skin-types", label: "Skin Types", icon: Grid2X2 },
        { href: "/admin/tags", label: "Tags", icon: Tags },
      ],
    },
    {
      label: "Inventory",
      icon: Archive,
      children: [
        { href: "/admin/inventory/import-history", label: "Import", icon: ArrowDownToLine },
        { href: "/admin/inventory/export-history", label: "Export", icon: ArrowUpToLine },
        { href: "/admin/inventory/batches", label: "Batches", icon: Package },
      ],
    },
    {
      label: "Sales",
      icon: Handbag,
      children: [
        { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
        { href: "/admin/customers", label: "Customers", icon: UserStar },
        { href: "/admin/feedbacks", label: "Feedbacks", icon: Star },
      ],
    },
    //{ href: "/admin/discount-codes", label: "Discounts", icon: Percent },
    { href: "/admin/staffs", label: "Staffs", icon: Users },
    {
      label: "Reports",
      icon: BarChart3,
      children: [
        { href: "/admin/reports/sales-analysis", label: "Sales Analysis", icon: TrendingUp },
        { href: "/admin/reports/stock", label: "Stock Overview", icon: Archive },
      ],
    },
  ],
  warehouse_manager: [
    { href: "/warehouse/dashboard", label: "Dashboard", icon: Home },
  ],
  order_processing: [
    { href: "/order-processing/dashboard", label: "Dashboard", icon: Home },
  ],
};

export default function DashboardSidebar({ role }: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const items = navigationItems[role];
  const pathname = usePathname();

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label]
    );
  };

  const renderMenuItem = (item: SidebarItem) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;;
    const isOpen = openMenus.includes(item.label);

    if (!hasChildren) {
      const isActive = pathname.startsWith(item.href ?? "");
      return (
        <Link
          key={item.href}
          href={item.href!}
          className={cn(
            "flex items-center gap-4 h-12 px-3 rounded-lg transition-colors",
            isActive
              ? "bg-sidebar-active text-sidebar-active-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-hover-foreground"
          )}
        >
          <div className="w-6 h-6 flex-shrink-0 flex justify-center items-center">
            <Icon className="w-5 h-5" />
          </div>

          {!isCollapsed && <span className="text-truncate">{item.label}</span>}
        </Link>
      );
    }

    return (
      <div key={item.label}>
        <button
          onClick={() => toggleMenu(item.label)}
          className={cn(
            "w-full flex items-center gap-4 h-12 px-3 rounded-lg transition-colors",
            "text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-hover-foreground"
          )}
        >
          <div className="w-6 h-6 flex-shrink-0 flex justify-center items-center">
            <Icon className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left text-truncate">{item.label}</span>
              <ChevronRight
                style={{
                  transform: isOpen ? "rotate(90deg)" : "rotate(0)",
                  transition: "transform 200ms ease-in-out",
                }}
              />
            </>
          )}
        </button>

        {/* Sub menu */}
        {isOpen && !isCollapsed && (
          <div className="mt-1 space-y-1">
            {item.children!.map((sub) => {
              const SubIcon = sub.icon;
              const isActive = pathname.startsWith(sub.href!);
              return (
                <Link
                  key={sub.href}
                  href={sub.href!}
                  className={cn(
                    "flex items-center gap-4 h-12 pl-6 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-sidebar-active text-sidebar-active-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-hover-foreground"
                  )}
                >
                  <div className="w-6 h-6 flex-shrink-0 flex justify-center items-center">
                    <SubIcon className="w-5 h-5" />
                  </div>
                  <span className="text-truncate">{sub.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={cn(
        "bg-sidebar border-r transition-all duration-300 flex-shrink-0 overflow-y-auto",
        isCollapsed ? "w-20" : "w-65"
      )}
      style={{ minHeight: "100vh", paddingBottom: 50 }}
    >
      <div className="p-4">
        <div
          className={cn(
            "flex items-center mb-10",
            isCollapsed ? "justify-center" : "justify-between"
          )}
        >
          {!isCollapsed && <span className="text-2xl font-semibold ml-3">Hello</span>}
          <button
            className="rounded-full p-2.5 hover:bg-sidebar-hover"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed
              ? <ChevronRight className="w-5 h-5 text-primary" />
              : <ChevronLeft className="w-5 h-5 text-primary" />
            }
          </button>
        </div>

        <nav className="space-y-2">
          {items.map((item) => renderMenuItem(item))}
        </nav>
      </div>
    </aside>
  );
}
