import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { ScrollArea } from "../../components/ui/scroll-area"
import CartItem from "../carts/cart-item"
import { useCart } from "../../context/cart-context"
import AnimatedButton from "../../components/buttons/animated-button"

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { state } = useCart()
  const { items } = state

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  }

  const itemsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`sm:max-w-md w-full max-h-[90vh] p-0 gap-0 bg-white border-0 shadow-2xl ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col h-full"
        >
          {/* Header */}
          <DialogHeader className="px-6 py-4 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-light text-slate-800 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-rose-400" />
                Shopping Cart
              </DialogTitle>
            </div>
          </DialogHeader>

          {/* Content */}
          <ScrollArea className="flex-1 overflow-y-auto">
            <motion.div variants={itemsVariants} className="flex flex-col gap-4 p-6">
              {items.map((item) => (
                <CartItem key={item.id} item={item} index={0} />
              ))}
            </motion.div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-6 border-t border-slate-100">
            <div className="flex justify-between mb-4">
              <span className="text-lg font-medium text-slate-800">
                Total: ${totalPrice.toFixed(2)}
              </span>
              <span className="text-lg font-medium text-slate-800">
                Items: {totalItems}
              </span>
            </div>
            <AnimatedButton onClick={onClose}>Close</AnimatedButton>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}