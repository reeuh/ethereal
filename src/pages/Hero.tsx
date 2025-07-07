import {motion} from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedButton from "../components/buttons/animated-button";

const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeInOut" },
  }
  
  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeInOut" },
  }
const Hero = () => {
  return (
    <section className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={fadeInLeft.initial}
            animate={fadeInLeft.animate}
            transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
          >
            <div className="space-y-4">
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-light text-slate-800 leading-tight"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Timeless
                <motion.span
                  className="block text-rose-400"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Elegance
                </motion.span>
                <motion.span
                  className="block text-sm font-normal text-slate-500 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Discover dresses that celebrate your unique style
                </motion.span>
              </motion.h1>
              <motion.p
                className="text-lg text-slate-600 font-light max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Curated collections of beautiful dresses designed to make every moment feel special.
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <AnimatedButton className="bg-rose-300 hover:bg-rose-400 text-white border-0 px-8 py-3 rounded-full">
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </AnimatedButton>
              <AnimatedButton
                variant="outline"
                className="border-slate-200 text-slate-600 hover:bg-slate-50 px-8 py-3 rounded-full bg-transparent"
              >
                View Lookbook
              </AnimatedButton>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative"
            initial={fadeInRight.initial}
            animate={fadeInRight.animate}
            transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-rose-100 to-lavender-100 rounded-3xl transform rotate-3"
              initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 3, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="/image/dress-hero.jpg"
                alt="Elegant dress collection"
                width={500}
                height={500}
                className="relative rounded-3xl shadow-2xl object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero