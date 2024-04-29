import { useQuery } from "@tanstack/react-query";
import Navbar from "../../Navbar"
import ReportTable from "./ReportTable"
import { getAllReportsApi } from "../../../api/admin";
import MobileFooter from "../../MobileFooter";


const Reports = () => {

  const { data: allReports } = useQuery({
    queryKey: ['allReports'],
    queryFn: getAllReportsApi
  })

  return (
    <>
      <Navbar />
      {allReports?.data.data ? <ReportTable reports={allReports?.data.data} /> : <></>}
      <MobileFooter icon='' />

    </>
  )
}

export default Reports