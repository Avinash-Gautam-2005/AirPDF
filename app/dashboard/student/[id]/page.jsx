import { getUser } from "../../../../actions/users";
import { getUserOrders } from "../../../../actions/orders";
import UserInfo from "./_components/userinfo";
import OrdersList from "./_components/OrdersList";
import DashboardStats from "./_components/DashboardStats";
import DashboardHeader from "./_components/DashboardHeader";
import QuickActions from "./_components/QuickActions";

export default async function StudentDashboardPage({ params }) {
  const user = await getUser();

  let orders = [];
  try {
    orders = await getUserOrders();
  } catch {
    orders = [];
  }

  // Calculate stats
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'PENDING').length,
    printing: orders.filter(o => o.status === 'PRINTING').length,
    completed: orders.filter(o => o.status === 'COMPLETED').length,
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-violet-50 via-background to-indigo-50 dark:from-violet-950/20 dark:via-background dark:to-indigo-950/20">
      {/* Animated Background Orbs */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Dashboard Header */}
      <DashboardHeader user={user} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* User Welcome Header */}
        <UserInfo user={user} />

        {/* Quick Actions */}
        <QuickActions />

        {/* Stats Cards */}
        <DashboardStats stats={stats} />

        {/* Orders Section */}
        <section className="mt-8" id="orders">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">
                Your{" "}
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Orders
                </span>
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Track all your print orders in one place
              </p>
            </div>
            {orders.length > 0 && (
              <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                {orders.length} {orders.length === 1 ? "order" : "orders"}
              </span>
            )}
          </div>

          <OrdersList orders={orders} />
        </section>
      </div>
    </div>
  );
}
