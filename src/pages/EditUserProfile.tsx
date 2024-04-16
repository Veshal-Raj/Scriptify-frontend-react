import EditProfileBody from "../components/EditProfileBody"
import MobileFooter from "../components/MobileFooter"
import Navbar from "../components/Navbar"


const EditUserProfile = () => {
  return (
    <>
        <Navbar />
        <EditProfileBody />
        <MobileFooter icon="account" />
    </>
  )
}

export default EditUserProfile