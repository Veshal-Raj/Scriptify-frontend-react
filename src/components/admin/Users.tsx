import Navbar from "../Navbar"
import { TableComponent } from "../UI/Table"
import { useQuery } from "@tanstack/react-query"
import { getAllUsers } from "../../api/admin"
import TuserType from "../../@types/TuserType"



const Users = () => {

  const { data: AllUsers, isLoading } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: getAllUsers,

  })

  const userData: TuserType = AllUsers?.data



  return (
    <>
      <Navbar />
      <TableComponent data={userData} />
    </>
  )
}

export default Users