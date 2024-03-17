import Navbar from '../components/Navbar'
import HomePage from '../components/HomePage'
import MobileFooter from '../components/MobileFooter'

export const Feed = () => {
  return (
    <>
    <div className='flex flex-col min-h-screen mb-16'>

        <Navbar />
        <HomePage />
        <MobileFooter icon='home'/>
    </div>
    </>
  )
}
