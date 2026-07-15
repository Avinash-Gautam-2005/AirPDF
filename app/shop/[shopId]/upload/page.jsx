import { redirect } from 'next/navigation';
import { auth } from '../../../../lib/auth';
import prisma from '../../../../lib/prisma';
import UploadForm from './_components/UploadForm';
import { Store, MapPin, Phone } from 'lucide-react';
import { findshopbyid } from '../../../../actions/shopkeeper';

export default async function ShopUploadPage({ params }) {
  const { shopId } = await params;

  // Fetch shop info (public — no auth needed to see the shop page)
  const shop = await findshopbyid(shopId)

  if (!shop || !shop.isActive) {
    redirect('/');
  }

  // Check auth — needed to create an order
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-background to-indigo-50 dark:from-violet-950/20 dark:via-background dark:to-indigo-950/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative z-10 w-full max-w-lg mx-auto px-4 py-12">
        {/* Shop Info Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium mb-4">
            <Store className="w-4 h-4" />
            Print Order
          </div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              {shop.name}
            </span>
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            {shop.address && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {shop.address}
              </span>
            )}
            {shop.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                {shop.phone}
              </span>
            )}
          </div>
        </div>

        {/* Upload Form */}
        <UploadForm
          shopId={shop.id}
          shopName={shop.name}
          isLoggedIn={isLoggedIn}
          userId={session?.user?.id || null}
          callbackUrl={`/shop/${shopId}/upload`}
        />
      </div>
    </div>
  );
}
