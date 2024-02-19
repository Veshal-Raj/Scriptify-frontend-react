import { Typography } from "@mui/material"
import TestimonialSlider from "./UI/TestimonialSlider"

const LandingSection2 = () => {
  return (
    <>
    <div className="py-40 flex justify-center items-center" style={{ backgroundColor: '#020617'}}>
    <Typography variant="h3" component="h3" className="text-white">
      Connect globally, explore insightful blogs, and be inspired.
    </Typography>
  </div>
    <TestimonialSlider />
    </>

  )
}

export default LandingSection2