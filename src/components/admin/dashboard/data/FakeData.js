export const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"],
  
    datasets: [
      {
        label: "Total Blogs",
        data: [3000, 5000, 3500, 4500, 2000, 7000, 9000],
        borderColor: "rgb(75, 192, 192)",
      },
      {
        label: "Total Reads",
        data: [3000, 5000, 4500, 2000, 7000, 9000, 3500],
        borderColor: "rgb(192, 75, 192)",
      }
    ],
  };
  
  export const barCharData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"],
    datasets: [
      {
        label: "Blog Published",
        data: [5, 10, 15, 20, 25, 11, 23, 2, 24, 22, 3],
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
  
  export const pieChartData = {
    labels: ["Subscribed Users", "Unsubscribed Users"],
    datasets: [
      {
        label: "Time Spent",
        data: [3, 5],
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
  
  export const pieChartData2 = {
    labels: ["Total Blogs", "Total Reads"],
    datasets: [
      {
        label: "Time Spent",
        data: [3, 5],
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