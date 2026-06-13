import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { Copy, CheckCircle2, Smartphone, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface UPIQRCodeProps {
  amount: number;
  upiId?: string;
  name?: string;
  note?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function UPIQRCode({
  amount,
  upiId = "ferrybooking@oksbi",
  name = "FerryBooking",
  note = "Ferry ticket booking payment",
  onSuccess,
  onCancel,
}: UPIQRCodeProps) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [transactionId, setTransactionId] = useState("");

  // Generate a unique transaction reference
  useEffect(() => {
    setTransactionId(`FBOOK${Date.now().toString().slice(-8)}${Math.random().toString(36).slice(2, 6).toUpperCase()}`);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Generate UPI payment URL
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(`${note} - Ref: ${transactionId}`)}`;

  // Copy UPI ID to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const isExpired = timeLeft <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full"
    >
      <Card className="bg-card border-border shadow-xl overflow-hidden">
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/15 mb-4">
              <Smartphone className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-1">Scan to Pay with UPI</h3>
            <p className="text-sm text-muted-foreground">
              Use any UPI app to scan this QR code
            </p>
          </div>

          {/* Timer */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Clock className={`w-4 h-4 ${isExpired ? 'text-red-500' : 'text-muted-foreground'}`} />
            <span className={`text-sm font-medium ${isExpired ? 'text-red-500' : 'text-muted-foreground'}`}>
              {isExpired ? "QR Code Expired" : `Expires in ${formatTime(timeLeft)}`}
            </span>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {isExpired ? (
                <div className="w-56 h-56 bg-muted rounded-xl flex items-center justify-center border-2 border-border">
                  <div className="text-center p-6">
                    <RefreshCw className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">QR Code has expired</p>
                    <p className="text-xs text-muted-foreground mt-1">Please try again</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-white p-4 rounded-xl shadow-inner">
                    <QRCodeSVG
                      value={upiUrl}
                      size={200}
                      level="H"
                      includeMargin={true}
                      fgColor="#1e293b"
                    />
                  </div>
                  {/* UPI Logo overlay */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1.5 shadow-lg">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">UPI</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Amount Display */}
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground mb-1">Amount to Pay</p>
            <p className="text-3xl font-bold text-primary">₹{amount.toLocaleString("en-IN")}</p>
          </div>

          {/* UPI ID with Copy */}
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <p className="text-xs text-muted-foreground mb-2">Or send to UPI ID:</p>
            <div className="flex items-center justify-between gap-2">
              <code className="text-sm font-mono font-medium">{upiId}</code>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-8 px-3"
                disabled={isExpired}
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500 text-xs">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    <span className="text-xs">Copy</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Transaction Reference */}
          <div className="bg-primary/5 rounded-lg p-3 mb-6">
            <p className="text-xs text-muted-foreground text-center">
              Transaction Ref: <span className="font-mono font-medium text-foreground">{transactionId}</span>
            </p>
          </div>

          {/* Supported Apps */}
          <div className="mb-6">
            <p className="text-xs text-muted-foreground text-center mb-3">Supported Apps</p>
            <div className="flex justify-center gap-3 flex-wrap">
              {["GPay", "PhonePe", "Paytm", "BHIM", "Amazon Pay"].map((app) => (
                <span
                  key={app}
                  className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onSuccess}
              disabled={isExpired}
              className="w-full rounded-xl py-6 text-base font-semibold bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              I've Completed the Payment
            </Button>
            <Button
              onClick={onCancel}
              variant="outline"
              className="w-full rounded-xl py-6 text-base"
              size="lg"
            >
              Cancel
            </Button>
          </div>

          {/* Security Note */}
          <p className="text-[10px] text-muted-foreground text-center mt-4">
            This is a demo payment. No real money will be charged.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}