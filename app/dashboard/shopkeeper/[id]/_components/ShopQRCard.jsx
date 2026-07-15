"use client";

import { useState } from "react";
import { generateShopQR } from "../../../../../actions/shopkeeper";
import { QrCode, Download, RefreshCw, Copy, Check } from "lucide-react";

export default function ShopQRCard({ shop }) {
  const [qrUrl, setQrUrl] = useState(shop?.qrCodeUrl || null);
  const [uploadUrl, setUploadUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const baseUrl = window.location.origin;
      const result = await generateShopQR(baseUrl);
      setQrUrl(result.qrCodeUrl);
      setUploadUrl(result.uploadUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!qrUrl) return;
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = `shop-qr-${shop?.id?.slice(0, 8)}.png`;
    link.click();
  };

  const handleCopy = async () => {
    const url = uploadUrl || `${window.location.origin}/shop/${shop?.id}/upload`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentUploadUrl = uploadUrl || (shop?.id ? `${typeof window !== "undefined" ? window.location.origin : ""}/shop/${shop.id}/upload` : "");

  return (
    <div className="relative rounded-2xl bg-background/80 backdrop-blur-sm border border-border p-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
            <QrCode className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Your Shop QR Code</h3>
            <p className="text-xs text-muted-foreground">Customers scan this to upload a print order</p>
          </div>
        </div>

        {/* QR Display */}
        <div className="flex flex-col items-center gap-4">
          {qrUrl ? (
            <div className="p-3 bg-white rounded-2xl shadow-lg border border-border">
              <img
                src={qrUrl}
                alt="Shop QR Code"
                width={200}
                height={200}
                className="rounded-xl"
              />
            </div>
          ) : (
            <div className="w-[200px] h-[200px] rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground bg-muted/30">
              <QrCode className="w-12 h-12 opacity-30" />
              <p className="text-xs text-center px-4">Generate your QR code to get started</p>
            </div>
          )}

          {/* Upload URL display */}
          {shop?.id && (
            <div className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-muted border border-border text-xs font-mono text-muted-foreground overflow-hidden">
              <span className="truncate flex-1">/shop/{shop.id.slice(0, 8)}…/upload</span>
              <button
                onClick={handleCopy}
                className="shrink-0 p-1 rounded hover:bg-background transition-colors"
                title="Copy full URL"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-green-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          )}

          {error && (
            <p className="text-xs text-red-500 text-center">{error}</p>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 w-full">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating…
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  {qrUrl ? "Regenerate" : "Generate QR"}
                </>
              )}
            </button>

            {qrUrl && (
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:bg-muted transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
