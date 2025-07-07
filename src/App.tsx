import Navigation from "./components/Navigation"
import Hero from "./pages/Hero"

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-lavender-50">
      <Navigation/>
      <Hero/>
    </div>
  )
}

export default App