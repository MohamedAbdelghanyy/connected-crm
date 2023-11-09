"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grid } from '@mui/material';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
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
              visibility.push('rgba(255, 255, 255, 1)');
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

export function DashboardCharts() {
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [''],
    datasets: [
      {
        fill: true,
        label: '',
        data: chartLabels.map(() => Math.floor(Math.random() * 900)),
        borderColor: '',
        backgroundColor: '',
        hidden: true,
      }
    ]
  });

  useEffect(() => {
    changeLabels('month');
  }, []);

  useEffect(() => {
    setChartData({
      labels: chartLabels,
      datasets: [
        {
          fill: true,
          label: 'New Installs',
          data: chartLabels.map(() => Math.floor(Math.random() * 900)),
          borderColor: 'rgb(0, 255, 0)',
          backgroundColor: 'rgba(0, 255, 0, 0.6)',
          hidden: true,
        },
        {
          fill: true,
          label: 'New Un-installs',
          data: chartLabels.map(() => Math.floor(Math.random() * 900)),
          borderColor: 'rgb(255, 0, 0)',
          backgroundColor: 'rgba(255, 0, 0, 0.6)',
          hidden: true,
        },
        {
          fill: true,
          label: 'New Users',
          data: chartLabels.map(() => Math.floor(Math.random() * 900)),
          borderColor: 'rgb(255, 255, 0)',
          backgroundColor: 'rgba(255, 255, 0, 0.6)',
          hidden: true,
        },
        {
          fill: true,
          label: 'New Items',
          data: chartLabels.map(() => Math.floor(Math.random() * 900)),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.6)',
          hidden: true,
        },
        {
          fill: true,
          label: 'Sold Items',
          data: chartLabels.map(() => Math.floor(Math.random() * 900)),
          borderColor: 'rgb(255, 165, 0)',
          backgroundColor: 'rgba(255, 165, 0, 0.6)',
          hidden: true,
        },
        {
          fill: true,
          label: 'Active Users',
          data: chartLabels.map(() => Math.floor(Math.random() * 900)),
          borderColor: 'rgb(255, 0, 255)',
          backgroundColor: 'rgba(255, 0, 255, 0.6)',
          hidden: true,
        },
        {
          fill: true,
          label: 'New Requests',
          data: chartLabels.map(() => Math.floor(Math.random() * 900)),
          borderColor: 'rgb(128, 0, 128)',
          backgroundColor: 'rgba(128, 0, 128, 0.6)',
          hidden: true,
        },
      ],
    });
  }, [chartLabels]);

  const changeLabels = (type: string) => {
    let newLabels: any = [];
    if (type == 'week') {
      newLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    } else if (type == 'month') {
      newLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    } else if (type == 'quarter') {
      newLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
    } else if (type == 'year') {
      newLabels = ['2021', '2022', '2023']
    }
    setChartLabels(newLabels);
  }
  return (
    <Card className="col-span-4 mb-4">
      <CardHeader>
        <Grid container spacing={2}>
          <Grid item lg={6} xs={6}>
            <CardTitle>Overview</CardTitle>
          </Grid>
          <Grid item lg={6} xs={6}>
            <div style={{ float: "right" }}>
              <Select onValueChange={changeLabels}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="quarter">Quarter</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Grid>
        </Grid>
      </CardHeader>
      <CardContent>
        <Bar options={options} data={chartData} />
      </CardContent>
    </Card>
  );
}
