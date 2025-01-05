import React, { useState, useMemo ,useEffect} from 'react'
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

import {handleexchangerequest} from '../utility/Api'
import moment from "moment";


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
  const [filter, setFilter] = useState('weekly')
  const [Piechart, setPiechart] = useState([])
  const [HoriBar, setHoriBar] = useState([])
  const [VeriBar, setVeriBar] = useState([])
  const [rawChartDatax, setRawchartdatax] = useState([])
  const [timeSeriesData, setTimeSeriesData] = useState({
    
  })
  const [multidata,setmultidata ] = useState([])



  useEffect(() => {
       
        fetchData();
      
    }, [setHoriBar])



const fetchData= async () =>{
    const endpoint = "dashdata"
    const type = "GET"
    const payload =''
    

    handleexchangerequest(type, payload, endpoint)
    .then (response=> {
      if (response){
        setRawchartdatax(response.netprofit)
    console.log(response,'resposnse')


      }

    console.log(response,'resposnse')
    const pieData = Object.entries(response.pi).map(([key, value]) => ({
      browser: key,
      visitors: value,
      fill: getFillColor(key)
    }));
    setPiechart(pieData);
    console.log(pieData,'resposnse')
    // Process horizontal bar data
    
    setHoriBar(response.brokercount);
    // console.log(response.brokercount,'horizontal')

    // Process vertical bar data
    setVeriBar(response.active);
    // console.log(response.active,'vertical')


    // Process time series data if needed
    setTimeSeriesData(response.netprofit.daily)
    setmultidata(response.multidata)
    console.log(response.multidata,'')
    return {
      pieData,
      rawData: response,
      
    };
    })
  }




  
const navigate = useNavigate()


const getFillColor = (key) => {
  // Define colors for each key dynamically
  const colors = {
    Tradetool: "hsl(var(--chart-1))",
    Indexscalp: "hsl(var(--chart-2))",
    movementum: "hsl(var(--chart-3))",
  };
  return colors[key] || "hsl(var(--chart-4))"; 
};

const chartConfig = {
  strategy: { label: "strategy", color: "hsl(var(--chart-1))" },
  count: { label: "count", color: "hsl(var(--chart-2))" },
};
const VerchartConfig = {
  broker: { label: "broker", color: "hsl(var(--chart-1))" },
  count: { label: "count", color: "hsl(var(--chart-2))" },
  // movementum: { label: "Movementum", color: "hsl(var(--chart-3))" },
  
}

const handlefilter = (val)=> {
  setFilter(val)
  if (val==='daily'){
    setTimeSeriesData(rawChartDatax.daily)

  }
  if (val==='weekly'){
    setTimeSeriesData(rawChartDatax.weekly)

  }
  if (val==='monthly'){
    setTimeSeriesData(rawChartDatax.monthly)

  }
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80, tablet: 120, smartwatch: 40 },
  { month: "February", desktop: 305, mobile: 200, tablet: 180, smartwatch: 70 },
  { month: "March", desktop: 237, mobile: 120, tablet: 160, smartwatch: 55 },
  { month: "April", desktop: 73, mobile: 190, tablet: 140, smartwatch: 80 },
  { month: "May", desktop: 209, mobile: 130, tablet: 170, smartwatch: 60 },
  { month: "June", desktop: 214, mobile: 140, tablet: 190, smartwatch: 75 },
];

const MultilineConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  tablet: {
    label: "Tablet",
    color: "hsl(var(--chart-3))",
  },
  smartwatch: {
    label: "Smartwatch",
    color: "hsl(var(--chart-4))",
  },
};



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



const VertiBarchartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
}



  
  return (
    <>
    <div className='max-md:w-screen md:w-full xl:w-screen 2xl:w-full'>
    <div className=' flex flex-col gap-6 '>
<div className=' flex justify-center gap-4  h-full'>
    <Button className="bg-sky-800 hover:bg-sky-600 duration-500"  onClick={() => navigate('/dashTable')}>Trade</Button>
    <Button className="bg-green-800  hover:bg-green-600 duration-500" onClick={() => navigate('/report')}>Report</Button>
</div>
    <div>

</div>
    <div className=' flex flex-col gap-4'>
      
      {/* <div className=' flex justify-evenly flex-wrap max-w-screen-tablet-md tablet-md:justify-center tablet-md:gap-44 '> */}
      <div className=' grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 mx-5'>

         {/* pie chart */}
<div>
    <Card className="flex flex-col bg-gray-950 text-white  h-full ">
      <CardHeader className="items-center pb-0">
        <CardTitle className='text-[clamp(1rem, 2.5vw, 2rem)]'>Pie Chart - Custom Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] px-0"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" className=' w-44'  hideLabel />}
            />
            <Pie
              data={Piechart}
              dataKey="visitors"
              labelLine={false}
              
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
    </div>

      {/* horizonal bar graph */}

      <div>
    <Card className = " bg-gray-950 text-white">
      <CardHeader>
        <CardTitle>Bar Chart - Custom Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="mx-auto aspect-square max-h-[250px] px-0" config={VerchartConfig}>
          <BarChart
            accessibilityLayer
            data={HoriBar}
            
            layout="vertical"
            margin={{
              right: 16,
            }}
            
          >
            
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="broker"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="count"
              layout="vertical"
              fill="var(--color-count)"
              radius={4}
            >
              <LabelList
                dataKey="count"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="broker"
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
    <div>
    <Card className=' bg-gray-950 text-white h-full'>
      <CardHeader>
        <CardTitle>Line Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={MultilineConfig}>
          <LineChart
            accessibilityLayer
            data={multidata}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="updated_at"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <Line
              dataKey="Tradetool"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="Indexscalp"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="Momentum"
              type="monotone"
              stroke="var(--color-tablet)"
              strokeWidth={2}
              dot={false}
            />
            
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total visitors for the last 6 months across all devices
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
    </div>
   
    </div>
    <div>
    {/* Vertical bar chart */}
    <Card className="bg-gray-950 text-white">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        {/* <div className="flex">
          {["desktop", "mobile"].map((key) => (
            <button
              key={key}
              data-active={activeChart === key}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveChart(key)}
            >
              <span className="text-xs text-muted-foreground">
                {chartConfig[key].label}
              </span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                {total[key].toLocaleString()}
              </span>
            </button>
          ))}
        </div> */}
      </CardHeader>
      <CardContent className="px-2 sm:p-6 ">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
           
            accessibilityLayer
            data={VeriBar}
            margin={{
              left: 12,
              right: 12,

            }}
            
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="strategy"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              
              
            />
            
            <ChartTooltip
            cursor={false}
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  
                  
                  labelFormatter={(value) => {
                value.slice(0, 3)

                                     }}
                />
              }
            />
            <Bar dataKey='count' fill={`var(--color-strategy)`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
    </div>


    <div className=' flex flex-col gap-4'>
    <Card className="bg-gray-950 text-white">
      <CardHeader className="flex flex-col items-stretch h-auto space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 sm:py-6">
          <CardTitle>Line Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 6 months
          </CardDescription>
        </div>
        
        <div className=' grid grid-cols-1 mr-4 gap-4 place-items-center'>
        <div className="mb-4 flex justify-center flex-wrap space-x-2">
          <Button className=" text-white"
            // variant={filter === 'daily' ? 'secondary' : 'outline'}
            onClick={() => handlefilter('daily')}
>
            Daily
          </Button>
          <Button
            // variant={filter === 'weekly' ? 'secondary' : 'outline'}
            onClick={() => handlefilter('weekly')}
          >
            Weekly
          </Button>
          <Button
            // variant={filter === 'monthly' ? 'secondary' : 'outline'}
            onClick={() => handlefilter('monthly')}
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
              data={timeSeriesData}

              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} stroke='#334' />
              <XAxis
  dataKey="updated_at"
  tickLine={false}
  axisLine={false}
  tickMargin={8}
  minTickGap={32}
  tickFormatter={(value) => {
    const date = new Date(value);
    return date.toISOString().split('T')[0]; // This will format the date as YYYY-MM-DD
  }}
/>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => {
      
                                           }}
      
                    
                  />
                }
              />
              <Line
                dataKey='pnl'
                type="monotone"
                stroke='#E76E50'
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

        <div>
        
        </div>
        </div>
        </div>
        </div>
    </>
  )
}
