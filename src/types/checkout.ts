export interface CheckoutStep {
    id: number
    title: string
    description: string
  }
  
  export interface ShippingInfo {
    firstName: string
    lastName: string
    email: string
    phone?: string
    address: string
    apartment?: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  
  export interface PaymentInfo {
    paymentMethod: string
    cardNumber: string
    expiryDate: string
    cvv: string
    cardholderName: string
  }
  