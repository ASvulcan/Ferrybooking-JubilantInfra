import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { 
  Ship, Download, Printer, CheckCircle2, 
  MapPin, Clock, Calendar, Users, Car, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { vehicles } from "@/services/mockData";

export default function TicketPreview() {
  const [location] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  // Parse query params to mock dynamic data
  const searchParams = new URLSearchParams(window.location.search);
  const fromPort = searchParams.get("from") || "Manila";
  const toPort = searchParams.get("to") || "Cebu";
  const dateStr = searchParams.get("date") || "2023-11-15";
  const passengers = searchParams.get("passengers") || "1";
  const vehicleId = searchParams.get("vehicle") || "v1";
  
  const paymentId = searchParams.get("paymentId") || "";
  const orderId = searchParams.get("orderId") || "";
  const vehicleName = vehicles.find(v => v.id === vehicleId)?.type || "No Vehicle";
  const ticketId = `AQV-${Math.floor(Math.random() * 900000) + 100000}`;

  // Format date
  const formattedDate = new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  useEffect(() => {
    // Simulate generation time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <PageWrapper showFooter={false} className="bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary border-t-transparent animate-spin mx-auto mb-6" />
          <h2 className="text-xl font-medium animate-pulse">Generating your boarding pass...</h2>
          <p className="text-muted-foreground mt-2">Finalizing booking details</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/">
            <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-primary">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-3 text-emerald-400 mb-2">
            <CheckCircle2 className="w-6 h-6" />
            <span className="font-medium text-lg">Booking Confirmed</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold">Your Digital Boarding Pass</h1>
          <p className="text-muted-foreground mt-2">Present this QR code at the terminal for scanning.</p>
        </motion.div>

        {/* Ticket Layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
          className="relative"
        >
          <Card className="bg-card border border-border shadow-2xl overflow-hidden rounded-[2rem]">
            {/* Top Pattern */}
            <div className="h-4 w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMTExYzJhIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wLDBMOCw4TTAsOEw4LDAiIHN0cm9rZT0iIzQzYjVlYSIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+Cjwvc3ZnPg==')] opacity-30" />
            
            <div className="grid md:grid-cols-[1fr_300px]">
              {/* Left Side: Details */}
              <div className="p-8 md:p-10 relative">
                {/* Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                  <Ship className="w-64 h-64" />
                </div>

                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <Ship className="w-3 h-3 text-primary" />
                      </div>
                      <span className="font-serif font-bold text-lg tracking-wider text-primary">FERRYBOOKING</span>
                    </div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Jubilant Infrastructure</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Ticket Number</p>
                    <p className="font-mono text-xl font-bold tracking-wider">{ticketId}</p>
                  </div>
                </div>

                {/* Route */}
                <div className="flex items-center justify-between mb-12 relative z-10">
                  <div className="text-center md:text-left">
                    <p className="text-3xl md:text-5xl font-bold mb-2">{fromPort.substring(0, 3).toUpperCase()}</p>
                    <p className="text-muted-foreground font-medium">{fromPort}</p>
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center px-4 md:px-8">
                    <div className="w-full flex items-center">
                      <div className="h-px bg-white/20 flex-1" />
                      <Ship className="w-6 h-6 text-primary mx-4" />
                      <div className="h-px bg-white/20 flex-1" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 uppercase tracking-widest">Direct Route</p>
                  </div>

                  <div className="text-center md:text-right">
                    <p className="text-3xl md:text-5xl font-bold mb-2">{toPort.substring(0, 3).toUpperCase()}</p>
                    <p className="text-muted-foreground font-medium">{toPort}</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10 border-t border-border pt-8">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1"><Calendar className="w-3 h-3" /> Date</p>
                    <p className="font-medium">{formattedDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Boarding</p>
                    <p className="font-medium text-primary">05:15 AM</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1"><Users className="w-3 h-3" /> Passengers</p>
                    <p className="font-medium">{passengers} Adult(s)</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1"><Car className="w-3 h-3" /> Vehicle</p>
                    <p className="font-medium">{vehicleName}</p>
                  </div>
                </div>
              </div>

              {/* Right Side: QR Code */}
              <div className="bg-muted/50 p-8 md:p-10 border-l border-dashed border-border relative flex flex-col items-center justify-center">
                {/* Cutout circles for realism */}
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-background" />
                <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-background" />
                
                <div className="bg-white p-4 rounded-xl mb-6">
                  <QRCodeSVG 
                    value={`https://ferrybooking.in/validate?ticket=${ticketId}`} 
                    size={160}
                    level="Q"
                    includeMargin={false}
                  />
                </div>
                
                <p className="text-sm text-center text-muted-foreground">
                  Scan at terminal gate<br/>for automatic boarding
                </p>

                <div className="mt-8 pt-6 border-t border-border w-full">
                  <p className="text-xs text-center text-muted-foreground uppercase tracking-widest">Boarding Group</p>
                  <p className="text-4xl font-bold text-center mt-1 text-foreground">A</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8">
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </Button>
            <Button variant="outline" className="rounded-full border-white/20 hover:bg-white/10 px-8">
              <Printer className="w-4 h-4 mr-2" /> Print Ticket
            </Button>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
