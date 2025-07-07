import {motion} from "framer-motion"
import Logo from "./Logo"
import { Button } from "./ui/button"
import { ShoppingBag } from "lucide-react"


const navigationItems = ["Collections", "About", "Contact"]
const Navigation = () => {
  return (
    <motion.header
    className="relative z-10 px-4 py-6 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>
        <nav className="flex items-center justify-between">
            <Logo/>

            <div className="items-center space-x-8 md:flex hidden">
                {navigationItems.map((item, index) => 
                        <motion.div
                        key={item}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}>
                            <a href="#" className="text-sm font-medium text-slate-800 hover:text-rose-400 transition-colors">
                                {item}
                            </a>
                        </motion.div>)}
            </div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-rose-400">
                <ShoppingBag className="h-4 w-4" />
                </Button>
            </motion.div>
        </nav>
      </motion.header>
  )
}

export default Navigation