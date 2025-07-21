import Navigation from "./components/Navigation"
import { CartProvider } from "./context/cart-context"
import CollectionsSection from "./pages/Collections"
import CTASection from "./pages/Cta"
import FeaturesSection from "./pages/Features"
import Footer from "./pages/Footer"
import Hero from "./pages/Hero"
import CheckoutPage from "./pages/Checkout"
import { Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-lavender-50">
        <Navigation/>
        <Routes>
          <Route path="/" element={
            <>
              <Hero/>
              <FeaturesSection/>
              <CollectionsSection/>
              <CTASection/>
            </>
          } />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
        <Footer/>
      </div>
    </CartProvider>
  )
}

export default App