import { Link } from "wouter";
import { Ship, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/40 border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center border border-primary/25">
                <Ship className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-lg font-700 tracking-wide text-foreground">
                  Ferry<span className="text-primary font-300">Booking</span>
                </span>
                <span className="text-[9px] font-sans font-400 text-muted-foreground tracking-wider uppercase">from Jubilant Infrastructure</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Premium ocean transport platform delivering luxury, comfort, and reliability across Mumbai coastal routes.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground/60 hover:bg-primary/15 hover:text-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground/60 hover:bg-primary/15 hover:text-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground/60 hover:bg-primary/15 hover:text-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">Destinations</Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">Our Fleet</Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Us</Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">Schedule</Link>
              </li>
              <li>
                <Link href="/validate" className="text-muted-foreground hover:text-primary transition-colors text-sm">Validate Ticket</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Cancellation Policy</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Cookie Policy</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Gateway of India Terminal, Apollo Bunder, Mumbai 400 001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+91 22 6123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>reservations@ferrybooking.in</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} FerryBooking — Jubilant Infrastructure Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Mumbai Coastal Ferry Services
          </p>
        </div>
      </div>
    </footer>
  );
}
