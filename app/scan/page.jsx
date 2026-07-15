"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Html5QrcodeScanner } from "html5-qrcode";
import { ArrowLeft } from "lucide-react";

export default function ScanPage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize scanner
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      },
      false
    );

    scanner.render(
      (decodedText) => {
        // On successful scan
        
        // Validate URL roughly to ensure it's our shop link
        if (decodedText.includes("/shop/") && decodedText.includes("/upload")) {
            scanner.clear();
            window.location.href = decodedText;
        } else {
          setError("Invalid QR Code. Please scan a valid shop QR code.");
        }
      },
      (errorMessage) => {
        // Ignore normal frame errors
      }
    );

    // Cleanup on unmount
    return () => {
      scanner.clear().catch(console.error);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-violet-50 via-background to-indigo-50 dark:from-violet-950/20 dark:via-background dark:to-indigo-950/20 py-8 px-4">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-md mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => router.back()} 
            className="p-2 bg-background/50 hover:bg-background/80 border border-border backdrop-blur-sm rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Scan Shop QR
            </h1>
            <p className="text-sm text-muted-foreground">Point your camera at the shop's code</p>
          </div>
        </div>

        {/* Scanner Container */}
        <div className="bg-background/80 backdrop-blur-sm border border-border rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="relative z-10">
                {/* The html5-qrcode library will inject UI into this div */}
                <div id="qr-reader" className="w-full rounded-2xl overflow-hidden [&_video]:rounded-xl [&_button]:mt-4 [&_button]:px-4 [&_button]:py-2 [&_button]:bg-violet-600 [&_button]:text-white [&_button]:rounded-lg [&_button]:font-medium [&_a]:hidden" />
                
                {error && (
                  <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400 text-center">
                      {error}
                  </div>
                )}
            </div>
        </div>
        
        {/* Instructions */}
        <div className="mt-8 text-center text-sm text-muted-foreground bg-background/50 backdrop-blur-sm p-4 rounded-xl border border-border">
          <p>Scan the QR code displayed at the stationary shop to quickly upload and print your documents.</p>
        </div>
      </div>
    </div>
  );
}
