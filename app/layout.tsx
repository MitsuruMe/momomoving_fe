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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`font-sans ${monomaniacOne.variable} ${notoSansJP.variable}`}>
        <AuthProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </AuthProvider>
      </body>
    </html>
  )
}
