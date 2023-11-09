"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grid } from '@mui/material';
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
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

export function MarketingDashboardApplicationChart() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const getChartData = () => {
    return {
      labels: ['Installs', 'Un-installs'],
      datasets: [
        {
          label: '',
          data: [
            Math.floor(Math.random() * 900),
            Math.floor(Math.random() * 900),
          ],
          borderColor: [
            'rgb(0, 255, 0)',
            'rgb(255, 0, 0)',
          ],
          backgroundColor: [
            'rgba(0, 255, 0, 0.6)',
            'rgba(255, 0, 0, 0.6)',
          ],
          hoverOffset: 2,
        }]
    };
  }
  const [chartLabel, setChartLabel] = useState(months[(new Date().getMonth())]);
  const [chartData, setChartData] = useState(getChartData());

  useEffect(() => {
    setChartData(getChartData());
  }, [chartLabel]);

  return (
    <Card className="col-span-4">
      <CardHeader>
        <Grid container spacing={2}>
          <Grid item lg={6} xs={6}>
            <CardTitle>Application</CardTitle>
          </Grid>
          <Grid item lg={6} xs={6}>
            <div style={{ float: "right" }}>
              <Select onValueChange={setChartLabel} defaultValue={months[(new Date().getMonth())]}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder={months[(new Date().getMonth())]} />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (<SelectItem value={month}>{month}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
          </Grid>
        </Grid>
      </CardHeader>
      <CardContent>
        <Doughnut data={chartData} options={options}/>
      </CardContent>
    </Card>
  );
}
