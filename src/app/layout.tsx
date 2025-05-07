// app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import ClientLayout from "./client-layout" // 👈 new
import { Analytics } from "@vercel/analytics/react"
export const metadata: Metadata = {
  title: "Kanik - Minimal Digital Agency Clone",
  description: "A clone of the Kanik digital agency website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans">
        <ClientLayout>
          <Analytics />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieBanner />
          </div>
        </ClientLayout>
      </body>
    </html>
  )
}
