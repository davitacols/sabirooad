import React from 'react'
import Link from 'next/link'
import { Building } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 sm:px-8 flex h-16 items-center justify-center md:justify-between">
        <Link 
          href="/" 
          className="flex items-center space-x-2 hover:opacity-80"
        >
          <Building className="h-6 w-6" />
          <span className="font-bold text-xl">SABIROAD</span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center space-x-6">
            {[
              ['Upload', '/upload'],
              ['Camera', '/camera'],
              ['Predict', '/predict'],
              ['Metadata', '/metadata'],
            ].map(([title, url]) => (
              <li key={url}>
                <Link 
                  href={url}
                  className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="outline" asChild>
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header;

