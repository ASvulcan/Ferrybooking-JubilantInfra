import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  Ship, Calendar, Users, MapPin, Search, Star, 
  ChevronRight, ArrowRight, ShieldCheck, Clock, X, 
  Bike, Car, Truck, Bus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { routes, schedules, vehicles } from "@/services/mockData";

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-border py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="font-medium text-base md:text-lg">{question}</span>
        <ChevronRight className={`w-5 h-5 shrink-0 ml-2 transition-transform ${isOpen ? "rotate-90 text-primary" : "text-muted-foreground"}`} />
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pt-4 text-muted-foreground leading-relaxed text-sm md:text-base">{answer}</p>
      </motion.div>
    </div>
  );
};

export default function Home() {
  const [, setLocation] = useLocation();
  const [fromRoute, setFromRoute] = useState<string>("");
  const [toRoute, setToRoute] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [passengers, setPassengers] = useState("1");
  const [vehicle, setVehicle] = useState("v1");
  const [showNoRides, setShowNoRides] = useState(false);
  const [showAllRoutes, setShowAllRoutes] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  // Passenger details: array of { name, phone }, dynamically sized based on paxCount
  const [paxCount, setPaxCount] = useState(1);
  const [passengerDetails, setPassengerDetails] = useState<{ name: string; phone: string }[]>([
    { name: "", phone: "" },
  ]);

  // Sync passengerDetails array size with paxCount
  const syncPassengerDetails = (count: number) => {
    setPassengerDetails((prev) => {
      if (prev.length === count) return prev;
      if (prev.length < count) {
        return [...prev, ...Array(count - prev.length).fill({ name: "", phone: "" })];
      }
      return prev.slice(0, count);
    });
  };

  const updatePassengerField = (index: number, field: "name" | "phone", value: string) => {
    setPassengerDetails((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handlePaxChange = (newCount: number) => {
    const clamped = Math.max(1, Math.min(20, newCount));
    setPaxCount(clamped);
    setPassengers(String(clamped));
    syncPassengerDetails(clamped);
  };

  const featuresRef = useRef(null);
  const popularRoutesRef = useRef<HTMLElement>(null);
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" });

  // Group schedules by routeId so same-route schedules are merged
  const groupedSchedules = schedules.reduce<Record<string, typeof schedules>>((acc, s) => {
    if (!acc[s.routeId]) acc[s.routeId] = [];
    acc[s.routeId].push(s);
    return acc;
  }, {});

  const allLocations = Array.from(new Set(routes.flatMap(r => [r.from, r.to])));

  const isValidRoute = routes.some(r => r.from === fromRoute && r.to === toRoute);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowNoRides(false);
    setPhoneError(false);

    // Require at least one phone number across all passengers
    const hasPhone = passengerDetails.some((p) => p.phone.trim().length > 0);
    if (!hasPhone) {
      setPhoneError(true);
      return;
    }

    if (fromRoute && toRoute && date) {
      if (isValidRoute) {
        const searchParams = new URLSearchParams({ from: fromRoute, to: toRoute, date, passengers: String(paxCount), vehicle });
        setLocation(`/payment?${searchParams.toString()}`);
      } else {
        setShowNoRides(true);
      }
    }
  };

  const scrollToPopularRoutes = () => {
    popularRoutesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSelectRoute = (from: string, to: string) => {
    setFromRoute(from);
    setToRoute(to);
    setShowNoRides(false);
    // Scroll up to the booking card after a brief delay to allow state to update
    setTimeout(() => {
      const bookingEl = document.getElementById("booking-card");
      bookingEl?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-start lg:items-center pt-16 lg:pt-0 bg-fixed-desktop"
        style={{
          backgroundImage: 'url(/images/gateway.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay and teal tint as positioned layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/70 z-0" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary/20 to-transparent z-0" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-8 pb-8 md:pt-16 md:pb-16">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start lg:items-center">
            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white"
            >
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-white/90 mb-6">
                <Ship className="w-4 h-4 text-primary" />
                Mumbai Coastal Ferry Service
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-5 drop-shadow-lg">
                Journey Beyond <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-300">
                  The Horizon
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/80 mb-6 md:mb-8 max-w-xl leading-relaxed">
                Premium ferry crossings across Mumbai's coast — passengers and vehicles transported with unparalleled comfort and safety.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="default" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm sm:text-base px-5 sm:px-7 py-4 sm:py-5" onClick={scrollToPopularRoutes}>
                  Explore Routes
                </Button>
                <Button size="default" variant="outline" className="rounded-full border-white/30 bg-white/10 hover:bg-white/20 text-white text-sm sm:text-base px-5 sm:px-7 py-4 sm:py-5 backdrop-blur-sm">
                  View Fleet
                </Button>
              </div>
            </motion.div>

            {/* Booking Card */}
            <motion.div
              id="booking-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: [0, -6, 0] }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.4 },
                y: { repeat: Infinity, duration: 6, ease: "easeInOut" } 
              }}
              className="w-full max-w-md mx-auto lg:ml-auto"
            >
              <Card className="bg-white/95 backdrop-blur-2xl border-white/40 shadow-2xl overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-primary via-cyan-400 to-primary" />
                <CardContent className="p-5 md:p-7">
                  <h3 className="font-serif text-xl md:text-2xl font-bold mb-5 text-foreground flex items-center gap-3">
                    <img 
                      src="/images/logo.png" 
                      alt="FerryBooking" 
                      className="h-7 md:h-8 w-auto"
                      onError={(e) => { 
                        (e.target as HTMLImageElement).style.display = 'none'; 
                      }}
                    />
                    Book Your Voyage
                  </h3>
                  
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-foreground/80 text-sm flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-primary" /> From
                        </Label>
                        <Select value={fromRoute} onValueChange={(val) => { setFromRoute(val); setToRoute(""); setShowNoRides(false); }}>
                          <SelectTrigger className="bg-muted/60 border-border text-sm h-10">
                            <SelectValue placeholder="Departure" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from(new Set(routes.map(r => r.from))).map(port => (
                              <SelectItem key={port} value={port}>{port}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-foreground/80 text-sm flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-accent" /> To
                        </Label>
                        <Select value={toRoute} onValueChange={(val) => { setToRoute(val); setShowNoRides(false); }} disabled={!fromRoute}>
                          <SelectTrigger className="bg-muted/60 border-border text-sm h-10">
                            <SelectValue placeholder="Destination" />
                          </SelectTrigger>
                          <SelectContent>
                            {allLocations.map(loc => (
                              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-foreground/80 text-sm flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary" /> Date
                      </Label>
                      <div className="relative">
                        <Input 
                          type="date" 
                          className="bg-muted/60 border-border h-10 text-sm pl-9 pr-3 [color-scheme:light] dark:[color-scheme:dark]"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          required
                        />
                        <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>

                    {/* Step 1: Select Number of Passengers */}
                    <div className="space-y-2">
                      <Label className="text-foreground/80 text-sm flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-primary" /> Number of Passengers
                      </Label>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handlePaxChange(paxCount - 1)}
                          disabled={paxCount <= 1}
                          className="w-10 h-10 rounded-lg border border-border bg-muted/60 flex items-center justify-center text-lg font-bold text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                          −
                        </button>
                        <div className="flex-1 text-center">
                          <span className="text-2xl font-bold text-foreground">{paxCount}</span>
                          <span className="text-sm text-muted-foreground ml-1">passenger(s)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handlePaxChange(paxCount + 1)}
                          disabled={paxCount >= 20}
                          className="w-10 h-10 rounded-lg border border-border bg-muted/60 flex items-center justify-center text-lg font-bold text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Step 2: Name & phone for each passenger */}
                    {paxCount > 0 && (
                      <div className="space-y-2">
                        <Label className="text-foreground/80 text-sm flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-primary" /> Passenger Details
                        </Label>
                        <p className="text-[10px] text-muted-foreground">At least one phone number required</p>
                        {/* Scrollable passenger details — tight max-h on mobile to keep card in viewport */}
                        <div className="max-h-[160px] md:max-h-[240px] overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                          <AnimatePresence mode="popLayout">
                            {passengerDetails.map((p, idx) => (
                              <motion.div
                                key={idx}
                                layout
                                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="bg-muted/30 rounded-lg p-3 border border-border/60"
                              >
                                <p className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-2">
                                  Passenger {idx + 1}
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <Label className="text-[10px] text-muted-foreground mb-1 block">Full Name</Label>
                                    <Input
                                      placeholder="Enter name"
                                      value={p.name}
                                      onChange={(e) => updatePassengerField(idx, "name", e.target.value)}
                                      className="h-8 text-xs bg-background border-border"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-[10px] text-muted-foreground mb-1 block">Phone No.</Label>
                                    <Input
                                      placeholder="Enter phone"
                                      value={p.phone}
                                      onChange={(e) => updatePassengerField(idx, "phone", e.target.value)}
                                      className="h-8 text-xs bg-background border-border"
                                    />
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <Label className="text-foreground/80 text-sm flex items-center gap-1.5">
                        <img 
                          src="/images/logo.png" 
                          alt="FerryBooking" 
                          className="h-4 w-auto"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        /> Vehicle
                      </Label>
                      <Select value={vehicle} onValueChange={setVehicle}>
                        <SelectTrigger className="bg-muted/60 border-border text-sm h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {vehicles.map(v => {
                            let Icon = null;
                            switch (v.type) {
                              case "No Vehicle": Icon = X; break;
                              case "Bike": Icon = Bike; break;
                              case "Scooter": Icon = Bike; break;
                              case "Car": Icon = Car; break;
                              case "SUV": Icon = Car; break;
                              case "Mini Truck": Icon = Truck; break;
                              case "Bus": Icon = Bus; break;
                              case "Cargo Vehicle": Icon = Truck; break;
                              default: Icon = Car;
                            }
                            return (
                              <SelectItem key={v.id} value={v.id}>
                                <div className="flex items-center gap-2">
                                  {Icon && <Icon className="w-3.5 h-3.5 text-muted-foreground" />}
                                  <span>{v.type}</span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 mt-1 py-5 text-base font-semibold group">
                      Search Schedules
                      <Search className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                    </Button>
                  </form>

                  {showNoRides && !phoneError && (
                    <div className="mt-4 p-4 bg-destructive/15 border border-destructive/30 rounded-xl text-center">
                      <p className="text-destructive font-semibold text-sm">⚠ No rides available</p>
                      <p className="text-muted-foreground text-xs mt-1">This route combination is not available. Please select from the available trips.</p>
                    </div>
                  )}
                  {phoneError && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-destructive/15 border border-destructive/30 rounded-xl text-center"
                    >
                      <p className="text-destructive font-semibold text-sm">⚠ Phone number required</p>
                      <p className="text-muted-foreground text-xs mt-1">Please enter at least the first passenger's phone number.</p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Wave Separator removed */}
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-16 md:py-24 bg-background relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-4xl font-bold mb-4">The FerryBooking Standard</h2>
            <p className="text-muted-foreground text-base md:text-lg">We elevate ocean travel with world-class amenities, strict safety protocols, and seamless logistics.</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
            {[
              { icon: ShieldCheck, title: "Uncompromising Safety", desc: "Our fleet exceeds international maritime safety standards with state-of-the-art navigation systems." },
              { icon: Star, title: "Premium Comfort", desc: "Enjoy spacious seating, private cabins, and gourmet dining options while you cross the sea." },
              { icon: Clock, title: "On-Time Reliability", desc: "We pride ourselves on punctuality. Our schedules are optimized for efficiency and minimal wait times." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/15 flex items-center justify-center mb-5">
                  <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section ref={popularRoutesRef} className="py-16 md:py-24 bg-muted/40 border-y border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-4">
            <div>
              <h2 className="font-serif text-2xl md:text-4xl font-bold mb-2 md:mb-4">Popular Crossings</h2>
              <p className="text-muted-foreground text-sm md:text-lg max-w-xl">Discover our most requested routes and secure your spot on our next voyage.</p>
            </div>
            <Button 
              variant="outline" 
              className="rounded-full shrink-0"
              onClick={() => setShowAllRoutes(!showAllRoutes)}
            >
              {showAllRoutes ? "Show Less" : "View All Routes"} 
              <ArrowRight className={`w-4 h-4 ml-2 transition-transform ${showAllRoutes ? "rotate-90" : ""}`} />
            </Button>
          </div>

          {/* Merged Route Cards — horizontally scrollable row */}
          <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            <div className="flex gap-4 md:gap-6 min-w-max">
              {Object.entries(groupedSchedules).map(([routeId, routeSchedules]) => {
                const route = routes.find(r => r.id === routeId);
                if (!route) return null;
                const firstSchedule = routeSchedules[0];
                const times = routeSchedules.map(s => s.time);
                const isSelected = fromRoute === route.from && toRoute === route.to;

                return (
                  <Card 
                    key={routeId}
                    onClick={() => handleSelectRoute(route.from, route.to)}
                    className={`bg-card border-border hover:border-primary/50 hover:shadow-md transition-all group cursor-pointer overflow-hidden shrink-0 w-[260px] md:w-[280px] ${
                      isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                    }`}
                  >
                    <CardContent className="p-0">
                      <div className="p-4 md:p-5">
                        <div className="flex justify-between items-start mb-3">
                          <div className="bg-primary/15 text-primary px-2 py-1 rounded-full text-xs font-semibold">
                            Daily
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">From</p>
                            <p className="font-bold text-sm md:text-base">₹{firstSchedule.price.toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                        
                        {/* Route visualization */}
                        <div className="flex items-start gap-2 mb-3">
                          <div className="flex flex-col items-center gap-0.5 pt-0.5">
                            <div className="w-2 h-2 shrink-0 rounded-full bg-primary" />
                            <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-accent" />
                            <div className="w-2 h-2 shrink-0 rounded-full bg-accent" />
                          </div>
                          <div className="flex-1 min-w-0 pt-0">
                            <p className="font-medium text-sm md:text-base truncate leading-tight">{route.from}</p>
                            <p className="text-xs text-muted-foreground mt-2 truncate leading-tight">{route.to}</p>
                          </div>
                        </div>

                        {/* Duration */}
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                          <Clock className="w-3 h-3" />
                          <span>{firstSchedule.duration}</span>
                          <span className="mx-1.5">·</span>
                          <span>{routeSchedules.length} trip{routeSchedules.length > 1 ? 's' : ''}/day</span>
                        </div>

                        {/* Time chips */}
                        <div className="flex flex-wrap gap-1.5">
                          {times.map((t, idx) => (
                            <span 
                              key={idx}
                              className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-[10px] md:text-xs font-medium rounded-md border border-primary/15"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Select Route overlay */}
                      <div className="bg-primary text-primary-foreground p-2 md:p-2.5 flex justify-center items-center gap-1.5 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all font-semibold text-xs">
                        Select Route <ArrowRight className="w-3 h-3" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="text-center mt-4 text-xs text-muted-foreground md:hidden">
            ← Scroll to see more routes →
          </div>

          {/* Expanded View: All schedules in full detail (grid) */}
          <AnimatePresence>
            {showAllRoutes && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="border-t border-border mt-8 pt-8">
                  <h3 className="font-serif text-xl font-bold mb-6">All Available Rides</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {schedules.map((schedule) => {
                      const route = routes.find(r => r.id === schedule.routeId);
                      if (!route) return null;

                      return (
                        <Card 
                          key={schedule.id}
                          onClick={() => handleSelectRoute(route.from, route.to)}
                          className={`bg-card border-border hover:border-primary/50 hover:shadow-md transition-all group cursor-pointer overflow-hidden ${
                            fromRoute === route.from && toRoute === route.to ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                          }`}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div className="bg-primary/15 text-primary px-2 py-0.5 rounded-full text-[10px] font-semibold">
                                {schedule.time}
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] text-muted-foreground">Price</p>
                                <p className="font-bold text-sm">₹{schedule.price.toLocaleString('en-IN')}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-1.5 h-1.5 shrink-0 rounded-full bg-primary" />
                              <p className="font-medium text-xs md:text-sm truncate">{route.from}</p>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-1.5 h-1.5 shrink-0 rounded-full bg-accent" />
                              <p className="font-medium text-xs md:text-sm truncate">{route.to}</p>
                            </div>

                            <div className="flex justify-between items-center text-[11px] text-muted-foreground border-t border-border pt-2 mt-2">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {schedule.duration}
                              </span>
                              <span>{schedule.availableSeats} seats left</span>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-serif text-2xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-sm md:text-lg">Everything you need to know before you sail.</p>
          </div>

          <div className="space-y-2">
            <FAQItem 
              question="How early should I arrive before departure?" 
              answer="For foot passengers, we recommend arriving at least 1 hour before departure. If you are traveling with a vehicle, please arrive 2 hours prior to allow for loading procedures and security checks." 
            />
            <FAQItem 
              question="Can I bring my pet on board?" 
              answer="Yes, pets are welcome on all FerryBooking vessels. They must be kept in designated pet areas or in a secure carrier for the duration of the journey. Special pet tickets must be purchased in advance." 
            />
            <FAQItem 
              question="Is there Wi-Fi available during the crossing?" 
              answer="Yes, complimentary standard Wi-Fi is available in all passenger lounges. Premium high-speed Wi-Fi is available for purchase or included with First Class tickets." 
            />
            <FAQItem 
              question="What if my crossing is delayed or cancelled due to weather?" 
              answer="Safety is our highest priority. In the event of severe weather cancellations, you will be offered a full refund or the option to rebook on the next available sailing at no additional cost." 
            />
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}