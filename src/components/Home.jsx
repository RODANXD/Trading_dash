import React, { useState, useMemo } from 'react'
import { Line, LineChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


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

const rawChartData2 = [
  { date: "2023-01-01", desktop: 386, mobile: 80 },
  { date: "2023-01-08", desktop: 235, mobile: 90 },
  { date: "2023-01-15", desktop: 210, mobile: 100 },
  { date: "2023-01-22", desktop: 340, mobile: 110 },
  { date: "2023-01-29", desktop: 180, mobile: 120 },
  { date: "2023-02-05", desktop: 205, mobile: 200 },
  { date: "2023-02-12", desktop: 290, mobile: 180 },
  { date: "2023-02-19", desktop: 240, mobile: 170 },
  { date: "2023-02-26", desktop: 290, mobile: 160 },
  { date: "2023-03-05", desktop: 337, mobile: 120 },
  { date: "2023-03-12", desktop: 120, mobile: 110 },
  { date: "2023-03-19", desktop: 290, mobile: 100 },
  { date: "2023-03-26", desktop: 300, mobile: 90 },
  { date: "2023-04-02", desktop: 123, mobile: 190 },
  { date: "2023-04-09", desktop: 80, mobile: 200 },
  { date: "2023-04-16", desktop: 110, mobile: 110 },
  { date: "2023-04-23", desktop: 170, mobile: 240 },
  { date: "2023-04-30", desktop: 120, mobile: 250 },
  { date: "2023-05-07", desktop: 109, mobile: 150 },
  { date: "2023-05-14", desktop: 120, mobile: 160 },
  { date: "2023-05-21", desktop: 270, mobile: 180 },
  { date: "2023-05-28", desktop: 210, mobile: 70 },
  { date: "2023-06-04", desktop: 204, mobile: 140 },
  { date: "2023-06-11", desktop: 200, mobile: 150 },
  { date: "2023-06-18", desktop: 270, mobile: 120 },
  { date: "2023-06-25", desktop: 210, mobile: 180 },
]


const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
}

export function ChartLineInteractive() {
  const [activeChart, setActiveChart] = useState("desktop")
  const [activeChart2, setActiveChart2] = useState("desktop")

  const [filter, setFilter] = useState('weekly')
  const [filter2, setFilter2] = useState('weekly')


  const chartData = useMemo(() => {
    if (filter === 'daily') {
      return rawChartData;
    } else if (filter === 'weekly') {
      // Group data by week
      const weeklyData = rawChartData.reduce((acc, item, index) => {
        const weekIndex = Math.floor(index / 7);
        if (!acc[weekIndex]) {
          acc[weekIndex] = { 
            date: item.date, 
            desktop: 0, 
            mobile: 0 
          };
        }
        acc[weekIndex].desktop += item.desktop;
        acc[weekIndex].mobile += item.mobile;
        return acc;
      }, []);
      return weeklyData;
    } else if (filter === 'monthly') {
      // Group data by month
      const monthlyData = rawChartData.reduce((acc, item) => {
        const month = item.date.substring(0, 7);
        if (!acc[month]) {
          acc[month] = { 
            date: month, 
            desktop: 0, 
            mobile: 0 
          };
        }
        acc[month].desktop += item.desktop;
        acc[month].mobile += item.mobile;
        return acc;
      }, {});
      return Object.values(monthlyData);
    }
  }, [filter]);

  const total = useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    [chartData]
  );


  const chartData2 = useMemo(() => {
    if (filter2 === 'daily') {
      return rawChartData2;
    } else if (filter2 === 'weekly') {
      const weeklyData = rawChartData2.reduce((acc, item, index) => {
        const weekIndex = Math.floor(index / 7);
        if (!acc[weekIndex]) {
          acc[weekIndex] = { 
            date: item.date, 
            desktop: 0, 
            mobile: 0 
          };
        }
        acc[weekIndex].desktop += item.desktop;
        acc[weekIndex].mobile += item.mobile;
        return acc;
      }, []);
      return weeklyData;
    } else if (filter2 === 'monthly') {
      const monthlyData = rawChartData2.reduce((acc, item) => {
        const month = item.date.substring(0, 7);
        if (!acc[month]) {
          acc[month] = { 
            date: month, 
            desktop: 0, 
            mobile: 0 
          };
        }
        acc[month].desktop += item.desktop;
        acc[month].mobile += item.mobile;
        return acc;
      }, {});
      return Object.values(monthlyData);
    }
  }, [filter2]);

  const totalchart2 = useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    [chartData]
  );
  
const navigate = useNavigate()

  
  return (
    <>
    <div className=' flex flex-col gap-6'>
<div className=' flex justify-center gap-4  h-full'>
    <Button className="bg-sky-800 hover:bg-sky-600 duration-500"  onClick={() => navigate('/dashTable')}>Trade</Button>
    <Button className="bg-green-800  hover:bg-green-600 duration-500" onClick={() => navigate('/report')}>Report</Button>
</div>
    <div>

</div>
    <div className=' flex flex-col gap-4'>
    <div className=' flex flex-col gap-4'>
    <Card className="bg-black text-white">
      <CardHeader className="flex flex-col items-stretch h-auto space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 sm:py-6">
          <CardTitle>Line Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 6 months
          </CardDescription>
        </div>
        <div className=' grid grid-cols-1 mr-4 gap-4 place-items-center'>
        <div className="mb-4 flex justify-center space-x-2">
          <Button className=" text-white"
            // variant={filter === 'daily' ? 'secondary' : 'outline'}
            onClick={() => setFilter('daily')}
>
            Daily
          </Button>
          <Button
            // variant={filter === 'weekly' ? 'secondary' : 'outline'}
            onClick={() => setFilter('weekly')}
          >
            Weekly
          </Button>
          <Button
            // variant={filter === 'monthly' ? 'secondary' : 'outline'}
            onClick={() => setFilter('monthly')}
          >
            Monthly
          </Button>
        </div>

        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
       
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} stroke='#334' />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  if (filter === 'daily') {
                    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                  } else if (filter === 'weekly') {
                    return `Week ${Math.floor(rawChartData.findIndex(item => item.date === value) / 7) + 1}`;
                  } else {
                    return date.toLocaleDateString("en-US", { month: "short" });
                  }
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      const date = new Date(value);
                      if (filter === 'daily') {
                        return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
                      } else if (filter === 'weekly') {
                        const weekIndex = Math.floor(rawChartData.findIndex(item => item.date === value) / 7);
                        const startDate = new Date(rawChartData[weekIndex * 7].date);
                        const endDate = new Date(rawChartData[Math.min((weekIndex + 1) * 7 - 1, rawChartData.length - 1)].date);
                        return `Week ${weekIndex + 1}: ${startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
                      } else {
                        return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
                      }
                    }}
                  />
                }
              />
              <Line
                dataKey={activeChart}
                type="monotone"
                stroke='#1DA1F2'
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
    </div>
    <div className=' flex flex-col gap-4'>
    <Card className="bg-black text-white">
      <CardHeader className="flex flex-col items-stretch h-auto space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-4 sm:py-6">
          <CardTitle>Line Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 6 months
          </CardDescription>
        </div>
        <div className=' grid grid-cols-1 mr-4 gap-4 place-items-center'>
        <div className="mb-4 flex justify-center space-x-2">
          <Button className=" text-white"
            // variant={filter === 'daily' ? 'secondary' : 'outline'}
            onClick={() => setFilter2('daily')}
          >
            Daily
          </Button>
          <Button
            // variant={filter === 'weekly' ? 'secondary' : 'outline'}
            onClick={() => setFilter2('weekly')}
          >
            Weekly
          </Button>
          <Button
            // variant={filter === 'monthly' ? 'secondary' : 'outline'}
            onClick={() => setFilter2('monthly')}
          >
            Monthly
          </Button>
        </div>
        {/* <div className="flex">
          {["desktop", "mobile"].map((key) => (
            <button
              key={key}
              data-active={activeChart2 === key}
              className="flex flex-1 flex-col justify-center gap-1 border-t px-4  py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveChart2(key)}
            >
              <span className="text-xs text-muted-foreground text-white">
                {chartConfig[key].label}
              </span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                {totalchart2[key].toLocaleString()}
              </span>
            </button>
          ))}

        </div> */}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
       
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData2}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} stroke='#334' />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  if (filter === 'daily') {
                    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                  } else if (filter === 'weekly') {
                    return `Week ${Math.floor(rawChartData2.findIndex(item => item.date === value) / 7) + 1}`;
                  } else {
                    return date.toLocaleDateString("en-US", { month: "short" });
                  }
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      const date = new Date(value);
                      if (filter === 'daily') {
                        return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
                      } else if (filter === 'weekly') {
                        const weekIndex = Math.floor(rawChartData2.findIndex(item => item.date === value) / 7);
                        const startDate = new Date(rawChartData2[weekIndex * 7].date);
                        const endDate = new Date(rawChartData2[Math.min((weekIndex + 1) * 7 - 1, rawChartData2.length - 1)].date);
                        return `Week ${weekIndex + 1}: ${startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
                      } else {
                        return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
                      }
                    }}
                  />
                }
              />
              <Line
                dataKey={activeChart2}
                type="monotone"
                stroke='#1DA1F2'
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
    </div>
    </div>
    <div className=' grid grid-flow-row place-items-center '>
    {/* <table className="w-9/12 border-collapse border border-gray-300 table-fixed">
                <thead>
  <tr className="bg-gray-300 text-black text-xs">
    <th className="border border-gray-300 p-2">ID</th>
    <th className="border border-gray-300 p-1">Broker</th>
    <th className="border border-gray-300 p-1">Symbol</th>
    <th className="border border-gray-300 p-2">buyorderid</th>
    <th className="border border-gray-300 p-2">LTP</th>
    <th className="border border-gray-300 p-2">avg_price</th>
    <th className="border border-gray-300 p-2">Side</th>
    <th className="border border-gray-300 p-1">QTY</th>
   
  </tr>
</thead>
<tbody>

  
    <tr className="text-gray-800 ">
            <td className="border border-gray-300 p-1 text-white break-all">1</td>
              
            <td className="border border-gray-300 p-1 text-white break-all">1</td>  
            <td className="border border-gray-300 p-1 text-white break-all">11</td>
            <td className="border border-gray-300 p-1 text-white break-all">12</td>
            <td className="border border-gray-300 p-1 text-white break-all">44</td>

            <td className="border border-gray-300 p-1 text-white break-all">1</td>
            <td className="border border-gray-300 p-1 text-white break-all">1</td>

            <td className="border border-gray-300 p-1">
        <Button className="text-xs p-2">EXIT</Button>  

      </td>
      </tr>
</tbody>

                </table> */}

        
        </div>
        </div>
    </>
  )
}
