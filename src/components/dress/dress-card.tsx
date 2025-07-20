import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Star, ShoppingBag } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import AnimatedButton from "../../components/buttons/animated-button"
import DressDetailModal from "./dress-detail-modal"
import { useCart } from "../../context/cart-context"
import type { Dress } from "../../types/dress"

interface DressCardProps {
  dress: Dress
  index: number
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export default function DressCard({ dress, index }: DressCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { dispatch } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: dress.id,
        name: dress.name,
        price: dress.price,
        image: dress.image,
        size: dress.sizes[0], // Default to first available size
        color: dress.colors[0], // Default to first available color
      },
    })
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  const discountPercentage = dress.originalPrice
    ? Math.round(((dress.originalPrice - dress.price) / dress.originalPrice) * 100)
    : 0

  return (
    <>
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="group cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-0">
            {/* Image Container */}
            <div className="relative overflow-hidden">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="relative h-80 w-full">
                <img
                  src={dress.image || "/placeholder.svg"}
                  alt={dress.name}
                  className="object-cover w-full"
                />

                {/* Overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {dress.isNew && <Badge className="bg-rose-400 hover:bg-rose-500 text-white border-0">New</Badge>}
                {discountPercentage > 0 && (
                  <Badge className="bg-green-500 hover:bg-green-600 text-white border-0">-{discountPercentage}%</Badge>
                )}
                {!dress.inStock && (
                  <Badge variant="secondary" className="bg-slate-500 text-white border-0">
                    Out of Stock
                  </Badge>
                )}
              </div>

              {/* Wishlist Button */}
              <motion.button
                className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleWishlistToggle}
              >
                <Heart
                  className={`h-4 w-4 transition-colors ${
                    isWishlisted ? "fill-rose-400 text-rose-400" : "text-slate-600"
                  }`}
                />
              </motion.button>

              {/* Quick Add to Cart - appears on hover */}
              <motion.div
                className="absolute bottom-3 left-3 right-3"
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatedButton
                  onClick={handleAddToCart}
                  disabled={!dress.inStock}
                  className="w-full bg-white/90 hover:bg-white text-slate-800 border-0 backdrop-blur-sm shadow-lg"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Quick Add
                </AnimatedButton>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-3">
              {/* Category */}
              <p className="text-xs font-medium text-rose-400 uppercase tracking-wide">{dress.category}</p>

              {/* Name */}
              <h3 className="text-lg font-medium text-slate-800 line-clamp-2 group-hover:text-rose-600 transition-colors">
                {dress.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(dress.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-500">
                  {dress.rating} ({dress.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold text-slate-800">${dress.price}</span>
                {dress.originalPrice && (
                  <span className="text-sm text-slate-500 line-through">${dress.originalPrice}</span>
                )}
              </div>

              {/* Shop Now Button */}
              <AnimatedButton
                className="w-full bg-rose-300 hover:bg-rose-400 text-white border-0 mt-4"
                disabled={!dress.inStock}
              >
                {dress.inStock ? "Shop Now" : "Out of Stock"}
              </AnimatedButton>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detail Modal */}
      <DressDetailModal dress={dress} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
