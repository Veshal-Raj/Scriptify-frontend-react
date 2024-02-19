import { Footer } from "../components/Footer"
import LandingHero from "../components/LandingHero"
import LandingSection1 from "../components/LandingSection1"
import LandingSection2 from "../components/LandingSection2"
import { LandingSection3 } from "../components/LandingSection3"
import Navbar from "../components/Navbar"

const LandingPage = () => {
  return (
    <div>
        <Navbar />
        <LandingHero />
        <LandingSection1 />
        <LandingSection2 />
        <LandingSection3 />
        <Footer />
      
    </div>
  )
}

export default LandingPage