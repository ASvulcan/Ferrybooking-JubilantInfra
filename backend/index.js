const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Initialize Razorpay with your test credentials
const razorpay = new Razorpay({
  key_id: "rzp_test_SrIH6Gs6BvTmUN",
  key_secret: "39RAa9QpNfevOziKyYhsSNm3",
});

// Endpoint: Create a new payment order
app.post("/api/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const options = {
      amount: Math.round(amount), // Already in paise
      currency,
      receipt: `receipt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      notes: {
        source: "ferry-booking-app",
      },
    };

    const order = await razorpay.orders.create(options);

    console.log(`✅ Order created: ${order.id} (₹${order.amount / 100})`);

    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("❌ Razorpay order creation failed:", error);
    res.status(500).json({ error: error.message || "Failed to create payment order" });
  }
});

// Endpoint: Verify payment signature
app.post("/api/verify-payment", (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    const expectedSignature = crypto
      .createHmac("sha256", "39RAa9QpNfevOziKyYhsSNm3")
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    const isValid = expectedSignature === signature;

    console.log(`🔐 Signature verification: ${isValid ? "✅ VALID" : "❌ INVALID"}`);

    res.json({ valid: isValid });
  } catch (error) {
    console.error("❌ Signature verification failed:", error);
    res.status(500).json({ error: "Verification failed" });
  }
});

app.listen(PORT, () => {
  console.log(`💰 Payment server running on http://localhost:${PORT}`);
  console.log(`📝 API: POST http://localhost:${PORT}/api/create-order`);
  console.log(`🔑 Razorpay Key: rzp_test_SrIH6Gs6BvTmUN`);
});