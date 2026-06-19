"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  loading?: boolean;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  loading,
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          {loading ? (
            <div className="mt-2 h-7 w-24 animate-pulse rounded bg-muted" />
          ) : (
            <p className="mt-1 text-2xl font-semibold">{value}</p>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </CardContent>
    </Card>
  );
}
