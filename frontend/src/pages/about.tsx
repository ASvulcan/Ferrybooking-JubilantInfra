import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Ship, Anchor, Star } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { testimonials, fleet } from "@/services/mockData";

export default function About() {
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const stats = [
    { label: "Passengers Yearly", value: "1.2M+" },
    { label: "Active Routes", value: "4" },
    { label: "Fleet Vessels", value: "12" },
    { label: "Years Experience", value: "25" },
  ];

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/story.png" 
            alt="Coastal sunset" 
            className="w-full h-full object-cover"
          />
          {/* Fixed dark overlay so image is visible in light mode */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/75" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">Navigating the Future of Ocean Travel</h1>
            <p className="text-base md:text-xl text-white/80 leading-relaxed">
              For over two decades, FerryBooking — Jubilant Infrastructure has redefined maritime transport. We believe the journey should be as remarkable as the destination.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-12 md:py-16 bg-card border-y border-border relative z-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-x divide-border">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center px-2 md:px-4"
              >
                <p className="text-3xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16 max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-4xl font-bold mb-4">Meet Our Fleet</h2>
            <p className="text-muted-foreground text-sm md:text-lg">State-of-the-art vessels designed for maximum comfort, speed, and safety across all ocean conditions.</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {fleet.map((vessel, i) => (
              <motion.div
                key={vessel.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="h-48 md:h-64 overflow-hidden relative">
                  <img 
                    src={vessel.image} 
                    alt={vessel.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Dark gradient overlay so card text is readable on any bg */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                <div className="p-5 md:p-6 relative -mt-10 z-10">
                  <div className="bg-primary/15 text-primary inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-primary/20">
                    {vessel.type}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{vessel.name}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Ship className="w-4 h-4" />
                    <span>Capacity: {vessel.capacity} Passengers</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 md:py-24 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <Anchor className="w-4 h-4" /> Our Story
              </div>
              <h2 className="font-serif text-2xl md:text-4xl font-bold mb-6">Built on Mumbai's Waters</h2>
              <p className="text-muted-foreground leading-relaxed mb-4 text-sm md:text-base">
                Founded in 1999, FerryBooking by Jubilant Infrastructure began with a single vessel and a vision — to make coastal travel across Mumbai as seamless and dignified as any premium mode of transport.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Today, we operate four primary coastal routes serving hundreds of thousands of passengers annually, connecting Mumbai to Alibaug, Elephanta Island, Uran, and Mora with precision and care.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "Routes Operated", value: "4", sub: "Coastal crossings" },
                { label: "Vessels in Fleet", value: "12", sub: "Modern ferries" },
                { label: "On-Time Rate", value: "98%", sub: "Punctuality" },
                { label: "Est. Year", value: "1999", sub: "Jubilant Infrastructure" },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4 md:p-5">
                  <p className="text-2xl md:text-3xl font-bold text-primary mb-1">{item.value}</p>
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[300px] bg-primary/5 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-serif text-2xl md:text-4xl font-bold mb-4">Voyager Stories</h2>
            <p className="text-muted-foreground text-sm md:text-lg">Hear from those who have experienced the FerryBooking standard.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card border border-border p-6 md:p-8 rounded-2xl relative hover:shadow-md transition-all"
              >
                <div className="text-primary opacity-10 absolute top-6 right-6">
                  <Star className="w-10 h-10 md:w-12 md:h-12 fill-current" />
                </div>
                <p className="text-sm md:text-lg leading-relaxed mb-6 italic text-foreground/80">"{testimonial.text}"</p>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center font-serif text-lg md:text-xl font-bold text-primary">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm md:text-base">{testimonial.name}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
