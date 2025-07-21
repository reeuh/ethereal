import { motion } from "framer-motion"
import { Separator } from "../../components/ui/separator"
import { useCart } from "../../context/cart-context"

export default function OrderSummary() {
  const { state } = useCart()
  const { items } = state

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg sticky top-8"
    >
      <h3 className="text-xl font-light text-slate-800 mb-6">Order Summary</h3>

      {/* Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-100">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-slate-800 truncate">{item.name}</h4>
              <p className="text-xs text-slate-500">
                Size: {item.size} • Color: {item.color}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-slate-500">Qty: {item.quantity}</span>
                <span className="text-sm font-medium text-slate-800">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
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

      {/* Free Shipping Notice */}
      {subtotal < 100 && (
        <div className="mt-4 p-3 bg-rose-50 rounded-lg">
          <p className="text-sm text-rose-600">Add ${(100 - subtotal).toFixed(2)} more for free shipping!</p>
        </div>
      )}
    </motion.div>
  )
}
