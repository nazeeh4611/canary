import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { preconnect } from "react-dom";
import "./globals.css";
import { site } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { ClickTracker } from "@/components/layout/ClickTracker";
import { Analytics } from "@/components/layout/Analytics";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationSchema } from "@/lib/schema";

// Google Sans Flex — Google's own brand typeface, released on Google Fonts under the
// SIL Open Font License. Self-hosted (Latin subset, one variable file, weights 300–800).
const googleSans = localFont({
  src: "../fonts/GoogleSansFlex-latin.woff2",
  weight: "300 800",
  style: "normal",
  variable: "--font-google-sans",
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "SF Pro Display", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Interior Design & Fit-Out, Ajman`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false },
  robots:
    process.env.NEXT_PUBLIC_ALLOW_INDEXING === "false"
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large" },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#f5f1ea",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Open the connection to the photo CDN early so the first images arrive sooner
  preconnect("https://images.pexels.com");
  return (
    <html lang="en-AE" className={googleSans.variable}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-3 focus:text-ivory">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar />
        <ClickTracker />
        <Analytics />
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
