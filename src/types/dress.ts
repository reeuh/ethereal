export interface Dress {
    id: number
    name: string
    price: number
    originalPrice?: number | null
    image: string
    category: string
    description: string
    features: string[]
    sizes: string[]
    colors: string[]
    inStock: boolean
    isNew: boolean
    rating: number
    reviews: number
  }
  
  export interface DressData {
    featuredDresses: Dress[]
  }
  