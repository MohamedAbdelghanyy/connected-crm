import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grid } from '@mui/material';
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip
} from 'chart.js';
import { useCallback, useEffect, useState } from 'react';
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

export function TechDashboardPlatformChart() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const [chartLabel, setChartLabel] = useState(months[(new Date().getMonth())]);

  const getChartData = useCallback(() => {
    return {
      labels: ['Web', 'Android', 'iOS'],
      datasets: [
        {
          label: 'API Requests',
          data: [
            Math.floor(Math.random() * 900),
            Math.floor(Math.random() * 900),
            Math.floor(Math.random() * 900),
          ],
          borderColor: [
            'rgb(53, 162, 235)',
            'rgb(255, 0, 255)',
            'rgb(128, 0, 128)',
          ],
          backgroundColor: [
            'rgba(53, 162, 235, 0.5)',
            'rgba(255, 0, 255, 0.6)',
            'rgba(128, 0, 128, 0.6)',
          ],
          hoverOffset: 2,
        }]
    };
  }, []);

  const [chartData, setChartData] = useState(getChartData());

  useEffect(() => {
    setChartData(getChartData());
  }, [chartLabel, getChartData]);

  return (
    <Card className="col-span-4">
      <CardHeader>
        <Grid container spacing={2}>
          <Grid item lg={6} xs={6}>
            <CardTitle>Platfrom</CardTitle>
          </Grid>
          <Grid item lg={6} xs={6}>
            <div style={{ float: "right" }}>
              <Select onValueChange={setChartLabel} defaultValue={months[(new Date().getMonth())]}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder={months[(new Date().getMonth())]} />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (<SelectItem key={month} value={month}>{month}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
          </Grid>
        </Grid>
      </CardHeader>
      <CardContent>
        <Doughnut data={chartData} options={options} />
      </CardContent>
    </Card>
  );
}
