
import { motion } from "framer-motion"
import CollectionCard from "../components/cards/collection-cards"
import { collections } from "../lib/Constants"

import { easeOut } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOut },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function CollectionsSection() {
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
          <h2 className="text-3xl sm:text-4xl font-light text-slate-800">Featured Collections</h2>
          <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
            Discover our carefully curated selection of dresses, each piece chosen for its exceptional quality and
            timeless appeal.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {collections.map((collection, index) => (
            <CollectionCard key={collection.id} collection={collection} index={index} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
