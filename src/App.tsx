import Navigation from "./components/Navigation"
import FeaturesSection from "./pages/Features"
import Hero from "./pages/Hero"

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-lavender-50">
      <Navigation/>
      <Hero/>
      <FeaturesSection/>
    </div>
  )
}

export default App