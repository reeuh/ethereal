import { Star, Heart, ShoppingBag } from "lucide-react"
import type { Collection, Feature, FooterSection } from "../types"

export const collections: Collection[] = [
  {
    id: 1,
    name: "Summer Elegance",
    description: "Light, flowing dresses perfect for warm days",
    image: "/placeholder.svg?height=400&width=300",
    price: "From $89",
  },
  {
    id: 2,
    name: "Evening Grace",
    description: "Sophisticated pieces for special occasions",
    image: "/placeholder.svg?height=400&width=300",
    price: "From $149",
  },
  {
    id: 3,
    name: "Casual Chic",
    description: "Effortless style for everyday moments",
    image: "/placeholder.svg?height=400&width=300",
    price: "From $69",
  },
]

export const features: Feature[] = [
  {
    icon: <Star className="h-5 w-5" />,
    title: "Premium Quality",
    description: "Carefully curated fabrics and craftsmanship",
  },
  {
    icon: <Heart className="h-5 w-5" />,
    title: "Sustainable Fashion",
    description: "Ethically sourced and environmentally conscious",
  },
  {
    icon: <ShoppingBag className="h-5 w-5" />,
    title: "Free Shipping",
    description: "Complimentary delivery on orders over $100",
  },
]

export const footerSections: FooterSection[] = [
  { title: "Shop", links: ["New Arrivals", "Dresses", "Sale"] },
  { title: "Support", links: ["Size Guide", "Returns", "Contact"] },
  { title: "Connect", links: ["Instagram", "Pinterest", "Newsletter"] },
]
