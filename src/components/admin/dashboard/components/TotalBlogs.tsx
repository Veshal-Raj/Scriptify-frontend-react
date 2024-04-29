import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getTotalBlogDataApi } from '../../../../api/admin';
import { Typography } from '@mui/material';
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


ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)


const TotalBlogs = () => {
  const [fetchtrendingBlogData, setFetchtrendingBlogData] = useState([])

  const { data: getTotalBlogData } = useQuery({
    queryKey: ['getTotalBlogData'],
    queryFn: getTotalBlogDataApi
  })

  useEffect(() => {
    if (getTotalBlogData) {
      setFetchtrendingBlogData(getTotalBlogData.data.data || []);
    }
  }, [getTotalBlogData]);

  const barCharData = {
    labels: [],
    datasets: [
      {
        label: "Blog Interactions",
        data: fetchtrendingBlogData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.3)",
          "rgba(10, 10, 99, 0.3)",
          "rgba(132, 199, 132, 0.3)",
          "rgba(255, 3, 255, 0.3)",
        ],
        borderColor: [
          "rgba(10, 10, 99, 0.3)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 3, 255, 0.3)",
          "rgba(132, 199, 132, 0.3)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {}

  return (
    <>
    <div className='w-[900px] '>
    <Typography variant="h5" align="center" mb={2} mt={5}>Blog Interactions</Typography>
      <div className="h-[500px]"><Bar options={options} data={barCharData} /></div>
    </div>
    </>
  )
}

export default TotalBlogs