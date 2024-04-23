import { Typography } from "@mui/material"
import { PricingCard, SecondPricingCard } from "./Subscription"

const LandingSection3 = () => {

    return (
        <div className="py-40 px-10 flex-col" style={{ backgroundColor: '#020617', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" component="h4" className="text-center py-10 text-blue-600 font-semibold uppercase" style={{ fontFamily: 'Arial', letterSpacing: '0em', fontWeight: 'bold' }}
                sx={{
                    paddingY: '0px',
                    '@media (max-width: 600px)': {
                        fontSize: '1.5rem', 
                        textAlign: 'initial',
                        mx: '5px', 
                        py: '10px', 
                    },
                }}
            >Scriptify Pro</Typography>
            <Typography variant="h2" component="h3" className="text-center text-white"
                sx={{
                    padding: '0px',
                    '@media (max-width: 600px)': {
                        fontSize: '1.8rem', 
                        textAlign: 'center',
                        mx: '5px', 
                        py: '0px', 
                    },
                }}
            >
                Level up your online credibility with Scriptify now!
            </Typography>

            <div className="flex flex-col mt-10 md:flex-row md:justify-center sm:mx-auto sm:p-0 sm:m-0">
                <div className=" sm:mx-auto mb-10">
                    <PricingCard />
                </div>
                <div className="sm:mx-auto">
                    <SecondPricingCard />
                </div>
            </div>
        </div>
    )
}

export default LandingSection3