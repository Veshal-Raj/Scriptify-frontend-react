import { Pie } from "react-chartjs-2"
import { Chart as ChartJs, Tooltip, Legend, ArcElement } from 'chart.js'
import { pieChartData } from "../data/FakeData"

ChartJs.register(Tooltip, Legend, ArcElement)

const PieGraph = () => {
  const options = {}
  return (
    <div className="h-[500px]">
      <Pie options={options} data={pieChartData} />
    </div>
  )
}

export default PieGraph