"use client"

import { motion } from "framer-motion"
import { CheckCircle, Download, Mail, ArrowRight } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Separator } from "../../components/ui/separator"
import { useNavigate } from "react-router-dom"
import type { ShippingInfo } from "../../types/checkout"
import type { CartItem } from "../../types/cart"

interface OrderConfirmationProps {
  shippingInfo: ShippingInfo | null
  orderItems: CartItem[]
}

export default function OrderConfirmation({ shippingInfo, orderItems }: OrderConfirmationProps) {
  const navigate = useNavigate()
  const orderNumber = `ETH-${Date.now().toString().slice(-6)}`
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto">
      {/* Success Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle className="h-10 w-10 text-green-600" />
        </motion.div>

        <h1 className="text-3xl font-light text-slate-800 mb-2">Order Confirmed!</h1>
        <p className="text-slate-600">Thank you for your purchase. Your order has been successfully placed.</p>
      </motion.div>

      {/* Order Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-6 shadow-lg mb-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-medium text-slate-800">Order #{orderNumber}</h2>
            <p className="text-sm text-slate-500">Placed on {new Date().toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-light text-slate-800">${total.toFixed(2)}</p>
            <p className="text-sm text-slate-500">Total</p>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Shipping Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-medium text-slate-800 mb-2">Shipping Address</h3>
            {shippingInfo && (
              <div className="text-sm text-slate-600 space-y-1">
                <p>
                  {shippingInfo.firstName} {shippingInfo.lastName}
                </p>
                <p>{shippingInfo.address}</p>
                {shippingInfo.apartment && <p>{shippingInfo.apartment}</p>}
                <p>
                  {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                </p>
                <p>{shippingInfo.country}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-medium text-slate-800 mb-2">Delivery Information</h3>
            <div className="text-sm text-slate-600 space-y-1">
              <p>Standard Shipping</p>
              <p>Estimated delivery: {estimatedDelivery}</p>
              <p>Tracking information will be sent to your email</p>
            </div>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Order Items */}
        <div className="space-y-4">
          <h3 className="font-medium text-slate-800">Order Items</h3>
          {orderItems.map((item) => (
            <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between items-center">
              <div>
                <p className="font-medium text-slate-800">{item.name}</p>
                <p className="text-sm text-slate-500">
                  Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                </p>
              </div>
              <p className="font-medium text-slate-800">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        <Button variant="outline" className="flex-1 border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Download Receipt
        </Button>

        <Button variant="outline" className="flex-1 border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent">
          <Mail className="h-4 w-4 mr-2" />
          Email Receipt
        </Button>

        <Button onClick={() => navigate("/")} className="flex-1 bg-rose-400 hover:bg-rose-500 text-white">
          Continue Shopping
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </motion.div>

      {/* Support Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-slate-600"
      >
        <p>
          Need help with your order? Contact our{" "}
          <a href="#" className="text-rose-400 hover:text-rose-500">
            customer support team
          </a>
        </p>
      </motion.div>
    </motion.div>
  )
}
