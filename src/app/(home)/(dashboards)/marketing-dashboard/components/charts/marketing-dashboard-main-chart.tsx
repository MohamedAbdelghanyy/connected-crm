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
  Tooltip,
} from 'chart.js';
import { useCallback, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
      },
    },
  },
};

export function MarketingDashboardMainChart() {


  const [chartLabels, setChartLabels] = useState([]);

  const getChartData = useCallback(() => {
    return {
      labels: chartLabels,
      datasets: [
        {
          fill: true,
          label: 'New Installs',
          data: chartLabels.map(() => Math.floor(Math.random() * 900)),
          borderColor: 'rgb(0, 255, 0)',
          backgroundColor: 'rgba(0, 255, 0, 1)',
        },
        {
          fill: true,
          label: 'New Un-installs',
          data: chartLabels.map(() => Math.floor(Math.random() * 900)),
          borderColor: 'rgb(255, 0, 0)',
          backgroundColor: 'rgba(255, 0, 0, 1)',
        },
        {
          fill: true,
          label: 'New Users',
          data: chartLabels.map(() => Math.floor(Math.random() * 900)),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 1)',
        },
      ],
    }
  }, [chartLabels]);

  const [chartData, setChartData] = useState(getChartData());

  useEffect(() => {
    changeLabels('month');
  }, []);

  useEffect(() => {
    setChartData(getChartData());
  }, [chartLabels, getChartData]);

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
    <Card className="col-span-4">
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
