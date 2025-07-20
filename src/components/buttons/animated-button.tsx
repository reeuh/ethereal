import { motion } from "framer-motion"
import { Button } from "../ui/button"
import type { ReactNode } from "react"

interface AnimatedButtonProps {
  children: ReactNode
  variant?: "default" | "outline" | "ghost"
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

export default function AnimatedButton({
  children,
  variant = "default",
  className = "",
  onClick,
}: AnimatedButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button variant={variant} className={className} onClick={onClick}>
        {children}
      </Button>
    </motion.div>
  )
}
