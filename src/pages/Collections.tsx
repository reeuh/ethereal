import { motion } from "framer-motion"
import DressCard from "../components/dress/dress-card"
import dressData from "../data/dresses.json"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function CollectionsSection() {
  const { featuredDresses } = dressData

  return (
    <motion.section
      className="px-4 py-20 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
          <h2 className="text-3xl sm:text-4xl font-light text-slate-800">Featured Dress Collections</h2>
          <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
            Discover our carefully curated selection of dresses, each piece chosen for its exceptional quality and
            timeless appeal.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {featuredDresses.map((dress, index) => (
            <DressCard key={dress.id} dress={dress} index={index} />
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            className="px-8 py-3 border-2 border-rose-300 text-rose-400 hover:bg-rose-300 hover:text-white rounded-full font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Collections
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}
