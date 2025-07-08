
import { motion } from "framer-motion"
import FeatureCard from "../components/cards/Feature-card"
import { features } from "../lib/Constants"

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function FeaturesSection() {
  return (
    <motion.section
      className="px-4 py-16 sm:px-6 lg:px-8 bg-white/50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
