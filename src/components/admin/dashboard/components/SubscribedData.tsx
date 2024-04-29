import { Pie } from "react-chartjs-2";
import { Chart as ChartJs, Tooltip, Legend, ArcElement } from "chart.js";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserSubscribedDataApi } from "../../../../api/admin";
import { useQuery } from "@tanstack/react-query";

ChartJs.register(Tooltip, Legend, ArcElement);

const SubscribedData = () => {
  const [fetchedData, setFetchedData] = useState([])
  const { data: subscribedData } = useQuery({
    queryKey: ['subscribedData'],
    queryFn: getUserSubscribedDataApi
  })

  useEffect(() => {
    if (subscribedData) {
      setFetchedData(subscribedData.data.data)
    }
  }, [subscribedData])


  const pieChartData = {
    labels: ['subscribedCount', 'unsubscribedCount', 'totalCount'],
    datasets: [
      {
        label: "Time Spent",
        data: fetchedData,
        backgroundColor: [
          "rgba(10, 10, 99, 0.3)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 3, 255, 0.3)",
          "rgba(132, 199, 132, 0.3)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {};
  return (
    <>
      <Box mt={4}>
        <Typography variant="h5" align="center" mb={2}>
          User Subscription Status
        </Typography>
        <div className=" h-[500px] flex justify-center">
          <Pie options={options} data={pieChartData} />
        </div>
      </Box>
    </>
  )
}

export default SubscribedData