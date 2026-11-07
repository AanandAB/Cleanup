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
    <div className="min-h-screen bg-ice">
      <AdminSidebar />
      {/* `md:pl-64` clears the fixed desktop sidebar (w-60 = 15rem). On mobile
          the sidebar is a sticky top bar + drawer, so content just flows below. */}
      <main className="min-w-0 px-4 pb-12 pt-4 sm:px-6 md:pl-64 md:pr-8 md:pt-8">
        {children}
      </main>
    </div>
  );
}
