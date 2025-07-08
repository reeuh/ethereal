
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import AnimatedButton from "../buttons/animated-button"
import type { Collection } from "../../types/collections"

interface CollectionCardProps {
  collection: Collection
  index: number
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <img
                src={collection.image || "/placeholder.svg"}
                alt={collection.name}
                width={300}
                height={400}
                className="w-full h-80 object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium text-slate-800">{collection.name}</h3>
              <span className="text-sm font-medium text-rose-400">{collection.price}</span>
            </div>
            <p className="text-sm text-slate-600 font-light">{collection.description}</p>
            <AnimatedButton variant="ghost" className="w-full text-rose-400 hover:text-rose-500 hover:bg-rose-50 mt-4">
              Explore Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </AnimatedButton>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
