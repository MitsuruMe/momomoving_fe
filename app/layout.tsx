import type React from "react"
import type { Metadata } from "next"
import { Monomaniac_One, Noto_Sans_JP } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"

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
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${monomaniacOne.variable} ${notoSansJP.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
