import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  
} from "chart.js";
import { lineChartData } from "../data/FakeData";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const LineGraph = () => {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom"
      },
      title: {
        display: true,
        text: "This is a graph respresentating My Daily steps"
      }
    }
  } 

  

  return <div className="h-[500px]"><Line options={options} data={lineChartData} /></div>;
};

export default LineGraph;
