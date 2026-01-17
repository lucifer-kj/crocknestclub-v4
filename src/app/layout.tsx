import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";


const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: 'swap',
});

// Keeping JetBrains for potential mono needs (code blocks or specific stylings)
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "LOUD MERCH | Premium Streetwear",
    template: "%s | LOUD MERCH"
  },
  description: "Exclusive drops. Premium quality. The loudest merch in the game.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CrockNest Club",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://loudmerch.com',
    siteName: 'LOUD MERCH',
    title: 'LOUD MERCH | Premium Streetwear',
    description: 'Exclusive drops. Premium quality. The loudest merch in the game.',
    images: [
      {
        url: '/og-image.jpg', // We should ensure this exists or use a placeholder
        width: 1200,
        height: 630,
        alt: 'LOUD MERCH Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LOUD MERCH | Premium Streetwear',
    description: 'Exclusive drops. Premium quality. The loudest merch in the game.',
    creator: '@loudmerch',
    images: ['/og-image.jpg'],
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-black dark:text-white transition-colors duration-300`}
      >
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
