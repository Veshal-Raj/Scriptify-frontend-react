import { useQuery } from "@tanstack/react-query";
import Navbar from "../../Navbar"
import ReportTable from "./ReportTable"
import { getAllReportsApi } from "../../../api/admin";


const Reports = () => {

  const { data: allReports } = useQuery({
    queryKey: ['allReports'],
    queryFn: getAllReportsApi
  })

  return (
    <>
      <Navbar />
      {allReports?.data.data ? <ReportTable reports={allReports?.data.data} /> : <></>}
    </>
  )
}

export default Reports