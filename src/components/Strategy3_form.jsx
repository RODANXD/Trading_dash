import { useState,useEffect } from 'react'
import * as React from "react"

import { TimeInput } from '@mantine/dates'
import { CiClock2 } from "react-icons/ci"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DropdownMenuCheckboxes from './ui/dropdown'
import { Label } from "@/components/ui/label";
import {handleexchangerequest} from '../utility/Api'





import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Strategy3_form = ({ onCancel,blockid }) => {
  const [movement, setMovement] = useState('')
  const [ioChange, setIoChange] = useState('')
  const [fromTime, setFromTime] = useState('')
  const [toTime, setToTime] = useState('')
  const [sameDirectionDay, setSameDirectionDay] = useState('')
  const [monthlyExpiryDay, setMonthlyExpiryDay] = useState('')
  const [candleHighLowTime, setCandleHighLowTime] = useState('')
  const [retracement, setRetracement] = useState('')
  const [niftyTime, setNiftyTime] = useState('')
  const [entryDurationTime, setEntryDurationTime] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [headerData,setheaderData]=useState([])
  const [scriptData,setscriptdata]=useState([])
  


  const [onAccountSelect,setonAccountSelect]= useState([
    { id: 1, Username: "Xyz", brokername: "Shoonya", accountnumber: "123456", strategy: '', value: true },
  ])
  
  const [paper, setpaper]= useState(false)
  const [head,Sethead]= useState([
    {id:1,key: 'Amount',value:0},
    {id:2,key: 'Target',value:0},
    {id:3,key: 'Strike',value:0},
    {id:4,key: 'SL',value:0},
    {id:5,key: 'SLtrail',value:0},
    {id:6,key: 'Active',value:0},
    {id:7,key: 'Lock',value:0},
    {id:8,key: 'Trail',value:0},
    {id:9,key: 'Timer',value:0},
    ])
    

  const [bodydata,SetBodydata]= useState([
    {id:1,key: 'movementum',value:movement},
    {id:2,key: 'oichange',value:ioChange},
    {id:3,key: 'fromtime',value:fromTime},
    {id:4,key: 'totime',value:toTime},
    {id:5,key: 'samedirection',value:sameDirectionDay},
    {id:6,key: 'monthlyexpiry',value:monthlyExpiryDay},
    {id:7,key: 'candlehighlowtime',value:candleHighLowTime},
    {id:8,key: 'Retracement',value:retracement},
    {id:9,key: 'indextime',value:niftyTime},
    {id:10,key: 'Entrytime',value:entryDurationTime},

])

useEffect(() => {
  SetBodydata([
    { id: 1, key: "movementum", value: movement },
    { id: 2, key: "oichange", value: ioChange },
    { id: 3, key: "fromtime", value: fromTime },
    { id: 4, key: "totime", value: toTime },
    { id: 5, key: "samedirection", value: sameDirectionDay },
    { id: 6, key: "monthlyexpiry", value: monthlyExpiryDay },
    { id: 7, key: "candlehighlowtime", value: candleHighLowTime },
    { id: 8, key: "Retracement", value: retracement },
    { id: 9, key: "indextime", value: niftyTime },
    { id: 10, key: "Entrytime", value: entryDurationTime }
  ]);
}, [
  movement,
  ioChange,
  fromTime,
  toTime,
  sameDirectionDay,
  monthlyExpiryDay,
  candleHighLowTime,
  retracement,
  niftyTime,
  entryDurationTime
]);




  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  const [showPanel, setShowPanel] = React.useState(false)

  const toggleActivation = () => {
    setIsActivated(!isActivated);
  };
  const Addform = () => {
    setIsOpen(true);
  };

  useEffect(() => {

      bodydata.map((item)=>{
        if (item.key=="movementum"){
          setMovement(item.value)
        }
        if (item.key=="fromtime"){
          setFromTime(item.value)
        }
        if (item.key=="totime"){
          setToTime(item.value)
        }
        if (item.key=="oichange"){
          setIoChange(item.value)
        }
        if (item.key=="Entrytime"){
          setEntryDurationTime(item.value)
        }
        if (item.key=="samedirection"){
          setSameDirectionDay(item.value)
        }
        if (item.key=="monthlyexpiry"){
          setMonthlyExpiryDay(item.value)
        }
        if (item.key=="candlehighlowtime"){
          setCandleHighLowTime(item.value)
        }
        if (item.key=="Retracement"){
          setRetracement(item.value)
        }
        if (item.key=="indextime"){
          setNiftyTime(item.value)
        }
      })



  },[setMovement,setToTime,setFromTime,setIoChange,setEntryDurationTime,setSameDirectionDay,
    ,setMonthlyExpiryDay,setCandleHighLowTime,setRetracement,setNiftyTime,bodydata
  ])


  const savedatta = (Blockid=blockid)=>
  
    {
      const endpoint = "saveblock3"
      const strategy= 3
      const payload = JSON.stringify({head,paper,bodydata,strategy,Blockid,onAccountSelect})
      const type = "PUT"
      handleexchangerequest(type, payload, endpoint)
      .then(response => {
  
      console.log(response)
      })
  
    }
  

  const handleviewdetail = (Blockid=blockid)=>
  
    {
      const endpoint = "saveblock3"
      const payload = "Blockid="+Blockid
      const type = "GET"
      handleexchangerequest(type, payload, endpoint)
      .then(response => {
        if (response.length!=0){
          console.log(response,'headres')

        Sethead(response.list1)
        console.log(response.list1,'list1')
        
        SetBodydata(response.list2)
      }

      
      })
  
    }
    const tradeblocklist = async () => {
      const endpoint = "tradeblock";
      const payload = "strategy=3";
      const type = "GET";
      // try {}
      // catch (error){
      //
      // }
  
      handleexchangerequest(type, payload, endpoint).then((response) => {
        if (response) {
          settradeblockno(response);
          console.log(response, "resposnse");
        }
      });
    };
    
    const getindexdata = () => {
      const endpoint = "momentumdata"
      const strategy= 2
      const payload = ''
      const type = "GET"
      handleexchangerequest(type, payload, endpoint)
      .then(response => {
        console.log(response,'eliminateddata')
        setscriptdata(response.eliminateddata)
        setheaderData(response.headerdata)
    
    // 
      })
    
    };

useState(() => {
  tradeblocklist();
  getindexdata()
    
}, []);
    
    useEffect (()=>{
      handleviewdetail()

    },[])


  const handlemode = () =>{
    setpaper(!paper)
  }
  return (
    <>
    
    <div className="p-4 max-w-7xl mx-auto">
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className='bg-gray-300 text-black'>
              <th className="border border-gray-300 p-2" colSpan={2}>Filtered Script</th>
              <th className="border border-gray-300 p-2">Pending</th>
              <th className="border border-gray-300 p-2">Executed</th>
              <th className="border border-gray-300 p-2">Cancelled</th>
              <th className="border border-gray-300 p-2">PNL</th>
            </tr>
          </thead>
          <tbody className="text-white">
          { headerData.map((script, index) =>(
            <tr key={index}>
            <td className="border border-gray-300 p-2">{script.side}</td>
            <td className="border border-gray-300 p-2">{script.Filteredscript}</td>
            <td className="border border-gray-300 p-2">{script.pending}</td>
            <td className="border border-gray-300 p-2">{script.executed}</td>
            <td className="border border-gray-300 p-2">{script.cancelled}</td>
            <td className="border border-gray-300 p-2">{script.pnl}</td>
          </tr>  
          ))}                       
          </tbody>
        </table>
      </div>

      <div className="space-y-8">
        <div className='text-white'>
          <h2 className="text-xl font-semibold mb-4 text-center">Script Selection</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Movement</label>
              <div className="relative rounded-md shadow-sm">
                <input type="number" value={movement} onChange={(e) => setMovement(e.target.value)} className="form-input w-full py-2 px-3 text-black bg-white max-xs:w-3/4 rounded-sm" placeholder="Active" />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">From Time</label>
              <TimeInput value={fromTime} onChange={(e) => setFromTime(e.target.value)} className="w-full text-black max-xs:w-3/4" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">To Time</label>
              <TimeInput value={toTime} onChange={(e) => setToTime(e.target.value)} className="w-full text-black max-xs:w-3/4" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-center text-white">Eliminate</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">IO Change below</label>
              <div className="relative rounded-md shadow-sm">
                <input type="number" value={ioChange} onChange={(e) => setIoChange(e.target.value)} className="form-input w-full max-xs:w-3/4 py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Same direction day</label>
              <input type="number" value={sameDirectionDay} onChange={(e) => setSameDirectionDay(e.target.value)} className="form-input w-full max-xs:w-3/4 py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Monthly expiry day</label>
              <input type="number" value={monthlyExpiryDay} onChange={(e) => setMonthlyExpiryDay(e.target.value)} className="form-input w-full max-xs:w-3/4 py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Candle high/low time</label>
            <TimeInput value={candleHighLowTime} onChange={(e) => setCandleHighLowTime(e.target.value)} className="w-full max-xs:w-3/4" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Retracement</label>
            <div className="relative rounded-md shadow-sm">
              <input type="number" value={retracement} onChange={(e) => setRetracement(e.target.value)} className="form-input max-xs:w-3/4 w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Nifty time</label>
            <TimeInput value={niftyTime} onChange={(e) => setNiftyTime(e.target.value)} className="w-full max-xs:w-3/4" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Entry duration time</label>
            <TimeInput value={entryDurationTime} onChange={(e) => setEntryDurationTime(e.target.value)} className="w-full max-xs:w-3/4" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-center text-white">Entry and Exit</h2>
          <p className="text-white mb-4 max-xs:text-sm max-xs:w-3/4">Entry will be once bal stock break of its high or low marked spot price of Candle High/low time</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {head.map((item)=>(

              <div key={item}>

                <label className="block text-lg font-medium text-zinc-300 mb-1">{item.key}</label>
                <div className="flex items-center gap-2 max-xs:w-3/4">
                  <input type="number" value={item.value}   onChange= {(e)=>handleheadchange(item.id,e.target.value)} className="form-input flex-grow py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />

                </div>
              </div>
                ) 
                )}


          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* <div>
            <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full bg-blue-300">Broker</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
          >
          Angel Broker
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          >
          Zerodha
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
          >
          Binomo
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
              
            </div> */}
            <div className='max-xs:w-3/4'>
            <DropdownMenuCheckboxes stat='3' onAccountSelect={setonAccountSelect}/>
              {/* <input type="text" className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Active" /> */}
            </div>
            <div>
            <Button onClick={()=>handlemode()} variant="outline" className={paper ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>{paper?"Paper":"Live"}</Button>
              
            </div>
          </div>
        </div>

        
      </div>
      <Button onClick={onCancel} className="mt-4" > Cancel </Button>
      <Button onClick={()=>savedatta()} className="ml-3 sm:w-auto">Save</Button>

      
    </div>
    
    </>
  )
}

export default Strategy3_form