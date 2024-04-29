import MobileFooter from "../../MobileFooter"
import Navbar from "../../Navbar"
import SubscribedData from "./components/SubscribedData"
import TopBlogs from "./components/TopBlogs"
import TotalBlogs from "./components/TotalBlogs"

const Dashboard = () => {

  return (
    <>
      <Navbar />
      <div className="flex   justify-evenly ">
        <div className="flex flex-col  ">
          <SubscribedData />
          <TotalBlogs />
        </div>
        <div className="w-[500px]">
          <TopBlogs />
        </div>
      </div>
      <MobileFooter icon='' />
    </>
  )
}

export default Dashboard