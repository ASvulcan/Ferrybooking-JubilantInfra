import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from "recharts";
import { 
  Ship, LayoutDashboard, Ticket, Users, FileCheck, 
  Settings, LogOut, TrendingUp, Anchor, Activity, Clock
} from "lucide-react";

import { adminStats, recentBookings } from "@/services/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/layout/PageWrapper";

const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 8000 },
  { name: 'Jul', value: 9500 },
];

const vehicleData = [
  { name: 'No Vehicle', value: 400 },
  { name: 'Car/SUV', value: 300 },
  { name: 'Motorcycle', value: 100 },
  { name: 'Commercial', value: 200 },
];

const COLORS = ['hsl(192 90% 50%)', 'hsl(175 70% 45%)', 'hsl(215 80% 60%)', 'hsl(280 70% 60%)'];

const routeData = [
  { name: 'MUM-ALB', tickets: 4000 },
  { name: 'MUM-ELE', tickets: 3000 },
  { name: 'MUM-URN', tickets: 2000 },
  { name: 'MUM-MOR', tickets: 2780 },
];

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    setLocation("/admin/login");
  };

  return (
    <PageWrapper className="bg-background">
      <div className="min-h-screen flex flex-col md:flex-row pt-16 md:pt-0">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-sidebar border-r border-border flex flex-col md:min-h-screen md:pt-16">
        <div className="p-4 md:p-6">
          <Link href="/" className="flex items-center gap-2 group inline-flex mb-8">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <Ship className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-lg font-700 tracking-wide text-foreground">
                Ferry<span className="text-primary font-300">Booking</span>
              </span>
              <span className="text-[9px] font-sans text-muted-foreground tracking-wider uppercase">from Jubilant Infrastructure</span>
            </div>
          </Link>

          <nav className="space-y-2">
            {[
              { id: "overview", icon: LayoutDashboard, label: "Overview" },
              { id: "bookings", icon: Ticket, label: "Bookings" },
              { id: "validation", icon: FileCheck, label: "Validation Logs" },
              { id: "fleet", icon: Anchor, label: "Fleet Status" },
              { id: "customers", icon: Users, label: "Customers" },
              { id: "settings", icon: Settings, label: "Settings" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-foreground/70 hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="font-bold text-accent">AD</span>
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">System Administrator</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold">Dashboard Overview</h1>
            <p className="text-muted-foreground mt-1">Welcome back. Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              <Activity className="w-4 h-4" />
              System Status: Optimal
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Revenue", value: adminStats.totalRevenue, icon: TrendingUp, color: "text-primary" },
            { label: "Tickets Sold", value: adminStats.ticketsSold, icon: Ticket, color: "text-accent" },
            { label: "Active Routes", value: adminStats.activeRoutes, icon: Ship, color: "text-chart-3" },
            { label: "Monthly Passengers", value: adminStats.passengersThisMonth, icon: Users, color: "text-chart-4" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-card/40 backdrop-blur-sm border-white/5">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                  <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-1 lg:col-span-2 bg-card/40 backdrop-blur-sm border-white/5">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue across all routes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(192 90% 50%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(192 90% 50%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} />
                    <YAxis stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      itemStyle={{ color: 'hsl(var(--primary))' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="hsl(192 90% 50%)" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/40 backdrop-blur-sm border-white/5">
            <CardHeader>
              <CardTitle>Vehicle Types</CardTitle>
              <CardDescription>Distribution of passenger vehicles</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={vehicleData}
                      cx="50%"
                      cy="45%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {vehicleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 lg:col-span-2 bg-card/40 backdrop-blur-sm border-white/5">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Latest transactions across the network</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-border hover:bg-muted">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-sm text-muted-foreground">
                      <th className="pb-3 font-medium">Booking ID</th>
                      <th className="pb-3 font-medium">Customer</th>
                      <th className="pb-3 font-medium">Route</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.slice(0, 5).map((booking, i) => (
                      <tr key={booking.id} className="border-b border-white/5 last:border-0 text-sm">
                        <td className="py-3 font-medium text-foreground">{booking.id}</td>
                        <td className="py-3">{booking.customer}</td>
                        <td className="py-3 text-muted-foreground">{booking.route}</td>
                        <td className="py-3 text-muted-foreground">{booking.date}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'Confirmed' ? 'bg-primary/10 text-primary border border-primary/20' :
                            booking.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                            'bg-destructive/10 text-destructive border border-destructive/20'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/40 backdrop-blur-sm border-white/5">
            <CardHeader>
              <CardTitle>Route Popularity</CardTitle>
              <CardDescription>Tickets sold by route</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={routeData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={false} />
                    <XAxis type="number" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} />
                    <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} width={70} />
                    <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.05)'}}
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    />
                    <Bar dataKey="tickets" fill="hsl(175 70% 45%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
    </PageWrapper>
  );
}
