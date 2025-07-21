import { motion } from "framer-motion"
import { Separator } from "../../components/ui/separator"
import { Badge } from "../../components/ui/badge"
import { useCheckout } from "../../context/checkout-context"

export default function DirectCheckoutSummary() {
  const { directCheckoutItem } = useCheckout()

  if (!directCheckoutItem) return null

  const subtotal = directCheckoutItem.price * directCheckoutItem.quantity
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg sticky top-8"
    >
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-xl font-light text-slate-800">Order Summary</h3>
        <Badge className="bg-rose-100 text-rose-600 text-xs">Direct Purchase</Badge>
      </div>

      {/* Item */}
      <div className="space-y-4 mb-6">
        <div className="flex gap-4">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-100">
            <img
              src={directCheckoutItem.image || "/placeholder.svg"}
              alt={directCheckoutItem.name}
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-slate-800 line-clamp-2">{directCheckoutItem.name}</h4>
            <p className="text-xs text-slate-500 mt-1">
              Size: {directCheckoutItem.size} • Color: {directCheckoutItem.color}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-slate-500">Qty: {directCheckoutItem.quantity}</span>
              <span className="text-sm font-medium text-slate-800">
                ${(directCheckoutItem.price * directCheckoutItem.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Totals */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Subtotal</span>
          <span className="text-slate-800">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Shipping</span>
          <span className="text-slate-800">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Tax</span>
          <span className="text-slate-800">${tax.toFixed(2)}</span>
        </div>

        <Separator className="my-2" />

        <div className="flex justify-between text-lg font-medium">
          <span className="text-slate-800">Total</span>
          <span className="text-slate-800">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Express Checkout Notice */}
      <div className="mt-4 p-3 bg-gradient-to-r from-rose-50 to-lavender-50 rounded-lg">
        <p className="text-sm text-slate-600 text-center">
          <span className="font-medium text-rose-600">Express Checkout</span>
          <br />
          Skip the cart and buy now!
        </p>
      </div>

      {/* Free Shipping Notice */}
      {subtotal < 100 && (
        <div className="mt-3 p-3 bg-rose-50 rounded-lg">
          <p className="text-sm text-rose-600">Add ${(100 - subtotal).toFixed(2)} more for free shipping!</p>
        </div>
      )}
    </motion.div>
  )
}
