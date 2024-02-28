import { Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { PricingCard, SecondPricingCard } from "./Subscription"

const LandingSection3 = () => {
    return (
        <div className="py-40 px-10 flex-col" style={{ backgroundColor: '#020617', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" component="h4" className="text-center py-10 text-blue-600 font-semibold uppercase" style={{ fontFamily: 'Arial', letterSpacing: '0em', fontWeight: 'bold' }}>Scriptify Pro</Typography>
            <Typography variant="h2" component="h3" className="text-center text-white">
                Level up your online credibility with Scriptify now!
            </Typography>
            {/* <Link to="/sign-up" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" sx={{ marginTop: '50px', paddingY: '15px', paddingLeft: '30px', paddingRight: '30px' }}>Join Us</Button>
            </Link> */}
            <div className="flex mt-10">

            <PricingCard />
            <SecondPricingCard />
            </div>
        </div>
    )
}

export  default LandingSection3