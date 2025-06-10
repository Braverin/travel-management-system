import type React from "react"
import "@/app/globals.css"
import { Mona_Sans as FontSans } from "next/font/google"
import { MainNav } from "@/components/dashboard-nav"

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { MobileNav } from "@/components/mobile-nav"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 border-b bg-background">
              <div className="container flex h-16 items-center justify-between py-4">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold mr-6">JOJO旅行社</h1>
                  <div className="hidden md:flex">
                    <MainNav />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MobileNav />
                </div>
              </div>
            </header>
            <main className="flex-1">
              <div className="container py-6">{children}</div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'JOJO旅行社',
  generator: 'v0.dev'
};
