import Navbar from "../../Navbar"
import BarGraph from "./chart/Bar"
import LineGraph from "./chart/Line"
import PieGraph from "./chart/Pie"

const Dashboard = () => {
  return (
    <>
        <Navbar />
        <div>
          <PieGraph />
          <LineGraph />
          <BarGraph />
          <PieGraph />
        </div>
    </>
  )
}

export default Dashboard