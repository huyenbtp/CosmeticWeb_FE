"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTheme } from 'next-themes'
import { Moon, Sun } from "lucide-react";
import authApi from "@/lib/api/auth.api";
import { UserRole } from "@/lib/api/staff.api";

export default function LoginPage() {
  const { theme, setTheme } = useTheme()
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) return;
    setLoading(true);

    try {
      const res = await authApi.login({ email, password });

      const { user, profile } = res;

      localStorage.setItem("auth_user", JSON.stringify(user));
      localStorage.setItem("auth_profile", JSON.stringify(profile));

      const link = (role: UserRole) => {
        switch (role) {
          case "admin":
            return "admin"
          case "warehouse_manager":
            return "warehouse"
          case "order_processing":
            return "order-processing"
          default:
            return ""
        }
      };

      router.push(`/${link}/dashboard`);
    } catch (error: any) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted">
      {/** 
        <button
          className="rounded-full p-2.5 hover:bg-accent cursor-pointer absolute top-3 right-6"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme == "light"
            ? <Sun className="w-4 h-4" />
            : <Moon className="w-4 h-4" />
          }
        </button>
      */}
      <Card className="w-[400px]">
        <CardContent className="px-8 py-4 flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center mb-4">Login to your account</h1>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 pl-4 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 pl-4 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <Button
            className="w-full"
            onClick={handleLogin}
            disabled={loading || !email.trim() || !password.trim()}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}