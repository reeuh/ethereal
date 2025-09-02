
import { motion } from "framer-motion"
import Logo from "../components/Logo"
import { footerSections } from "../lib/Constants"

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export default function Footer() {
  return (
    <motion.footer
      className="px-4 py-12 sm:px-6 lg:px-8 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="grid md:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div className="space-y-4" variants={staggerItem}>
            <Logo />
            <p className="text-sm text-slate-600 font-light">Lorem ipsum dolor sit amet</p>
          </motion.div>

          {footerSections.map((section) => (
            <motion.div key={section.title} className="space-y-4" variants={staggerItem}>
              <h4 className="text-sm font-medium text-slate-800">{section.title}</h4>
              <div className="space-y-2">
                {section.links.map((link) => (
                  <motion.div
                    key={link}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <a href="#" className="block text-sm text-slate-600 hover:text-rose-400 transition-colors">
                      {link}
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 pt-8 border-t border-slate-100 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-sm text-slate-500 font-light">
            © {new Date().getFullYear()} Ethereal. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
