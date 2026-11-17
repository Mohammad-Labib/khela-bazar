export const paymentConfig = {
  cod: {
    id: "COD",
    name: "Cash on Delivery",
    fee: 0,
    instructions: "Pay with cash upon delivery at your doorstep.",
  },
  bkash: {
    id: "bKash",
    name: "bKash Personal / Merchant",
    merchantNumber: "01700-112233",
    instructions: "Send money to our bKash merchant number and provide your TrxID.",
  },
  nagad: {
    id: "Nagad",
    name: "Nagad Personal / Merchant",
    merchantNumber: "01800-445566",
    instructions: "Send money to our Nagad merchant number and provide your TrxID.",
  },
  sslcommerz: {
    id: "SSLCommerz",
    name: "SSLCommerz Online Gateway",
    sandboxUrl: "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
    storeId: "khelabazarlive",
    storePass: "khelabazar@sslsecure",
  },
};