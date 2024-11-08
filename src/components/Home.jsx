import React, { useState, useMemo } from 'react'
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Button } from "./ui/button"
import {
  ChartContainer,
  ChartTooltipContent,
} from "./ui/chart"

const rawChartData = [
  { date: "2023-01-01", desktop: 186, mobile: 80 },
  { date: "2023-01-08", desktop: 205, mobile: 90 },
  { date: "2023-01-15", desktop: 220, mobile: 100 },
  { date: "2023-01-22", desktop: 240, mobile: 110 },
  { date: "2023-01-29", desktop: 280, mobile: 120 },
  { date: "2023-02-05", desktop: 305, mobile: 200 },
  { date: "2023-02-12", desktop: 290, mobile: 180 },
  { date: "2023-02-19", desktop: 270, mobile: 170 },
  { date: "2023-02-26", desktop: 260, mobile: 160 },
  { date: "2023-03-05", desktop: 237, mobile: 120 },
  { date: "2023-03-12", desktop: 220, mobile: 110 },
  { date: "2023-03-19", desktop: 210, mobile: 100 },
  { date: "2023-03-26", desktop: 200, mobile: 90 },
  { date: "2023-04-02", desktop: 73, mobile: 190 },
  { date: "2023-04-09", desktop: 85, mobile: 200 },
  { date: "2023-04-16", desktop: 100, mobile: 210 },
  { date: "2023-04-23", desktop: 120, mobile: 220 },
  { date: "2023-04-30", desktop: 150, mobile: 230 },
  { date: "2023-05-07", desktop: 209, mobile: 130 },
  { date: "2023-05-14", desktop: 220, mobile: 140 },
  { date: "2023-05-21", desktop: 230, mobile: 150 },
  { date: "2023-05-28", desktop: 240, mobile: 160 },
  { date: "2023-06-04", desktop: 214, mobile: 140 },
  { date: "2023-06-11", desktop: 220, mobile: 150 },
  { date: "2023-06-18", desktop: 230, mobile: 160 },
  { date: "2023-06-25", desktop: 240, mobile: 170 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
}

export function ChartAreaStacked() {
  const [filter, setFilter] = useState('weekly')

  const chartData = useMemo(() => {
    if (filter === 'weekly') {
      return rawChartData
    } else {
      // Group data by month
      const monthlyData = rawChartData.reduce((acc, item) => {
        const month = item.date.substring(0, 7) 
        if (!acc[month]) {
          acc[month] = { date: month, desktop: 0, mobile: 0 }
        }
        acc[month].desktop += item.desktop
        acc[month].mobile += item.mobile
        return acc
      }, {})
      return Object.values(monthlyData)
    }
  }, [filter])

  //report function display
  const report = () => {
    console.log(rawChartData)
  }

  return (
    <>
    <div className='flex flex-col items-center justify-center gap-7 h-screen w-full'>
    <Card className = " w-96">
      <CardHeader>
        <CardTitle>Area Chart - Stacked</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end space-x-2">
          <Button
            variant={filter === 'weekly' ? 'default' : 'outline'}
            onClick={() => setFilter('weekly')}
          >
            Weekly
          </Button>
          <Button
            variant={filter === 'monthly' ? 'default' : 'outline'}
            onClick={() => setFilter('monthly')}
          >
            Monthly
          </Button>
        </div>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return filter === 'weekly'
                    ? `${date.getMonth() + 1}/${date.getDate()}`
                    : `${date.getMonth() + 1}/${date.getFullYear().toString().substr(-2)}`
                }}
              />
              <Tooltip
                content={<ChartTooltipContent indicator="dot" />}
                labelFormatter={(label) => {
                  const date = new Date(label)
                  return filter === 'weekly'
                    ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    : date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                }}
              />
              <Area
                type="monotone"
                dataKey="mobile"
                stackId="1"
                stroke="var(--color-mobile)"
                fill="var(--color-mobile)"
                fillOpacity={0.4}
              />
              <Area
                type="monotone"
                dataKey="desktop"
                stackId="1"
                stroke="var(--color-desktop)"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this {filter === 'weekly' ? 'week' : 'month'} <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2023
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>

    <button className='btn btn-info w-44' onClick={report}>Report</button>
    </div>
    </>
  )
}