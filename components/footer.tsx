import Link from 'next/link'
import { Building, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Building className="h-8 w-8" />
              <span className="font-bold text-2xl">SABIROAD</span>
            </Link>
            <p className="text-gray-400">
              AI-powered building classification for the modern world. Revolutionizing how we understand and interact with our built environment.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/features" className="hover:text-blue-400 transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link></li>
              <li><Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Stay updated with our latest features and news.</p>
            <form className="flex space-x-2">
              <Input type="email" placeholder="Your email" className="bg-gray-800 text-white" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} SABIROAD. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

