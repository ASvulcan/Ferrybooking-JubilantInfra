import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface PageWrapperProps {
  children: ReactNode;
  showNav?: boolean;
  showFooter?: boolean;
  className?: string;
}

export function PageWrapper({ 
  children, 
  showNav = true, 
  showFooter = true,
  className = ""
}: PageWrapperProps) {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {showNav && <Navbar />}
      
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex-grow flex flex-col"
      >
        {children}
      </motion.main>
      
      {showFooter && <Footer />}
    </div>
  );
}
