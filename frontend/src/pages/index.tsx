import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { motion, useInView } from "framer-motion";
import { 
  Ship, Calendar, Users, MapPin, Search, Star, 
  ChevronRight, ArrowRight, ShieldCheck, Clock
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

  const featuresRef = useRef(null);
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" });

  const allLocations = Array.from(new Set(routes.flatMap(r => [r.from, r.to])));

  const isValidRoute = routes.some(r => r.from === fromRoute && r.to === toRoute);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowNoRides(false);
    if (fromRoute && toRoute && date) {
      if (isValidRoute) {
        const searchParams = new URLSearchParams({ from: fromRoute, to: toRoute, date, passengers, vehicle });
        setLocation(`/payment?${searchParams.toString()}`);
      } else {
        setShowNoRides(true);
      }
    }
  };

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background image with a dark overlay — works regardless of light/dark theme */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/gateway.jpg" 
            alt="Gateway of India ferry terminal"
            className="w-full h-full object-cover"
          />
          {/* Fixed dark gradient — not tied to background color */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/70" />
          {/* Subtle teal tint at bottom for brand color bleed */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary/20 to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24 pb-12 md:pt-28 md:pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-5 drop-shadow-lg">
                Journey Beyond <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-300">
                  The Horizon
                </span>
              </h1>
              <p className="text-base md:text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
                Premium ferry crossings across Mumbai's coast — passengers and vehicles transported with unparalleled comfort and safety.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-base px-7">
                  Explore Routes
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-white/30 bg-white/10 hover:bg-white/20 text-white text-base px-7 backdrop-blur-sm">
                  View Fleet
                </Button>
              </div>
            </motion.div>

            {/* Booking Card */}
            <motion.div
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
                  <h3 className="font-serif text-xl md:text-2xl font-bold mb-5 text-foreground flex items-center gap-2">
                    <Ship className="w-5 h-5 text-primary" />
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
                      <Input 
                        type="date" 
                        className="bg-muted/60 border-border h-10 text-sm"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-foreground/80 text-sm flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-primary" /> Passengers
                        </Label>
                        <Select value={passengers} onValueChange={setPassengers}>
                          <SelectTrigger className="bg-muted/60 border-border text-sm h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1,2,3,4,5,6].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num} Pax</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-foreground/80 text-sm">Vehicle</Label>
                        <Select value={vehicle} onValueChange={setVehicle}>
                          <SelectTrigger className="bg-muted/60 border-border text-sm h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {vehicles.map(v => (
                              <SelectItem key={v.id} value={v.id}>{v.type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button type="submit" className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 mt-1 py-5 text-base font-semibold group">
                      Search Schedules
                      <Search className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                    </Button>
                  </form>

                  {showNoRides && (
                    <div className="mt-4 p-4 bg-destructive/15 border border-destructive/30 rounded-xl text-center">
                      <p className="text-destructive font-semibold text-sm">⚠ No rides available</p>
                      <p className="text-muted-foreground text-xs mt-1">This route combination is not available. Please select from the available trips.</p>
                    </div>
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
      <section className="py-16 md:py-24 bg-muted/40 border-y border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-4">
            <div>
              <h2 className="font-serif text-2xl md:text-4xl font-bold mb-2 md:mb-4">Popular Crossings</h2>
              <p className="text-muted-foreground text-sm md:text-lg max-w-xl">Discover our most requested routes and secure your spot on our next voyage.</p>
            </div>
            <Button variant="outline" className="rounded-full shrink-0">
              View All Routes <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {schedules.map((schedule, i) => {
              const route = routes.find(r => r.id === schedule.routeId);
              if (!route) return null;
              
              return (
                <Card key={schedule.id} className="bg-card border-border hover:border-primary/50 hover:shadow-md transition-all group cursor-pointer overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 md:p-6">
                      <div className="flex justify-between items-start mb-4 md:mb-6">
                        <div className="bg-primary/15 text-primary px-2 py-1 rounded-full text-xs font-semibold">
                          Daily
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">From</p>
                          <p className="font-bold text-sm md:text-lg">₹{schedule.price.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-4 md:mb-6">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 shrink-0 rounded-full bg-primary" />
                          <p className="font-medium text-sm md:text-base truncate">{route.from}</p>
                        </div>
                        <div className="pl-[3px] border-l-2 border-dashed border-border ml-[3px] h-4 md:h-6" />
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 shrink-0 rounded-full bg-accent" />
                          <p className="font-medium text-sm md:text-base truncate">{route.to}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-xs md:text-sm text-muted-foreground border-t border-border pt-3 md:pt-4">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3 md:w-4 md:h-4" /> {schedule.duration}</span>
                        <span>{schedule.time}</span>
                      </div>
                    </div>
                    
                    <div className="bg-primary text-primary-foreground p-2.5 md:p-3 flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all font-semibold text-sm">
                      Select Route <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
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