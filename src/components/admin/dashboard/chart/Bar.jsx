import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { barCharData } from "../data/FakeData";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const BarGraph = () => {
    const options = {}
  return (
    <div className="h-[500px]"><Bar options={options} data={barCharData} /></div>
  )
}

export default BarGraph