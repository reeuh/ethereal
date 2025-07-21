import { createContext, useContext, useState, type ReactNode } from "react"
import type { CartItem } from "../types/cart"

interface CheckoutContextType {
  directCheckoutItem: CartItem | null
  setDirectCheckoutItem: (item: CartItem | null) => void
  isDirectCheckout: boolean
}

const CheckoutContext = createContext<CheckoutContextType | null>(null)

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [directCheckoutItem, setDirectCheckoutItem] = useState<CartItem | null>(null)

  const isDirectCheckout = directCheckoutItem !== null

  return (
    <CheckoutContext.Provider
      value={{
        directCheckoutItem,
        setDirectCheckoutItem,
        isDirectCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}

export function useCheckout() {
  const context = useContext(CheckoutContext)
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider")
  }
  return context
}
