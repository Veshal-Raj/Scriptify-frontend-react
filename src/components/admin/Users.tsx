import Navbar from "../Navbar"
import { TableComponent } from "../UI/Table"
import { useQuery } from "@tanstack/react-query"
import { getAllUsers } from "../../api/admin"
import MobileFooter from "../MobileFooter"


const Users = () => {

  const { data: AllUsers } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: getAllUsers,

  })

  return (
    <>
      <Navbar />
      <TableComponent data={AllUsers?.data} />
      <MobileFooter icon='' />
    </> 
  )
}

export default Users