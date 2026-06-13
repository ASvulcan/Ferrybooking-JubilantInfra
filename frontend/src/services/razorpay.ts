// Razorpay Integration for Ferry Booking App
// Uses real Razorpay orders created via backend server

// Use relative URL so it works locally and on Vercel
// In development with the Express backend running, this proxies to localhost:3001
// On Vercel, this calls the serverless functions in /api
// Key ID comes from VITE_RAZORPAY_KEY_ID (.env file) or Vercel env vars
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_SrIH6Gs6BvTmUN";
const BACKEND_URL = "/api";

// Creates a real payment order via the backend server
async function createOrder(amount: number, currency = "INR"): Promise<{ id: string; amount: number; currency: string }> {
  const response = await fetch(`${BACKEND_URL}/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: Math.round(amount), currency }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Server error: ${response.status}`);
  }

  return response.json();
}

// Load the Razorpay checkout script dynamically
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export interface PaymentDetails {
  amount: number;
  currency?: string;
  name: string;
  description: string;
  image?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
    method?: string;
  };
  themeColor?: string;
  /** Payment method hint: "card", "netbanking", "wallet", "upi" */
  method?: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  orderId?: string;
  signature?: string;
  error?: string;
}

/**
 * Initiate a Razorpay payment with real orders via backend
 */
export async function initiatePayment(
  details: PaymentDetails
): Promise<PaymentResult> {
  try {
    // 1. Load Razorpay SDK
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      return { success: false, error: "Failed to load Razorpay SDK. Please check your internet connection." };
    }

    // 2. Create a real order via the backend server
    console.log("🔄 Creating Razorpay order...");
    const order = await createOrder(details.amount, details.currency || "INR");
    console.log(`✅ Order created: ${order.id}`);

    // 3. Build prefill object
    const prefill: Record<string, string> = {
      name: details.prefill?.name || "Demo User",
      email: details.prefill?.email || "demo@ferrybooking.in",
      contact: details.prefill?.contact || "9876543210",
    };

    // 4. Set payment method hint when specified
    if (details.method) {
      prefill.method = details.method;
    }

    // 5. Open Razorpay checkout
    return new Promise<PaymentResult>((resolve) => {
      const razorpay = new window.Razorpay({
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: details.name,
        description: details.description,
        image: details.image || "/favicon.svg",
        order_id: order.id,
        prefill,
        theme: {
          color: details.themeColor || "#14b8a6",
        },
        handler: (response: RazorpayResponse) => {
          resolve({
            success: true,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
          });
        },
        modal: {
          ondismiss: () => {
            resolve({ success: false, error: "Payment cancelled by user" });
          },
        },
      });

      razorpay.open();
    });
  } catch (error) {
    console.error("❌ Razorpay payment error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Payment processing failed. Please try again.",
    };
  }
}

/**
 * Verify payment signature via backend
 */
export async function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): Promise<boolean> {
  try {
    const response = await fetch(`${BACKEND_URL}/verify-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, paymentId, signature }),
    });
    const data = await response.json();
    return data.valid;
  } catch {
    return false;
  }
}