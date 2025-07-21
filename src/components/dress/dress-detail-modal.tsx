import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Heart, ShoppingBag, Truck, Shield, RotateCcw, CreditCard } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Dialog, DialogContent } from "../../components/ui/dialog"
import { Badge } from "../../components/ui/badge"
import { Separator } from "../../components/ui/separator"
import AnimatedButton from "../../components/buttons/animated-button"
import { useCart } from "../../context/cart-context"
import { useCheckout } from "../../context/checkout-context"
import type { Dress } from "../../types/dress"

interface DressDetailModalProps {
  dress: Dress
  isOpen: boolean
  onClose: () => void
}

export default function DressDetailModal({ dress, isOpen, onClose }: DressDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState(dress.sizes[0])
  const [selectedColor, setSelectedColor] = useState(dress.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { dispatch } = useCart()
  const { setDirectCheckoutItem } = useCheckout()
  const navigate = useNavigate()

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: dress.id,
          name: dress.name,
          price: dress.price,
          image: dress.image,
          size: selectedSize,
          color: selectedColor,
        },
      })
    }
    onClose()
  }

  const handleDirectCheckout = () => {
    const checkoutItem = {
      id: dress.id,
      name: dress.name,
      price: dress.price,
      image: dress.image,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    }

    // Set the item for direct checkout
    setDirectCheckoutItem(checkoutItem)
    onClose()

    // Navigate to checkout with direct purchase flag
    navigate("/checkout?direct=true")
  }

  const discountPercentage = dress.originalPrice
    ? Math.round(((dress.originalPrice - dress.price) / dress.originalPrice) * 100)
    : 0

  const totalPrice = dress.price * quantity

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] p-0 gap-0 bg-white border-0 shadow-2xl overflow-y-auto">
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="grid md:grid-cols-2 h-full"
        >
          {/* Image Section */}
          <div className="relative bg-gradient-to-br from-rose-50 to-lavender-50">
            <img
              src={dress.image || "/placeholder.svg"}
              alt={dress.name}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {dress.isNew && <Badge className="bg-rose-400 text-white border-0">New</Badge>}
              {discountPercentage > 0 && (
                <Badge className="bg-green-500 text-white border-0">-{discountPercentage}%</Badge>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-rose-400 uppercase tracking-wide">{dress.category}</p>
                <h2 className="text-2xl font-light text-slate-800">{dress.name}</h2>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(dress.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600">
                    {dress.rating} ({dress.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-light text-slate-800">${dress.price}</span>
                {dress.originalPrice && (
                  <span className="text-lg text-slate-500 line-through">${dress.originalPrice}</span>
                )}
              </div>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed">{dress.description}</p>

              {/* Features */}
              <div className="space-y-2">
                <h4 className="font-medium text-slate-800">Features:</h4>
                <ul className="space-y-1">
                  {dress.features.map((feature, index) => (
                    <li key={index} className="text-sm text-slate-600 flex items-center gap-2">
                      <div className="w-1 h-1 bg-rose-400 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              {/* Size Selection */}
              <div className="space-y-3">
                <h4 className="font-medium text-slate-800">Size:</h4>
                <div className="flex flex-wrap gap-2">
                  {dress.sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? "border-rose-400 bg-rose-50 text-rose-600"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-3">
                <h4 className="font-medium text-slate-800">Color:</h4>
                <div className="flex flex-wrap gap-2">
                  {dress.colors.map((color) => (
                    <motion.button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                        selectedColor === color
                          ? "border-rose-400 bg-rose-50 text-rose-600"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {color}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <h4 className="font-medium text-slate-800">Quantity:</h4>
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-50"
                    whileTap={{ scale: 0.9 }}
                  >
                    -
                  </motion.button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <motion.button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-50"
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                </div>
              </div>

              {/* Total Price Display */}
              {quantity > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-rose-50 p-4 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Total ({quantity} items):</span>
                    <span className="text-xl font-medium text-slate-800">${totalPrice.toFixed(2)}</span>
                  </div>
                </motion.div>
              )}

              <Separator />

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Primary Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <AnimatedButton
                    onClick={handleAddToCart}
                    disabled={!dress.inStock}
                    variant="outline"
                    className="border-rose-300 text-rose-600 hover:bg-rose-50 py-3 md:py-2 md:text-sm"
                  >
                    <ShoppingBag className="h-4 w-4  md:h-2 md:w-2 mr-2" />
                    Add to Cart
                  </AnimatedButton>

                  <motion.button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="p-3 md:p-1 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart className={`h-4 w-4 md:h-3 md:w-3 ${isWishlisted ? "fill-rose-400 text-rose-400" : "text-slate-600"}`} />
                  </motion.button>
                </div>

                {/* Direct Checkout Button */}
                <AnimatedButton
                  onClick={handleDirectCheckout}
                  disabled={!dress.inStock}
                  className="w-full bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white border-0 py-4 text-lg font-medium shadow-lg"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  {dress.inStock ? "Proceed to Checkout" : "Out of Stock"}
                </AnimatedButton>

                {/* Security Notice */}
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 bg-green-50 p-2 rounded-lg">
                  <Shield className="h-3 w-3 text-green-600" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
              </div>

              {/* Service Info */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center space-y-2">
                  <Truck className="h-5 w-5 text-rose-400 mx-auto" />
                  <p className="text-xs text-slate-600">Free Shipping</p>
                </div>
                <div className="text-center space-y-2">
                  <RotateCcw className="h-5 w-5 text-rose-400 mx-auto" />
                  <p className="text-xs text-slate-600">Easy Returns</p>
                </div>
                <div className="text-center space-y-2">
                  <Shield className="h-5 w-5 text-rose-400 mx-auto" />
                  <p className="text-xs text-slate-600">Secure Payment</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
