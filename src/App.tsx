import Navigation from "./components/Navigation"
import CollectionsSection from "./pages/Collections"
import CTASection from "./pages/Cta"
import FeaturesSection from "./pages/Features"
import Footer from "./pages/Footer"
import Hero from "./pages/Hero"

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-lavender-50">
      <Navigation/>
      <Hero/>
      <FeaturesSection/>
      <CollectionsSection/>
      <CTASection/>
      <Footer/>
    </div>
  )
}

export default App