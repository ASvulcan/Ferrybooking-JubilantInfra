// Vercel Serverless Function — Verify Payment Signature
const crypto = require("crypto");

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
    const { orderId, paymentId, signature } = req.body;

    if (!orderId || !paymentId || !signature) {
      return res.status(400).json({ error: "Missing required fields: orderId, paymentId, signature" });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET || "39RAa9QpNfevOziKyYhsSNm3";

    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    const isValid = expectedSignature === signature;

    console.log(`🔐 Signature verification: ${isValid ? "✅ VALID" : "❌ INVALID"}`);

    return res.status(200).json({ valid: isValid });
  } catch (error) {
    console.error("❌ Signature verification failed:", error);
    return res.status(500).json({ error: "Verification failed" });
  }
}