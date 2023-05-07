import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

const ChartComponent = ({ historicalData,companyName }) => {
  const labels = [];
  const prices = [];
  console.log(historicalData);
  historicalData.forEach((day) => {
    labels.unshift(day.date);
    prices.unshift(day.close);
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: `${companyName}'s Historical Data`,
        data: prices,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default ChartComponent;
