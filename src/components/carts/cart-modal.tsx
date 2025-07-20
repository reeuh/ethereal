import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { Separator } from "../../components/ui/separator"
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
      <DialogContent className="sm:max-w-md w-full max-h-[90vh] p-0 gap-0 bg-white border-0 shadow-2xl justify-center">
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
                {totalItems > 0 && (
                  <motion.span
                    className="bg-rose-100 text-rose-600 text-xs px-2 py-1 rounded-full font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </DialogTitle>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            {items.length === 0 ? (
              <motion.div
                className="flex-1 flex flex-col items-center justify-center p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-rose-100 to-lavender-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">Your cart is empty</h3>
                <p className="text-sm text-slate-500 mb-6">Add some beautiful dresses to get started!</p>
                <AnimatedButton
                  onClick={onClose}
                  className="bg-rose-300 hover:bg-rose-400 text-white px-6 py-2 rounded-full"
                >
                  Continue Shopping
                </AnimatedButton>
              </motion.div>
            ) : (
              <>
                {/* Cart Items */}
                <ScrollArea className="flex-1 px-4 sm:px-6">
                  <motion.div className="py-4 space-y-4" variants={itemsVariants} initial="hidden" animate="visible">
                    {items.map((item, index) => (
                      <CartItem key={item.id} item={item} index={index} />
                    ))}
                  </motion.div>
                </ScrollArea>

                {/* Footer */}
                <div className="border-t border-slate-100 p-4 sm:p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Shipping</span>
                      <span className="text-rose-400">Free</span>
                    </div>
                    <Separator />
                    <motion.div
                      className="flex justify-between text-lg font-medium text-slate-800"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </motion.div>
                  </div>

                  <div className="space-y-3">
                    <AnimatedButton className="w-full bg-rose-300 hover:bg-rose-400 text-white py-3 rounded-full text-base font-medium">
                      Proceed to Checkout
                    </AnimatedButton>
                    <AnimatedButton
                      variant="outline"
                      onClick={onClose}
                      className="w-full border-slate-200 text-slate-600 hover:bg-slate-50 py-3 rounded-full bg-transparent"
                    >
                      Continue Shopping
                    </AnimatedButton>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
