import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Checkbox } from "../../components/ui/checkbox"
import type { ShippingInfo } from "../../types/checkout"

interface ShippingFormProps {
  onComplete: (data: ShippingInfo) => void
  initialData?: ShippingInfo | null
}

export default function ShippingForm({ onComplete, initialData }: ShippingFormProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ShippingInfo>({
    defaultValues: initialData || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
    },
  })

  const onSubmit = (data: ShippingInfo) => {
    onComplete(data)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <h2 className="text-2xl font-light text-slate-800 mb-6">Shipping Information</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-800">Contact Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                {...register("firstName", { required: "First name is required" })}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                {...register("lastName", { required: "Last name is required" })}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" {...register("phone")} />
          </div>
        </div>

        {/* Shipping Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-800">Shipping Address</h3>

          <div className="space-y-2">
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              {...register("address", { required: "Address is required" })}
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
            <Input id="apartment" {...register("apartment")} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                {...register("city", { required: "City is required" })}
                className={errors.city ? "border-red-500" : ""}
              />
              {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Select onValueChange={(value) => setValue("state", value)}>
                <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="TX">Texas</SelectItem>
                  <SelectItem value="FL">Florida</SelectItem>
                  {/* Add more states */}
                </SelectContent>
              </Select>
              {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code *</Label>
              <Input
                id="zipCode"
                {...register("zipCode", { required: "ZIP code is required" })}
                className={errors.zipCode ? "border-red-500" : ""}
              />
              {errors.zipCode && <p className="text-sm text-red-500">{errors.zipCode.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country *</Label>
            <Select onValueChange={(value) => setValue("country", value)} defaultValue="United States">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="United States">United States</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                {/* Add more countries */}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Save Information */}
        <div className="flex items-center space-x-2">
          <Checkbox id="saveInfo" />
          <Label htmlFor="saveInfo" className="text-sm text-slate-600">
            Save this information for next time
          </Label>
        </div>

        {/* Continue Button */}
        <Button type="submit" className="w-full bg-rose-400 hover:bg-rose-500 text-white py-3 text-lg font-medium">
          Continue to Payment
        </Button>
      </form>
    </motion.div>
  )
}
