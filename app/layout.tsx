import type React from "react"
import type { Metadata } from "next"
import { Monomaniac_One, Noto_Sans_JP } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import { AuthProvider } from "@/context/AuthContext"

const monomaniacOne = Monomaniac_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-monomaniac-one",
})

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
})

export const metadata: Metadata = {
  title: "ももとお引っ越し",
  description: "引越しをサポートするアプリケーション",
  manifest: "/manifest.json",
  themeColor: "#ef4444",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ももとお引っ越し",
  },
  icons: {
    icon: "/icon-192x192.png",
    apple: "/icon-192x192.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ef4444" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ももとお引っ越し" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={`font-sans ${monomaniacOne.variable} ${notoSansJP.variable}`}>
        <AuthProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </AuthProvider>
      </body>
    </html>
  )
}
