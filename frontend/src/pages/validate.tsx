import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanLine, Search, CheckCircle2, XCircle, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { PageWrapper } from "@/components/layout/PageWrapper";

type ValidationStatus = "idle" | "loading" | "valid" | "invalid";

export default function ValidateTicket() {
  const [ticketId, setTicketId] = useState("");
  const [status, setStatus] = useState<ValidationStatus>("idle");

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketId) return;

    setStatus("loading");
    
    // Simulate validation check
    setTimeout(() => {
      // Mock simple validation: valid if it starts with AQV
      if (ticketId.toUpperCase().startsWith("AQV")) {
        setStatus("valid");
      } else {
        setStatus("invalid");
      }
    }, 1500);
  };

  const resetScanner = () => {
    setStatus("idle");
    setTicketId("");
  };

  return (
    <PageWrapper className="bg-background">
      <div className="container mx-auto px-4 py-12 md:py-24 max-w-md">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <ShieldAlert className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-serif text-3xl font-bold mb-2">Ticket Validation</h1>
          <p className="text-muted-foreground">Verify boarding passes securely</p>
        </div>

        <Card className="bg-card/40 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden">
          <CardContent className="p-8">
            
            <AnimatePresence mode="wait">
              {status === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Scanner Mockup */}
                  <div className="relative w-full aspect-square bg-black/40 rounded-2xl mb-8 border border-white/5 overflow-hidden flex items-center justify-center group cursor-pointer" onClick={() => setTicketId("AQV-123456")}>
                    {/* Scanner corners */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl-lg" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr-lg" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary rounded-bl-lg" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br-lg" />
                    
                    {/* Scanning line animation */}
                    <motion.div 
                      animate={{ top: ["10%", "90%", "10%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute left-4 right-4 h-0.5 bg-primary shadow-[0_0_15px_rgba(67,181,234,0.8)]"
                    />

                    <div className="text-center opacity-50 group-hover:opacity-100 transition-opacity">
                      <ScanLine className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm font-medium">Click to mock scan</p>
                    </div>
                  </div>

                  <div className="relative flex items-center py-2 mb-6">
                    <div className="flex-grow border-t border-white/10"></div>
                    <span className="flex-shrink-0 mx-4 text-xs text-muted-foreground uppercase tracking-widest">OR</span>
                    <div className="flex-grow border-t border-white/10"></div>
                  </div>

                  <form onSubmit={handleValidate}>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Enter Ticket ID (e.g. AQV-123456)" 
                        value={ticketId}
                        onChange={(e) => setTicketId(e.target.value)}
                        className="bg-background/50 border-white/10 uppercase"
                      />
                      <Button type="submit" disabled={!ticketId} className="bg-primary text-primary-foreground">
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}

              {status === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary border-t-transparent animate-spin mx-auto mb-6" />
                  <h3 className="text-xl font-medium">Verifying Ticket...</h3>
                  <p className="text-muted-foreground mt-2">Checking encrypted database</p>
                </motion.div>
              )}

              {status === "valid" && (
                <motion.div
                  key="valid"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 relative">
                    <div className="absolute inset-0 rounded-full border border-emerald-500 animate-ping opacity-20" />
                    <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-400 mb-2">Valid Boarding Pass</h3>
                  <div className="bg-black/30 p-4 rounded-xl mb-8 border border-white/5 text-left">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Ticket ID</p>
                    <p className="font-mono text-lg mb-4">{ticketId.toUpperCase()}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">Status</p>
                        <p className="font-medium text-emerald-400">Confirmed</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">Class</p>
                        <p className="font-medium">Premium</p>
                      </div>
                    </div>
                  </div>
                  <Button onClick={resetScanner} className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                    Scan Next Ticket
                  </Button>
                </motion.div>
              )}

              {status === "invalid" && (
                <motion.div
                  key="invalid"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-6">
                    <XCircle className="w-12 h-12 text-destructive" />
                  </div>
                  <h3 className="text-2xl font-bold text-destructive mb-2">Invalid Ticket</h3>
                  <p className="text-muted-foreground mb-8">
                    The ticket ID <span className="font-mono text-white">{ticketId.toUpperCase()}</span> could not be verified in the system or has already been used.
                  </p>
                  <Button onClick={resetScanner} variant="outline" className="w-full rounded-xl border-white/20">
                    Try Again
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
