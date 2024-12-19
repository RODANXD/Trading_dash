import React, { useState, useMemo } from 'react'
import { TrendingUp } from 'lucide-react'
import { Line, LineChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"
import { Bar, BarChart, LabelList, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Pie, PieChart } from "recharts"




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


export function ChartLineInteractive() {
  const [activeChart, setActiveChart] = useState("desktop")
  const [activeChart2, setActiveChart2] = useState("desktop")

  const [filter, setFilter] = useState('weekly')
  const [filter2, setFilter2] = useState('weekly')
  const [Piechart, setPiechart] = useState(rawChartData)
  const [HoriBar, setHoriBar] = useState(rawChartData)
  const [VeriBar, setVeriBar] = useState(rawChartData)


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

  
const navigate = useNavigate()

const Piedata = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
}

const horizontalBar = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const BarchartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  label: {
    color: "hsl(var(--background))",
  },
}

const VerticalBar = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const VertiBarchartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
}

  
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
      
      <div className=' flex justify-around gap-4'>

         {/* pie chart */}

    <Card className="flex flex-col bg-black text-white">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Custom Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] px-0"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie
              data={Piedata}
              dataKey="visitors"
              labelLine={false}
              
              label={({ payload, ...props }) => {
                return (
                  <text
                  
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="#ffffff"
                  >
                    {payload.visitors}
                  </text>
                )
              }}
              nameKey="browser"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>


      {/* horizonal bar graph */}
    <Card className = " bg-black text-white">
      <CardHeader>
        <CardTitle>Bar Chart - Custom Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={BarchartConfig}>
          <BarChart
            accessibilityLayer
            data={horizontalBar}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="desktop" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="desktop"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            >
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="desktop"
                position="right"
                offset={8}
                className="fill-[#ffffff]"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
    
   
    </div>
    <div className='flex'>
    {/* Vertical bar chart */}
    <Card className = " bg-black text-white w-1/2">
      <CardHeader>
        <CardTitle>Bar Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={VertiBarchartConfig}>
          <BarChart
            accessibilityLayer
            data={VerticalBar}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-[#ffffff]"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
    </div>


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

        <div>
        
        </div>
        </div>
        </div>
    </>
  )
}
