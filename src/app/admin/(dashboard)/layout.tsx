import { requireAdmin } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

/** Guarded admin shell — every /admin/* dashboard route goes through here. */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin(); // redirects to /admin/login when no session

  return (
    <div className="flex min-h-screen bg-ice">
      <AdminSidebar />
      <main className="min-w-0 flex-1 p-5 md:p-8">{children}</main>
    </div>
  );
}
