import { Inter } from "next/font/google";
import localFont from "next/font/local";

import type { Metadata } from "next";

import { AppShell } from "@/components/app-shell";
import { ScrollHaptics } from "@/components/scroll-haptics";
import { StyleGlideProvider } from "@/components/styleglide-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

const dmSans = localFont({
  src: [
    {
      path: "../../fonts/dm-sans/DMSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../fonts/dm-sans/DMSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../fonts/dm-sans/DMSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../fonts/dm-sans/DMSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://peponmail.com"),
  title: {
    default: "PeponMail - Professional Email Addresses",
    template: "%s | PeponMail",
  },
  description:
    "Professional email addresses without the enterprise price. Custom email addresses from ₦500/month. No domain needed.",
  keywords: [
    "email alias",
    "email forwarding",
    "custom domain email",
    "professional email",
    "email management",
    "shared domain email",
  ],
  authors: [{ name: "PeponMail" }],
  creator: "PeponMail",
  publisher: "PeponMail",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "48x48" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon.ico" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon/favicon.ico" }],
  },
  openGraph: {
    title: "PeponMail - Professional Email Addresses",
    description:
      "Professional email addresses without the enterprise price. Custom email addresses from ₦500/month.",
    siteName: "PeponMail",
    images: [
      {
        url: "/meta.png",
        width: 1200,
        height: 630,
        alt: "PeponMail - Professional Email Addresses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PeponMail - Professional Email Addresses",
    description:
      "Professional email addresses without the enterprise price. Custom email addresses from ₦500/month.",
    images: ["/meta.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          crossOrigin="anonymous"
          src="https://tweakcn.com/live-preview.min.js"
        />
      </head>
      <body className={`${dmSans.variable} ${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <StyleGlideProvider />
          <ScrollHaptics />
          <AppShell>{children}</AppShell>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
