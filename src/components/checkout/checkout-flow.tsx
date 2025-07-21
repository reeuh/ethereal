import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Shield, Lock } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Progress } from "../../components/ui/progress"
import { useCart } from "../../context/cart-context"
import { useCheckout } from "../../context/checkout-context"
import OrderSummary from "./order-summary"
import DirectCheckoutSummary from "./direct-checkout-summary"
import ShippingForm from "./shipping-form"
import PaymentForm from "./payment"
import OrderConfirmation from "./order-confirmation"
import type { CheckoutStep, ShippingInfo, PaymentInfo } from "../../types/checkout"
import type { CartItem } from "../../types/cart"

const steps: CheckoutStep[] = [
  { id: 1, title: "Shipping", description: "Enter your delivery address" },
  { id: 2, title: "Payment", description: "Choose your payment method" },
  { id: 3, title: "Confirmation", description: "Review and confirm your order" },
]

export default function CheckoutFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null)
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const { state } = useCart()
  const { directCheckoutItem, isDirectCheckout } = useCheckout()
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const isDirect = searchParams.get("direct") === "true"

  // Get items for checkout (either cart items or direct checkout item)
  const checkoutItems = (isDirectCheckout && isDirect)
    ? [directCheckoutItem].filter((item): item is CartItem => item !== null)
    : state.items

  // Redirect if no items to checkout
  useEffect(() => {
    if (checkoutItems.length === 0 && !orderComplete) {
      navigate("/")
    }
  }, [checkoutItems.length, orderComplete, navigate])

  const handleStepComplete = (step: number, data: any) => {
    switch (step) {
      case 1:
        setShippingInfo(data)
        setCurrentStep(2)
        break
      case 2:
        setPaymentInfo(data)
        setCurrentStep(3)
        break
      case 3:
        handleOrderSubmit()
        break
    }
  }

  const handleOrderSubmit = async () => {
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Here you would integrate with your payment processor
      // const paymentResult = await processPayment(paymentInfo, orderTotal)

      setOrderComplete(true)
      setCurrentStep(4)
    } catch (error) {
      console.error("Payment failed:", error)
      // Handle payment error
    } finally {
      setIsProcessing(false)
    }
  }

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100

  if (checkoutItems.length === 0 && !orderComplete) {
    return null
  }

  return (
    <div className="min-h-screen">

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="text-slate-600 hover:text-rose-400">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {isDirect ? "Back to Product" : "Back to Shopping"}
          </Button>
        </motion.div>

        {/* Direct Checkout Badge */}
        {isDirect && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 to-lavender-100 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-slate-700">Express Checkout</span>
            </div>
          </motion.div>
        )}

        {/* Progress Bar */}
        {currentStep < 4 && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className={`flex items-center ${index < steps.length - 1 ? "flex-1" : ""}`}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= step.id ? "bg-rose-400 text-white" : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {step.id}
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-sm font-medium text-slate-800">{step.title}</p>
                      <p className="text-xs text-slate-500">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && <div className="flex-1 h-px bg-slate-200 mx-4 mt-5" />}
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-2" />
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <ShippingForm
                  key="shipping"
                  onComplete={(data) => handleStepComplete(1, data)}
                  initialData={shippingInfo}
                />
              )}
              {currentStep === 2 && (
                <PaymentForm
                  key="payment"
                  onComplete={(data) => handleStepComplete(2, data)}
                  onBack={() => setCurrentStep(1)}
                  initialData={paymentInfo}
                />
              )}
              {currentStep === 3 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <h2 className="text-2xl font-light text-slate-800 mb-6">Review Your Order</h2>

                  {/* Order Review */}
                  <div className="space-y-6">
                    {/* Shipping Info */}
                    <div className="border border-slate-200 rounded-lg p-4">
                      <h3 className="font-medium text-slate-800 mb-2">Shipping Address</h3>
                      {shippingInfo && (
                        <div className="text-sm text-slate-600">
                          <p>
                            {shippingInfo.firstName} {shippingInfo.lastName}
                          </p>
                          <p>{shippingInfo.address}</p>
                          <p>
                            {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                          </p>
                          <p>{shippingInfo.country}</p>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentStep(1)}
                        className="mt-2 text-rose-400 hover:text-rose-500"
                      >
                        Edit
                      </Button>
                    </div>

                    {/* Payment Info */}
                    <div className="border border-slate-200 rounded-lg p-4">
                      <h3 className="font-medium text-slate-800 mb-2">Payment Method</h3>
                      {paymentInfo && (
                        <div className="text-sm text-slate-600">
                          <p>**** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
                          <p>{paymentInfo.cardholderName}</p>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentStep(2)}
                        className="mt-2 text-rose-400 hover:text-rose-500"
                      >
                        Edit
                      </Button>
                    </div>

                    {/* Security Notice */}
                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-green-50 p-3 rounded-lg">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>Your payment information is encrypted and secure</span>
                    </div>

                    {/* Place Order Button */}
                    <Button
                      onClick={() => handleStepComplete(3, null)}
                      disabled={isProcessing}
                      className="w-full bg-rose-400 hover:bg-rose-500 text-white py-4 text-lg font-medium"
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing Order...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          Place Order
                        </div>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
              {currentStep === 4 && (
                <OrderConfirmation key="confirmation" shippingInfo={shippingInfo} orderItems={checkoutItems} />
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          {currentStep < 4 && (
            <div className="lg:col-span-1">{isDirect ? <DirectCheckoutSummary /> : <OrderSummary />}</div>
          )}
        </div>
      </div>
    </div>
  )
}
