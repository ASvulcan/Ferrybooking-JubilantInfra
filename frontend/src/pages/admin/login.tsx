import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Ship, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/admin/dashboard");
    }, 1000);
  };

  return (
    <PageWrapper className="bg-background relative overflow-hidden flex items-center justify-center pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="bg-card border border-border rounded-3xl p-8 shadow-xl relative overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center border border-primary/25 mb-6">
              <Ship className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center mb-1">
              <span className="font-serif text-2xl font-700 tracking-wide text-foreground">
                Ferry<span className="text-primary font-300">Booking</span>
              </span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-center mt-2">Admin Portal</h1>
            <p className="text-muted-foreground text-sm mt-2 text-center">
              Secure access to FerryBooking management
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground/80">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@ferrybooking.in" 
                className="bg-muted/50 border-border focus:border-primary/50"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground/80">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="bg-muted/50 border-border focus:border-primary/50"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
              >
                Remember me for 30 days
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 mt-4 group"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Secure Login</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Protected by enterprise-grade encryption.
            <br />
            Unauthorized access is strictly prohibited.
          </p>
          <p className="text-xs text-muted-foreground mt-2">Jubilant Infrastructure Pvt. Ltd.</p>
        </div>
      </motion.div>
    </PageWrapper>
  );
}
