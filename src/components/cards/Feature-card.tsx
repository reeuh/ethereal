
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      className="text-center space-y-4"
      variants={staggerItem}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-rose-100 to-lavender-100 text-rose-400"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-lg font-medium text-slate-800">{title}</h3>
      <p className="text-sm text-slate-600 font-light">{description}</p>
    </motion.div>
  )
}
