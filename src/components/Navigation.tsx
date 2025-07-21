import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import { Button } from "../components/ui/button"
import Logo from "../components/Logo"
import { useCart } from "../context/cart-context"
import CartModal from "../components/carts/cart-modal"

const navigationItems = ["Collections", "About", "Contact"]

export default function Navigation() {
  const { state } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
    className={`fixed top-0 left-0 w-full z-30 px-4 py-6 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isScrolled ? "bg-white shadow" : "bg-transparent"
    }`}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    >
      <nav className="flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <a href="#" className="text-sm font-light text-slate-600 hover:text-rose-400 transition-colors">
                {item}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-600 hover:text-rose-400 relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag className="h-4 w-4" />
            {totalItems > 0 && (
              <motion.span
                className="absolute -top-1 -right-1 bg-rose-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {totalItems}
              </motion.span>
            )}
          </Button>
        </motion.div>

        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </nav>
    </motion.header>
  )
}

