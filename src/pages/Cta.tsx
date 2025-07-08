
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import AnimatedButton from "../components/buttons/animated-button"

export default function CTASection() {
  return (
    <motion.section
      className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-r from-rose-100 via-white to-lavender-100"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto max-w-4xl text-center space-y-8">
        <motion.h2
          className="text-3xl sm:text-4xl font-light text-slate-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Ready to Find Your Perfect Dress?
        </motion.h2>
        <motion.p
          className="text-lg text-slate-600 font-light max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Join thousands of women who have discovered their signature style with our curated collections.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <AnimatedButton className="bg-rose-300 hover:bg-rose-400 text-white border-0 px-8 py-3 rounded-full text-lg">
            Shop Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </AnimatedButton>
          <AnimatedButton
            variant="outline"
            className="border-slate-200 text-slate-600 hover:bg-white px-8 py-3 rounded-full text-lg bg-transparent"
          >
            Subscribe for Updates
          </AnimatedButton>
        </motion.div>
      </div>
    </motion.section>
  )
}
