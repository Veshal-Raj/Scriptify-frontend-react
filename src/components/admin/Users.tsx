import Navbar from "../Navbar"
import { TableComponent } from "../UI/Table"
import { useQuery } from "@tanstack/react-query"
import { getAllUsers } from "../../api/admin"


const Users = () => {

  const { data: AllUsers } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: getAllUsers,

  })

  return (
    <>
      <Navbar />
      <TableComponent data={AllUsers?.data} />
    </>
  )
}

export default Users