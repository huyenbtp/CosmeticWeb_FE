import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const role = cookieStore.get("auth_role")?.value;

  if (!token) {
    redirect("/login");
  }

  if (role === "admin") {
    redirect("/admin/dashboard");
  } else if (role === "warehouse_manager") {
    redirect("/warehouse/dashboard");
  } else if (role === "order_processing") {
    redirect("/order-processing/dashboard");
  } else {
    // Nếu cookie bị lỗi hoặc role không hợp lệ
    redirect("/login");
  }
}
