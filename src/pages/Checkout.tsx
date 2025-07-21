import { Suspense } from "react"
import CheckoutFlow from "../components/checkout/checkout-flow"
import { CartProvider } from "../context/cart-context"

export default function CheckoutPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-lavender-50">
        <Suspense fallback={<div>Loading checkout...</div>}>
          <CheckoutFlow />
        </Suspense>
      </div>
    </CartProvider>
  )
}
