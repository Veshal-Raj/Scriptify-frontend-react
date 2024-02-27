import Navbar from "../Navbar"
import { TableComponent } from "../UI/Table"
import { useQuery } from "@tanstack/react-query"
import { getAllUsers } from "../../api/admin"
import adminRoutes from "../../services/endpoints/adminEndPoints"
import TuserType from "../../@types/TuserType"



const fetchAllUsers = async () => {
  try {
    const data = await getAllUsers(adminRoutes.getAllUsers)
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch users')
  }
}


const Users = () => {

  const {data, isLoading} = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: fetchAllUsers
  })
  console.log(data, isLoading)
  const userData:TuserType = data?.data
  return (
    <>
        <Navbar />
        <TableComponent data={userData} />
    </>
  )
}

export default Users