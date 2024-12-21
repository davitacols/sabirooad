import './globals.css'
import { Inter } from 'next/font/google'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SABIROAD - AI-Powered Building Classification',
  description: 'Analyze and classify buildings using advanced AI technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex flex-col min-h-screen bg-black text-white">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

