import type { ReactNode } from "react"

export interface Collection {
  id: number
  name: string
  description: string
  image: string
  price: string
}

export interface Feature {
  icon: ReactNode
  title: string
  description: string
}

export interface FooterSection {
  title: string
  links: string[]
}

export type { CartItem, CartState, CartAction } from "./cart"
