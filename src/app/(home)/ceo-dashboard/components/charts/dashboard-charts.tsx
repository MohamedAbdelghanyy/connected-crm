"use client"

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      onClick: (click: any, legendItem: any, legend: any) => {
        const datasets = legend.legendItems.map((dataset: any, index: any) => {
          return dataset.text;
        });
        const index = datasets.indexOf(legendItem.text);
        if (legend.chart.isDatasetVisible(index) === true) {
          legend.chart.hide(index);
        } else {
          legend.chart.show(index);
        }
      },
      labels: {
        usePointStyle: true,
        generateLabels: (chart: any) => {
          let visibility: any = [];
          for (let i = 0; i < chart.data.datasets.length; i++) {
            if (chart.isDatasetVisible(i) === true) {
              visibility.push('rgba(255, 255, 255, 0.8)');
            } else {
              visibility.push('rgba(255, 255, 255, 0.3)');
            }
          }
          return chart.data.datasets.map(
            (dataset: any, index: any) => ({
              text: dataset.label,
              fillStyle: dataset.backgroundColor,
              strokeStyle: dataset.borderColor,
              fontColor: visibility[index]
            })
          )
        },
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'New Installs',
      data: labels.map(() => Math.floor(Math.random() * 900)),
      borderColor: 'rgb(0, 255, 0)',
      backgroundColor: 'rgba(0, 255, 0, 0.25)',
      hidden: true,
    },
    {
      fill: true,
      label: 'New Un-installs',
      data: labels.map(() => Math.floor(Math.random() * 900)),
      borderColor: 'rgb(255, 0, 0)',
      backgroundColor: 'rgba(255, 0, 0, 0.25)',
      hidden: true,
    },
    {
      fill: true,
      label: 'New Users',
      data: labels.map(() => Math.floor(Math.random() * 900)),
      borderColor: 'rgb(255, 255, 0)',
      backgroundColor: 'rgba(255, 255, 0, 0.25)',
      hidden: true,
    },
    {
      fill: true,
      label: 'New Items',
      data: labels.map(() => Math.floor(Math.random() * 900)),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.25)',
      hidden: true,
    },
    {
      fill: true,
      label: 'Sold Items',
      data: labels.map(() => Math.floor(Math.random() * 900)),
      borderColor: 'rgb(255, 165, 0)',
      backgroundColor: 'rgba(255, 165, 0, 0.25)',
      hidden: true,
    },
    {
      fill: true,
      label: 'Active Users',
      data: labels.map(() => Math.floor(Math.random() * 900)),
      borderColor: 'rgb(255, 0, 255)',
      backgroundColor: 'rgba(255, 0, 255, 0.25)',
      hidden: true,
    },
    {
      fill: true,
      label: 'New Requests',
      data: labels.map(() => Math.floor(Math.random() * 900)),
      borderColor: 'rgb(128, 0, 128)',
      backgroundColor: 'rgba(128, 0, 128, 0.25)',
      hidden: true,
    },
  ],
};

export function DashboardCharts() {
  return <Line options={options} data={data} />;
}
