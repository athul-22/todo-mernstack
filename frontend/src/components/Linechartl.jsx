import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function LineChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Sales Data",
            data: [12, 19, 3, 5, 2, 3],
            borderColor: "blue",
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  return <canvas ref={chartRef} width={400} height={200} />;
}

export default LineChart;
