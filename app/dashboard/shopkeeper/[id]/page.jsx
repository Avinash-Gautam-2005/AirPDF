import { getorders, getShopInfo } from '../../../../actions/shopkeeper';
import { getUser } from '../../../../actions/users';
import ShopQRCard from './_components/ShopQRCard';
import Shopinfo from './_components/shopinfo';
import ShopkeeperNavbar from './_components/ShopkeeperNavbar';
import ShopStats from './_components/ShopStats';
import { MapPin, Phone, Store } from 'lucide-react';

const ShopkeeperDashboard = async () => {
  const [orders, shop, user] = await Promise.all([
    getorders(),
    getShopInfo(),
    getUser(),
  ]);

  // Compute stats
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'PENDING').length,
    printing: orders.filter(o => o.status === 'PRINTING').length,
    completed: orders.filter(o => o.status === 'COMPLETED').length,
    cancelled: orders.filter(o => o.status === 'CANCELLED').length,
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-violet-50 via-background to-indigo-50 dark:from-violet-950/20 dark:via-background dark:to-indigo-950/20">
      {/* Background orbs */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Navbar */}
      <ShopkeeperNavbar shop={shop} user={user} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Store className="w-5 h-5 text-violet-500" />
              <span className="text-sm text-muted-foreground font-medium">Shop Dashboard</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                {shop?.name || 'My Shop'}
              </span>
            </h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
              {shop?.address && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {shop.address}
                </span>
              )}
              {shop?.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> {shop.phone}
                </span>
              )}
              <span className={`flex items-center gap-1.5 ${shop?.isActive ? 'text-green-600' : 'text-red-500'}`}>
                <span className={`w-2 h-2 rounded-full ${shop?.isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                {shop?.isActive ? 'Open for orders' : 'Shop closed'}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <ShopStats stats={stats} />

        {/* Main Grid — QR + Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* QR Code Card */}
          <div className="lg:col-span-1 space-y-4">
            <ShopQRCard shop={shop} />

            {/* Quick info card */}
            <div className="rounded-2xl bg-background/80 backdrop-blur-sm border border-border p-5">
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">How it works</h3>
              <ol className="space-y-3">
                {[
                  "Generate your QR code above",
                  "Print & display it at your shop counter",
                  "Customer scans → uploads PDF with specs",
                  "Order appears here instantly",
                  "Print → mark as Completed",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Orders Panel */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                Print{' '}
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Orders
                </span>
              </h2>
              {orders.length > 0 && (
                <span className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full border border-border">
                  {orders.length} total
                </span>
              )}
            </div>
            <Shopinfo orders={orders} shopId={shop?.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopkeeperDashboard;
