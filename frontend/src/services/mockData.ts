export const routes = [
  { id: "1", from: "Gateway of India", to: "Local Trip (20min)" },
  { id: "2", from: "Versova", to: "Madh" },
  { id: "3", from: "Madh", to: "Versova" },
  { id: "4", from: "India Gate", to: "Mandwa" },
  { id: "5", from: "Mandwa", to: "India Gate" },
  { id: "6", from: "India Gate", to: "Mandva & Local Trip" },
];

export const schedules = [
  { id: "s1", routeId: "1", time: "10:00 AM", duration: "20min", price: 350, availableSeats: 50 },
  { id: "s2", routeId: "1", time: "01:00 PM", duration: "20min", price: 350, availableSeats: 50 },
  { id: "s3", routeId: "1", time: "04:00 PM", duration: "20min", price: 350, availableSeats: 50 },
  { id: "s4", routeId: "2", time: "08:00 AM", duration: "30min", price: 500, availableSeats: 40 },
  { id: "s5", routeId: "2", time: "12:00 PM", duration: "30min", price: 500, availableSeats: 40 },
  { id: "s6", routeId: "3", time: "08:45 AM", duration: "30min", price: 500, availableSeats: 40 },
  { id: "s7", routeId: "3", time: "12:45 PM", duration: "30min", price: 500, availableSeats: 40 },
  { id: "s8", routeId: "4", time: "09:00 AM", duration: "1h 00m", price: 800, availableSeats: 60 },
  { id: "s9", routeId: "4", time: "02:00 PM", duration: "1h 00m", price: 800, availableSeats: 60 },
  { id: "s10", routeId: "5", time: "05:00 PM", duration: "1h 00m", price: 800, availableSeats: 60 },
  { id: "s11", routeId: "5", time: "07:00 PM", duration: "1h 00m", price: 800, availableSeats: 60 },
  { id: "s12", routeId: "6", time: "11:00 AM", duration: "1h 30m", price: 1200, availableSeats: 45 },
  { id: "s13", routeId: "6", time: "03:00 PM", duration: "1h 30m", price: 1200, availableSeats: 45 },
];

export const vehicles = [
  { id: "v1", type: "No Vehicle" },
  { id: "v2", type: "Bike" },
  { id: "v3", type: "Scooter" },
  { id: "v4", type: "Car" },
  { id: "v5", type: "SUV" },
  { id: "v6", type: "Mini Truck" },
  { id: "v7", type: "Bus" },
  { id: "v8", type: "Cargo Vehicle" },
];

export const testimonials = [
  { id: "t1", name: "Priya Sharma", role: "Frequent Traveler", text: "FerryBooking completely redefined my ocean travel experience. The Mumbai coastal routes are now my favourite weekend escape." },
  { id: "t2", name: "Rohan Mehta", role: "Business Owner", text: "Transporting cargo has never been easier or more reliable. Their premium service across all routes is truly a game changer." },
  { id: "t3", name: "Ananya Iyer", role: "Tourist", text: "From the moment we booked until we arrived, everything was seamless and incredibly beautiful." },
  { id: "t4", name: "Vikram Nair", role: "Car Owner", text: "The drive-on experience at the ferry terminal is so well organized. The vessel itself feels like a five-star hotel." }
];

export const fleet = [
  { id: "f1", name: "Ocean Majesty", capacity: 850, type: "Premium Passenger Ferry", image: "/images/fleet.png" },
  { id: "f2", name: "Sapphire Explorer", capacity: 600, type: "High-Speed Vessel", image: "/images/fleet.png" },
  { id: "f3", name: "Coral Navigator", capacity: 1200, type: "RoRo Passenger Vessel", image: "/images/fleet.png" }
];

export const recentBookings = [
  { id: "B-78291", customer: "Priya Sharma", route: "Gateway of India → Local Trip (20min)", date: "May 10, 2026", amount: "₹350", status: "Confirmed" },
  { id: "B-78292", customer: "Rohan Mehta", route: "Versova → Madh", date: "May 10, 2026", amount: "₹500", status: "Confirmed" },
  { id: "B-78293", customer: "Ananya Iyer", route: "India Gate → Mandwa", date: "May 09, 2026", amount: "₹800", status: "Pending" },
  { id: "B-78294", customer: "Vikram Nair", route: "Mandwa → India Gate", date: "May 08, 2026", amount: "₹800", status: "Confirmed" },
  { id: "B-78295", customer: "Sneha Joshi", route: "India Gate → Mandva & Local Trip", date: "May 08, 2026", amount: "₹1,200", status: "Confirmed" },
  { id: "B-78296", customer: "Arjun Kulkarni", route: "Madh → Versova", date: "May 07, 2026", amount: "₹500", status: "Cancelled" },
  { id: "B-78297", customer: "Meera Patel", route: "Gateway of India → Local Trip (20min)", date: "May 07, 2026", amount: "₹350", status: "Confirmed" },
  { id: "B-78298", customer: "Kiran Desai", route: "India Gate → Mandwa", date: "May 06, 2026", amount: "₹800", status: "Confirmed" }
];

export const adminStats = {
  totalRevenue: "₹1.2Cr",
  ticketsSold: "45,231",
  activeRoutes: 6,
  passengersThisMonth: "8,409"
};