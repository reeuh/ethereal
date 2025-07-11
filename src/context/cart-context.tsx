
import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { CartState, CartAction } from "../types/cart"

const CartContext = createContext<{
  state: CartState
  dispatch: (action: CartAction) => void
} | null>(null)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id ? { ...item, quantity: Math.max(0, action.payload.quantity) } : item,
          )
          .filter((item) => item.quantity > 0),
      }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      }

    default:
      return state
  }
}

const initialState: CartState = {
  items: [
    // Sample cart items for demonstration
    {
      id: 1,
      name: "Summer Elegance Dress",
      price: 89,
      image: "/image/cart1.jpg",
      size: "M",
      color: "Rose Pink",
      quantity: 2,
    },
    {
      id: 2,
      name: "Evening Grace Gown",
      price: 149,
      image: "/image/cart2.jpg",
      size: "S",
      color: "Lavender",
      quantity: 1,
    },
    {
      id: 3,
      name: "Casual Chic",
      price: 149,
      image: "/image/cart3.jpg",
      size: "S",
      color: "Lavender",
      quantity: 1,
    },
  ],
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
