import { useQuery } from "@tanstack/react-query";
import Navbar from "../../Navbar"
import ReportTable from "./ReportTable"
import { getAllReportsApi } from "../../../api/admin";


const dummyReports = [
  {
    _id: 1,
    reporter: 'User A',
    blogTitle: 'Blog Post 1',
    reason: 'Inappropriate content',
  },
  {
    _id: 2,
    reporter: 'User B',
    blogTitle: 'Blog Post 2',
    reason: 'Spam',
  },
  {
    _id: 3,
    reporter: 'User C',
    blogTitle: 'Blog Post 3',
    reason: 'Violence',
  },
];


const Reports = () => {

  const {data: allReports} = useQuery({
    queryKey: ['allReports'],
    queryFn: getAllReportsApi
  })

  if (allReports?.data) console.log(allReports?.data.data)

  return (
    <>
        <Navbar />
        {allReports?.data.data ? <ReportTable reports={allReports?.data.data} /> : <></>}
    </>
  )
}

export default Reports