
import { motion } from "framer-motion"
import type {Variants} from "framer-motion"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "../../components/ui/button"
import { useCart } from "../../context/cart-context"
import type { CartItem as CartItemType } from "../../types/cart"

interface CartItemProps {
  item: CartItemType
  index: number
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
}

export default function CartItem({ item }: CartItemProps) {
  const { dispatch } = useCart()

  const handleUpdateQuantity = (newQuantity: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: item.id, quantity: newQuantity },
    })
  }

  const handleRemoveItem = () => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: item.id,
    })
  }

  return (
    <motion.div
      variants={itemVariants}
      className="flex gap-4 p-4 bg-gradient-to-r from-rose-50/50 to-lavender-50/50 rounded-2xl border border-slate-100"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* Product Image */}
      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white shadow-sm">
        <img src={item.image || "/placeholder.svg"} alt={item.name} className="object-cover" />
      </div>

      {/* Product Details */}
      <div className="flex-1 space-y-2">
        <div>
          <h4 className="font-medium text-slate-800 text-sm leading-tight">{item.name}</h4>
          <div className="flex gap-3 text-xs text-slate-500 mt-1">
            <span>Size: {item.size}</span>
            <span>•</span>
            <span>Color: {item.color}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUpdateQuantity(item.quantity - 1)}
                className="h-8 w-8 p-0 rounded-full border-slate-200 hover:bg-rose-50 hover:border-rose-200"
                disabled={item.quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
            </motion.div>

            <motion.span
              className="w-8 text-center text-sm font-medium text-slate-800"
              key={item.quantity}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {item.quantity}
            </motion.span>

            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUpdateQuantity(item.quantity + 1)}
                className="h-8 w-8 p-0 rounded-full border-slate-200 hover:bg-rose-50 hover:border-rose-200"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </motion.div>
          </div>

          {/* Price and Remove */}
          <div className="flex items-center gap-3">
            <motion.span
              className="font-medium text-slate-800"
              key={item.quantity * item.price}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              ${(item.price * item.quantity).toFixed(2)}
            </motion.span>

            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveItem}
                className="h-8 w-8 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div >
  )
}
