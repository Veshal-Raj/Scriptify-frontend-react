import Navbar from '../components/Navbar'
import HomePage from '../components/HomePage'
import MobileFooter from '../components/MobileFooter'

 const Feed = () => {
  return (
    <>
      <div className='flex flex-col  mb-16'>
          <Navbar />
          <HomePage />
          <MobileFooter icon='home'/>
      </div>
    </>
  )
}

export default Feed