import { Suspense, lazy } from "react"
import Navbar from "../components/Navbar"
import LandingHero from "../components/LandingHero"
import { Footer } from "../components/Footer"

const LazyLandingSection1 =  lazy(() => import("../components/LandingSection1"))
const LazyLandingSection2  = lazy(() => import("../components/LandingSection2" ))
const LazyLandingSection3 = lazy(() => import("../components/LandingSection3"));

const LandingPage = () => {
  return (
    <div>
        <Navbar />
        <LandingHero />
        <Suspense fallback={<div>Loading...</div>}>
        <LazyLandingSection1 key="section1" />
        <LazyLandingSection2 key="section2" />
        <LazyLandingSection3 key="section3" />
        </Suspense>
        <Footer />
      
    </div>
  )
}

export default LandingPage