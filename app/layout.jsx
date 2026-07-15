import { Geist, Geist_Mono, Share_Tech } from "next/font/google";
import AuthProvider from "@/components/auth/AuthProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const shareTech = Share_Tech({
  variable: "--font-share-tech",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "AirPDF - QR-Based Document Printing",
  description: "Upload and print documents at nearby shops using QR codes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${shareTech.variable} antialiased`}
      >

        {/* Global Grid Background */}
        <div className="fixed inset-0 -z-10 bg-background">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>
        <AuthProvider>
          {children}
        </AuthProvider>

      </body>
    </html>
  );
}
