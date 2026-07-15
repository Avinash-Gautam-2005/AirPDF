"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createOrder } from "../../../../../actions/orders";
import {
  Upload, FileText, X, Loader2, CheckCircle2,
  Printer, Palette, BookOpen, RotateCcw, Hash, LogIn
} from "lucide-react";

export default function UploadForm({ shopId, shopName, isLoggedIn, userId, callbackUrl }) {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [specs, setSpecs] = useState({
    copies: 1,
    colorMode: "BW",
    pageRange: "",
    doubleSided: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // ── File Handling ──────────────────────────────────────────
  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type === "application/pdf") {
      setFile(dropped);
      setError(null);
    } else {
      setError("Only PDF files are allowed.");
    }
  };

  const handleFileInput = (e) => {
    const picked = e.target.files[0];
    if (picked) { setFile(picked); setError(null); }
  };

  const removeFile = () => { setFile(null); fileInputRef.current.value = ""; };

  // ── Submit ─────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { setError("Please select a PDF file."); return; }

    setLoading(true);
    setError(null);

    try {
      // 1. Upload to Cloudinary via our API route
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed");

      // 2. Create order in DB via server action
      await createOrder({
        shopId,
        filePublicId: uploadData.publicId, 
        fileUrl: uploadData.secureUrl,
        fileName: uploadData.fileName,
        fileSizeBytes: uploadData.bytes,
        pageCount: uploadData.pageCount,
        copies: specs.copies,
        colorMode: specs.colorMode,
        pageRange: specs.pageRange || null,
        doubleSided: specs.doubleSided,
      });

      setSuccess(true);
      setTimeout(() => router.push(`/dashboard`), 2500);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Not Logged In ──────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div className="rounded-2xl bg-background/80 backdrop-blur-sm border border-border p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mx-auto mb-4">
          <LogIn className="w-8 h-8 text-violet-600" />
        </div>
        <h2 className="text-xl font-bold mb-2">Sign in to continue</h2>
        <p className="text-muted-foreground text-sm mb-6">
          You need to be signed in to place a print order at <strong>{shopName}</strong>.
        </p>
        <a
          href={`/api/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium hover:opacity-90 transition-opacity"
        >
          <LogIn className="w-4 h-4" />
          Sign in with Google
        </a>
      </div>
    );
  }

  // ── Success State ──────────────────────────────────────────
  if (success) {
    return (
      <div className="rounded-2xl bg-background/80 backdrop-blur-sm border border-border p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-xl font-bold mb-2">Order Placed! 🎉</h2>
        <p className="text-muted-foreground text-sm">
          Your print order has been sent to <strong>{shopName}</strong>.<br />
          Redirecting to your dashboard…
        </p>
      </div>
    );
  }

  // ── Upload Form ────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-background/80 backdrop-blur-sm border border-border p-6 flex flex-col gap-6"
    >
      {/* File Drop Zone */}
      <div>
        <label className="block text-sm font-medium mb-2">PDF File</label>
        {!file ? (
          <div
            onDrop={handleFileDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => fileInputRef.current.click()}
            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-colors ${
              dragOver
                ? "border-violet-500 bg-violet-50 dark:bg-violet-950/20"
                : "border-border hover:border-violet-400 hover:bg-muted/30"
            }`}
          >
            <Upload className="w-10 h-10 text-muted-foreground" />
            <div className="text-center">
              <p className="font-medium text-sm">Drop your PDF here</p>
              <p className="text-xs text-muted-foreground mt-1">or click to browse · Max 20MB</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={handleFileInput}
            />
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 rounded-xl border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/20">
            <FileText className="w-8 h-8 text-violet-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button type="button" onClick={removeFile} className="p-1.5 rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/40 transition-colors">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        )}
      </div>

      {/* Print Specifications */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Printer className="w-4 h-4" />
          Print Specifications
        </h3>

        {/* Copies */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <Hash className="w-4 h-4" /> Copies
          </label>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setSpecs(s => ({ ...s, copies: Math.max(1, s.copies - 1) }))}
              className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors text-lg font-medium">−</button>
            <span className="w-8 text-center font-semibold">{specs.copies}</span>
            <button type="button" onClick={() => setSpecs(s => ({ ...s, copies: s.copies + 1 }))}
              className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors text-lg font-medium">+</button>
          </div>
        </div>

        {/* Color Mode */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <Palette className="w-4 h-4" /> Color Mode
          </label>
          <div className="flex gap-1 p-1 rounded-lg bg-muted border border-border">
            {["BW", "COLOR"].map((mode) => (
              <button key={mode} type="button"
                onClick={() => setSpecs(s => ({ ...s, colorMode: mode }))}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  specs.colorMode === mode
                    ? "bg-background shadow text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}>
                {mode === "BW" ? "B&W" : "Color"}
              </button>
            ))}
          </div>
        </div>

        {/* Page Range */}
        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
            <BookOpen className="w-4 h-4" /> Page Range
          </label>
          <input
            type="text"
            placeholder="e.g. 1-5, 8, 10-12  (leave blank for all)"
            value={specs.pageRange}
            onChange={(e) => setSpecs(s => ({ ...s, pageRange: e.target.value }))}
            className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40"
          />
        </div>

        {/* Double Sided */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <RotateCcw className="w-4 h-4" /> Double Sided
          </label>
          <button
            type="button"
            onClick={() => setSpecs(s => ({ ...s, doubleSided: !s.doubleSided }))}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              specs.doubleSided ? "bg-violet-600" : "bg-muted border border-border"
            }`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
              specs.doubleSided ? "translate-x-5" : "translate-x-0"
            }`} />
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-2">
          <X className="w-4 h-4 shrink-0" /> {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !file}
        className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Placing Order…</>
        ) : (
          <><Printer className="w-5 h-5" /> Place Print Order</>
        )}
      </button>
    </form>
  );
}
