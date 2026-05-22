import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ship, ShieldCheck, CreditCard, ArrowLeft, 
  CheckCircle2, XCircle, Loader2, Lock, Wallet,
  Banknote, Smartphone, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { routes, schedules, vehicles } from "@/services/mockData";
import { initiatePayment, type PaymentResult } from "@/services/razorpay";

type PaymentMethod = "card" | "upi";
type PaymentStatus = "idle" | "processing" | "success" | "failed";

export default function Payment() {
  const [, setLocation] = useLocation();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");

  // Parse query params
  const searchParams = new URLSearchParams(window.location.search);
  const fromPort = searchParams.get("from") || "";
  const toPort = searchParams.get("to") || "";
  const dateStr = searchParams.get("date") || "";
  const passengers = parseInt(searchParams.get("passengers") || "1");
  const vehicleId = searchParams.get("vehicle") || "v1";

  // Find matching route & schedule
  const matchedRoute = routes.find(r => r.from === fromPort && r.to === toPort);
  const matchedSchedule = schedules.find(s => s.routeId === matchedRoute?.id);
  const pricePerPerson = matchedSchedule?.price || 350;
  const vehicle = vehicles.find(v => v.id === vehicleId);
  const vehiclePrice = vehicleId === "v1" ? 0 : 200;
  const totalAmount = pricePerPerson * passengers + vehiclePrice;
  const finalAmount = totalAmount + Math.round(totalAmount * 0.05);

  const formattedDate = dateStr
    ? new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  // Redirect if no booking details
  useEffect(() => {
    if (!fromPort || !toPort || !dateStr) {
      setLocation("/");
    }
  }, []);

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentStatus("processing");

    // Open Razorpay checkout — it handles card form and UPI QR code natively
    const result = await initiatePayment({
      amount: finalAmount,
      name: "FerryBooking",
      description: `${fromPort} → ${toPort} | ${passengers} Passenger(s)`,
      prefill: {
        name: "Demo User",
        email: "demo@ferrybooking.in",
        contact: "9876543210",
      },
      method: selectedMethod === "upi" ? "upi" : undefined,
      themeColor: "#14b8a6",
    });

    setPaymentResult(result);
    setPaymentStatus(result.success ? "success" : "failed");
    setIsProcessing(false);
  };

  const handleProceedToTicket = () => {
    const params = new URLSearchParams({
      from: fromPort,
      to: toPort,
      date: dateStr,
      passengers: passengers.toString(),
      vehicle: vehicleId,
      paymentId: paymentResult?.paymentId || "",
      orderId: paymentResult?.orderId || "",
    });
    setLocation(`/ticket?${params.toString()}`);
  };

  return (
    <PageWrapper className="bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-2xl">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-primary">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Search
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Wallet className="w-6 h-6 text-primary" />
            <h1 className="font-serif text-3xl md:text-4xl font-bold">Complete Payment</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            Secure your ferry booking with a single payment
          </p>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-card border-border shadow-lg mb-6">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Ship className="w-5 h-5 text-primary" />
                Booking Summary
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/15 p-2 rounded-full">
                      <Ship className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{fromPort}</p>
                      <p className="text-xs text-muted-foreground">→ {toPort}</p>
                    </div>
                  </div>
                  {matchedSchedule && (
                    <span className="text-sm text-muted-foreground">{matchedSchedule.time}</span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium">{formattedDate || "Not selected"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Passengers</p>
                    <p className="font-medium">{passengers} Adult(s)</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Vehicle</p>
                    <p className="font-medium">{vehicle?.type || "None"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-medium">{matchedSchedule?.duration || "—"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Price Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-card border-border shadow-lg mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Banknote className="w-5 h-5 text-primary" />
                Price Breakdown
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Ticket ({passengers} × ₹{pricePerPerson.toLocaleString("en-IN")})
                  </span>
                  <span>₹{(pricePerPerson * passengers).toLocaleString("en-IN")}</span>
                </div>
                {vehiclePrice > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vehicle surcharge</span>
                    <span>₹{vehiclePrice.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service fee</span>
                  <span className="text-green-600 dark:text-green-400">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (5%)</span>
                  <span>₹{Math.round(totalAmount * 0.05).toLocaleString("en-IN")}</span>
                </div>

                <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">
                    ₹{finalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Status Display */}
        <AnimatePresence mode="wait">
          {paymentStatus === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center mb-6"
            >
              <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-green-800 dark:text-green-300">
                    Payment Successful! 🎉
                  </h3>
                  <p className="text-green-700 dark:text-green-400 text-sm mb-4">
                    Your booking has been confirmed
                  </p>
                  {paymentResult?.paymentId && (
                    <div className="bg-white dark:bg-green-950/50 rounded-lg p-3 inline-block mb-6">
                      <p className="text-xs text-muted-foreground">Payment ID</p>
                      <p className="font-mono text-sm font-medium">{paymentResult.paymentId}</p>
                    </div>
                  )}
                  <Button
                    onClick={handleProceedToTicket}
                    className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8"
                    size="lg"
                  >
                    View Your Boarding Pass
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : paymentStatus === "failed" ? (
            <motion.div
              key="failed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center mb-6"
            >
              <Card className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center mx-auto mb-4">
                    <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-red-800 dark:text-red-300">
                    Payment Failed
                  </h3>
                  <p className="text-red-700 dark:text-red-400 text-sm mb-6">
                    {paymentResult?.error || "Something went wrong. Please try again."}
                  </p>
                  <Button
                    onClick={() => {
                      setPaymentStatus("idle");
                      setPaymentResult(null);
                    }}
                    variant="outline"
                    className="rounded-full px-8"
                  >
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Payment Method Selection & Button */}
        {paymentStatus === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-card border-border shadow-lg mb-4">
              <CardContent className="p-6">
                {/* Security notice */}
                <div className="flex items-center gap-3 mb-5 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4 text-green-500" />
                  <span>Secured by <strong>Razorpay</strong> — your payment is processed securely</span>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-muted-foreground mb-3 block">
                    Choose Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Card Option */}
                    <button
                      onClick={() => setSelectedMethod("card")}
                      className={`
                        flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all
                        ${
                          selectedMethod === "card"
                            ? "border-primary bg-primary/10 text-primary shadow-sm"
                            : "border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"
                        }
                      `}
                    >
                      <div className={`p-3 rounded-full ${selectedMethod === "card" ? "bg-primary/15" : "bg-muted"}`}>
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-semibold">Credit / Debit Card</span>
                      <span className="text-[10px] text-center leading-tight opacity-70">
                        Visa, Mastercard, RuPay & Amex
                      </span>
                    </button>

                    {/* UPI Option */}
                    <button
                      onClick={() => setSelectedMethod("upi")}
                      className={`
                        flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all
                        ${
                          selectedMethod === "upi"
                            ? "border-primary bg-primary/10 text-primary shadow-sm"
                            : "border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"
                        }
                      `}
                    >
                      <div className={`p-3 rounded-full ${selectedMethod === "upi" ? "bg-primary/15" : "bg-muted"}`}>
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-semibold">UPI</span>
                      <span className="text-[10px] text-center leading-tight opacity-70">
                        Google Pay, PhonePe, Paytm & BHIM
                      </span>
                    </button>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-semibold"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Redirecting to Razorpay...
                    </>
                  ) : (
                    <>
                      {selectedMethod === "card" ? (
                        <CreditCard className="w-5 h-5 mr-2" />
                      ) : (
                        <Smartphone className="w-5 h-5 mr-2" />
                      )}
                      {selectedMethod === "card" ? "Pay with Card" : "Pay with UPI"}
                      {" — ₹" + finalAmount.toLocaleString("en-IN")}
                    </>
                  )}
                </Button>

                {/* Payment methods badges */}
                <div className="flex justify-center gap-4 mt-4 text-muted-foreground">
                  <div className="flex items-center gap-1 text-xs">
                    <Smartphone className="w-3 h-3" /> UPI
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <CreditCard className="w-3 h-3" /> Card
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <ShieldCheck className="w-3 h-3" /> Secured
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
            >
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>256-bit SSL encrypted • PCI DSS compliant • Powered by Razorpay</span>
            </motion.div>
          </motion.div>
        )}
      </div>
    </PageWrapper>
  );
}