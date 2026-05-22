import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Ship, Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Validate Ticket", href: "/validate" },
  ];

  // Pages where the hero has a dark image behind the nav
  const isHeroPage = location === "/" || location === "/about";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors ${
              isScrolled || !isHeroPage
                ? "bg-primary/15 border-primary/25 group-hover:bg-primary/25"
                : "bg-white/15 border-white/25 group-hover:bg-white/25"
            }`}>
              <Ship className={`w-4.5 h-4.5 ${isScrolled || !isHeroPage ? "text-primary" : "text-white"}`} />
            </div>
            <div className="flex flex-col leading-none">
              <span className={`font-serif text-lg font-bold tracking-wide transition-colors ${
                isScrolled || !isHeroPage ? "text-foreground" : "text-white"
              }`}>
                Ferry<span className="text-primary font-light">Booking</span>
              </span>
              <span className={`text-[9px] font-sans tracking-wider uppercase transition-colors ${
                isScrolled || !isHeroPage ? "text-muted-foreground" : "text-white/60"
              }`}>from Jubilant Infrastructure</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors relative group ${
                  location === link.href
                    ? isScrolled || !isHeroPage ? "text-primary" : "text-white"
                    : isScrolled || !isHeroPage ? "text-foreground/70 hover:text-primary" : "text-white/80 hover:text-white"
                }`}
              >
                {link.name}
                {location === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/admin/login">
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full transition-colors ${
                  isScrolled || !isHeroPage
                    ? "text-foreground/70 hover:text-primary hover:bg-primary/10"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <User className="w-5 h-5" />
              </Button>
            </Link>
            <Button className="rounded-full px-5 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm">
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden transition-colors p-2 rounded-lg ${
              isScrolled || !isHeroPage ? "text-foreground/70 hover:text-primary" : "text-white/80 hover:text-white"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/98 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="flex flex-col px-4 py-5 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium px-3 py-2.5 rounded-xl transition-colors ${
                    location === link.href
                      ? "text-primary bg-primary/10"
                      : "text-foreground/70 hover:text-primary hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              <Link href="/admin/login" onClick={() => setMobileMenuOpen(false)}>
                <span className="flex items-center gap-2 text-foreground/70 hover:text-primary px-3 py-2.5 rounded-xl hover:bg-muted transition-colors">
                  <User className="w-4 h-4" />
                  Admin Login
                </span>
              </Link>
              <Button className="w-full mt-2 rounded-xl" onClick={() => setMobileMenuOpen(false)}>
                Book Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
