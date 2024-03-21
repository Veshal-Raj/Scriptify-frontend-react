import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"

const Profile = () => {
    const { id: ProfileId } = useParams()
    // console.log(id)
  return (
    <>
        <Navbar />
        <h1 className="text-black">{ProfileId}</h1>
    </>
  )
}

export default Profile