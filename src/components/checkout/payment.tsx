import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { CreditCard, Lock, ArrowLeft } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import type { PaymentInfo } from "../../types/checkout"

interface PaymentFormProps {
  onComplete: (data: PaymentInfo) => void
  onBack: () => void
  initialData?: PaymentInfo | null
}

export default function PaymentForm({ onComplete, onBack, initialData }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState("card")
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PaymentInfo>({
    defaultValues: initialData || {
      paymentMethod: "card",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    },
  })

  const onSubmit = (data: PaymentInfo) => {
    onComplete({ ...data, paymentMethod })
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    return v
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-slate-600 hover:text-rose-400">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-light text-slate-800">Payment Information</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Payment Method Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-800">Payment Method</h3>

          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2 p-4 border border-slate-200 rounded-lg">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                <CreditCard className="h-4 w-4" />
                Credit or Debit Card
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-4 border border-slate-200 rounded-lg opacity-50">
              <RadioGroupItem value="paypal" id="paypal" disabled />
              <Label htmlFor="paypal" className="cursor-not-allowed">
                PayPal (Coming Soon)
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-4 border border-slate-200 rounded-lg opacity-50">
              <RadioGroupItem value="apple" id="apple" disabled />
              <Label htmlFor="apple" className="cursor-not-allowed">
                Apple Pay (Coming Soon)
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Card Information */}
        {paymentMethod === "card" && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-800">Card Information</h3>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number *</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  {...register("cardNumber", {
                    required: "Card number is required",
                    minLength: {
                      value: 19,
                      message: "Please enter a valid card number",
                    },
                  })}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value)
                    e.target.value = formatted
                    setValue("cardNumber", formatted)
                  }}
                  maxLength={19}
                  className={`pl-10 ${errors.cardNumber ? "border-red-500" : ""}`}
                />
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
              {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date *</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  {...register("expiryDate", {
                    required: "Expiry date is required",
                    pattern: {
                      value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                      message: "Please enter a valid expiry date",
                    },
                  })}
                  onChange={(e) => {
                    const formatted = formatExpiryDate(e.target.value)
                    e.target.value = formatted
                    setValue("expiryDate", formatted)
                  }}
                  maxLength={5}
                  className={errors.expiryDate ? "border-red-500" : ""}
                />
                {errors.expiryDate && <p className="text-sm text-red-500">{errors.expiryDate.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv">CVV *</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  type="password"
                  {...register("cvv", {
                    required: "CVV is required",
                    minLength: {
                      value: 3,
                      message: "CVV must be at least 3 digits",
                    },
                    maxLength: {
                      value: 4,
                      message: "CVV must be at most 4 digits",
                    },
                  })}
                  maxLength={4}
                  className={errors.cvv ? "border-red-500" : ""}
                />
                {errors.cvv && <p className="text-sm text-red-500">{errors.cvv.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardholderName">Cardholder Name *</Label>
              <Input
                id="cardholderName"
                placeholder="John Doe"
                {...register("cardholderName", { required: "Cardholder name is required" })}
                className={errors.cardholderName ? "border-red-500" : ""}
              />
              {errors.cardholderName && <p className="text-sm text-red-500">{errors.cardholderName.message}</p>}
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="flex items-center gap-2 text-sm text-slate-600 bg-green-50 p-3 rounded-lg">
          <Lock className="h-4 w-4 text-green-600" />
          <span>Your payment information is encrypted and secure</span>
        </div>

        {/* Continue Button */}
        <Button type="submit" className="w-full bg-rose-400 hover:bg-rose-500 text-white py-3 text-lg font-medium">
          Review Order
        </Button>
      </form>
    </motion.div>
  )
}
