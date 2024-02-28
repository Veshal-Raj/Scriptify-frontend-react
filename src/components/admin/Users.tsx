import Navbar from "../Navbar"
import { TableComponent } from "../UI/Table"
import { useQuery } from "@tanstack/react-query"
import { getAllUsers } from "../../api/admin"
import TuserType from "../../@types/TuserType"



const Users = () => {

  const {data: AllUsers, isLoading, refetch} = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: getAllUsers,
  
  })
  console.log(AllUsers, isLoading)
  const userData:TuserType = AllUsers?.data

  const handleDataChange = async () => {
    // Manually refetch the data
    await refetch();
  }

  return (
    <>
        <Navbar />
        <TableComponent data={userData} onDataChange={handleDataChange} />
    </>
  )
}

export default Users