import { Typography } from "@mui/material"
import TestimonialSlider from "./UI/TestimonialSlider"

const LandingSection2 = () => {
  return (
    <>
    <div className="pt-40 flex justify-center items-center bg-white" >
    <Typography variant="h3" component="h3" className="text-black"
      sx={{
        padding: '10px',
        '@media (max-width: 600px)': {
            fontSize: '1.6rem', // Adjust the font size for small screens
            textAlign: 'center',
            mx: '5px', // Reduce horizontal margin for small screens
            py: '10px', // Reduce vertical padding for small screens
        },
    }}
    >
      Connect globally, explore insightful blogs, and be inspired.
    </Typography>
  </div>
    <TestimonialSlider />
    </>

  )
}

export default LandingSection2