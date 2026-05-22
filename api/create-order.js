// Vercel Serverless Function — Create Razorpay Order
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_SrIH6Gs6BvTmUN",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "39RAa9QpNfevOziKyYhsSNm3",
});

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { amount, currency = "INR" } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const options = {
      amount: Math.round(amount),
      currency,
      receipt: `receipt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      notes: {
        source: "ferry-booking-app",
      },
    };

    const order = await razorpay.orders.create(options);

    console.log(`✅ Order created: ${order.id} (₹${order.amount / 100})`);

    return res.status(200).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("❌ Razorpay order creation failed:", error);
    return res.status(500).json({ error: error.message || "Failed to create payment order" });
  }
}