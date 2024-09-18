import { useState,useEffect } from 'react'
import * as React from "react"

import { TimeInput } from '@mantine/dates'
import { CiClock2 } from "react-icons/ci"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DropdownMenuCheckboxes from './ui/dropdown'
import { Label } from "@/components/ui/label";
import Strategy3_form from './Strategy3_form'
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



export default function TradingForm() {
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
  const [viewall, setviewall]= useState(false)
  const [paper, setpaper]= useState(false)
  const [currentblock,setcurrentblock]= useState('')

  const [Tradeblockno,settradeblockno]= useState([])
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




  

  const scriptData = [
    { name: 'RAMCOCEM', candleHighLow: '826.15', longshort: 'LONG', status: 'EXECUTED', pnl: '+200', cancel: 'CANCEL', exit: 'EXIT' },
    { name: 'EXIDEIND', candleHighLow: '504.90', longshort: 'SHORT', status: 'PENDING', pnl: '', cancel: 'CANCEL', exit: 'EXIT' },
    { name: 'HINDALCO', candleHighLow: '687.01', longshort: 'SHORT', status: 'CANCELLED', pnl: '', cancel: 'CANCEL', exit: 'EXIT' },
    { name: 'BALKRISIND', candleHighLow: '2865.04', longshort: 'LONG', status: 'REJECTED', pnl: '', cancel: 'CANCEL', exit: 'EXIT' },
    { name: 'AMBUJACE', candleHighLow: '630.32', longshort: 'LONG', status: 'EXECUTED', pnl: '+300', cancel: 'CANCEL', exit: 'EXIT' },
  ]

  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  const [showPanel, setShowPanel] = React.useState(false)

  
  const handleheadchange= (id,val)=>{
    
    Sethead((prevData) =>
  prevData.map((item) =>
    item.id === id ? { ...item,value:val } : item
  )
);

}



  
  const handlemode = () =>{
    setpaper(!paper)
  }
  const Addform = () => {
    
    setIsOpen(true);


  };
  const toggleActivation = (id,ac) => {
    const endpoint = "Activateblock"
    const Blockid= id
    const strategy= 3
    const Activate= ac
    const payload = JSON.stringify({Blockid,strategy,Activate})
    const type = "POST"
    handleexchangerequest(type, payload, endpoint)
    .then (response=> {
      console.log(response)
})
tradeblocklist()
  
  
  };

  const savedatta = ()=>
  
    {
      const endpoint = "saveblock3"
      const strategy= 3
      const payload = JSON.stringify({head,paper,bodydata,strategy})
      const type = "POST"
      handleexchangerequest(type, payload, endpoint)
      .then(response => {
  
      console.log(response)
      })
  
    }
  

  const Deleteblock = (Blockid) =>{
    const endpoint = "tradeblock"
    const payload = 'strategy=3&Blockid='+Blockid
    const type = "DELETE"
    handleexchangerequest(type, payload, endpoint)
    .then(response => {
    console.log(response)
    window.location.reload()
    })




  }

  const tradeblocklist= async () =>{
    const endpoint = "tradeblock"
    const payload = 'strategy=3'
    const type = "GET"
    // try {}
    // catch (error){
      // 
    // }

    handleexchangerequest(type, payload, endpoint)
    .then (response=> {
      if (response){
        settradeblockno(response)
    console.log(response,'resposnse')


      }

    
  
    
    })


  }
  useState(()=>{
    tradeblocklist()

  },[])


  const handleviewall = (id)=>{
    setviewall(true)
    setcurrentblock(id)

  }

  const handleCancelViewAll = () => {
    setviewall(false);
  };
  return (
    
    <>
    {!viewall && (
      <>
    <div className="flex justify-between">
          <button type="button" className="btn btn-success" onClick={()=>Addform()}>
            + Add Trade
          </button>
            <div className="col-md-4 col-6 d-flex gap-3 justify-content-end order-md-2">
            <Button>Exit All</Button>
            <Button onClick={()=>(Deleteblock(0))} className=" bg-red-600">Delete All</Button>

          </div>
        </div>


        
        {!isOpen && (
          <div>

<>
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
            <tr>
              <td className="border border-gray-300 p-2">Long side</td>
              <td className="border border-gray-300 p-2">3</td>
              <td className="border border-gray-300 p-2">1</td>
              <td className="border border-gray-300 p-2">2</td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2"></td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Short Side</td>
              <td className="border border-gray-300 p-2">2</td>
              <td className="border border-gray-300 p-2">1</td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2">1</td>
              <td className="border border-gray-300 p-2">+500</td>
            </tr>
          </tbody>
        </table>
      </div>


      <div className="overflow-y-scroll  w-full h-56 rounded-lg">
        <table className="min-w-full border border-gray-300 text- bg-white rounded-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-r text-left">Script Name</th>
              <th className="py-2 px-4 border-b border-r text-left">Candle high low</th>
              <th className="py-2 px-4 border-b border-r text-left">LONG/SHORT</th>
              <th className="py-2 px-4 border-b border-r text-left">Status</th>
              <th className="py-2 px-4 border-b border-r text-left">PNL</th>
              <th className="py-2 px-4 border-b text-left" colSpan={2}>Manual cancel or exit</th>
            </tr>
          </thead>
          <tbody>
            {scriptData.map((script, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2 px-4 border-b border-r">{script.name}</td>
                <td className="py-2 px-4 border-b border-r">{script.candleHighLow}</td>
                <td className="py-2 px-4 border-b border-r">{script.longshort}</td>
                <td className="py-2 px-4 border-b border-r">
                  <span className={`px-2 py-1 rounded ${
                    script.status === 'EXECUTED' ? 'bg-green-200 text-green-800' :
                    script.status === 'PENDING' ? 'bg-yellow-200 text-yellow-800' :
                    script.status === 'CANCELLED' ? 'bg-red-200 text-red-800' :
                    'bg-gray-200 text-gray-800'
                  }`}>
                    {script.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-r">
                  <span className={script.pnl.startsWith('+') ? 'text-green-600 font-semibold' : ''}>
                    {script.pnl}
                  </span>
                </td>
                <td className="py-2 px-2 border-b border-r">
                  <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">
                    {script.cancel}
                  </button>
                </td>
                <td className="py-2 px-2 border-b">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">
                    {script.exit}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          
        </div>
        </>


      {Tradeblockno.map((item)=>(
        <div>
          
          
     <div className="h-full mt-3 flex flex-col gap-3">

            <div className="w-full p-2 text-xs border border-white  text-white">
              <div className="h-32 w-full flex justify-evenly">
              <p className="text-white">Block Id:{item.Blockid}</p>

                <div className="flex items-center justify-center h-24 w-64">
                  <Popover>
                    <PopoverTrigger>
                      <button className="btn btn-danger w-32">Delete</button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72">
                      <div className="grid place-items-center gap-4">
                        <div className="space-y-2 flex items-center gap-3">
                          <h4 className="font-medium leading-none text-center">Are You really want to Delete</h4>
                          <button  onClick={()=>Deleteblock(item.Blockid)} className="btn btn-danger w-32">confirm</button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex items-center justify-center h-24 w-64">
                  <button
                    className={`btn w-44 ${item.Activate ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} text-white`}
                   onClick= {()=> toggleActivation(item.Blockid,!item.Activate)}                  >
                    {item.Activate ? "Deactivate" : "Activate"}
                  </button>
                </div>
                <div className="pt-1 flex flex-col gap-3 h-32 w-64">
                  <button className="btn btn-danger">Exit All</button>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">PNL</Label>
                    <Input type="number" placeholder="Value" />
                  </div>
                </div>
                <div className="flex items-center justify-center h-24 w-64">
                  <button className="btn btn-info w-24" onClick={()=>handleviewall(item.Blockid)}>
                  View Detail
                  </button>
                </div>
              </div>
             
              
              <div></div>
              <div className="overflow-y-scroll w-full h-28">
                <table className="w-full border-collapse border border-gray-300 table-fixed">
                  <thead>
                    <tr className="bg-gray-300 text-black">
                      <th className="border border-gray-300 p-2 w-[12%]">ID</th>
                      <th className="border border-gray-300 p-2">Side</th>
                      <th className="border border-gray-300 p-1">LOT</th>
                      <th className="border border-gray-300 p-1">Status</th>
                      <th className="border border-gray-300 p-1">Symbol </th>
                      <th className="border border-gray-300 p-1">Action</th>
                      <th className="border border-gray-300 p-1">Action Button</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scriptData.map((item) => (
                      <tr key={item.name} className="text-gray-800">
                        <td className="border border-gray-300 p-1 text-white">{item.name}</td>
                        <td className="border border-gray-300 p-1 text-white">{item.candleHighLow}</td>
                        <td className="border border-gray-300 p-1 text-white">{item.longshort}</td>
                        <td className="border border-gray-300 p-1 text-white">{item.status}</td>
                        <td className="border border-gray-300 p-1 text-white">{item.pnl}</td>
                        <td className="border border-gray-300 p-1 text-white">{item.cancel}</td>
                        <td className="border border-gray-300 p-1">
                          <Button className="text-xs p-2">{item.exit}</Button>
        
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
              </div>
            </div>
          </div>
          </div>
        )) }  
        </div>

    )}

    



{isOpen &&(
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
            <tr>
              <td className="border border-gray-300 p-2">Long side</td>
              <td className="border border-gray-300 p-2">3</td>
              <td className="border border-gray-300 p-2">1</td>
              <td className="border border-gray-300 p-2">2</td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2"></td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Short Side</td>
              <td className="border border-gray-300 p-2">2</td>
              <td className="border border-gray-300 p-2">1</td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2">1</td>
              <td className="border border-gray-300 p-2">+500</td>
            </tr>
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
                <input type="text" value={movement} onChange={(e) => setMovement(e.target.value)} className="form-input text-black w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Active" />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">From Time</label>
              <TimeInput value={fromTime}  withSeconds onChange={(e) => setFromTime(e.target.value)} className="w-full text-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">To Time</label>
              <TimeInput value={toTime} withSeconds onChange={(e) => setToTime(e.target.value)} className="w-full text-black" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-center text-white">Eliminate</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">IO Change below</label>
              <div className="relative rounded-md shadow-sm">
                <input type="number" value={ioChange} onChange={(e) => setIoChange(e.target.value)} className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Same direction day</label>
              <input type="number"value={sameDirectionDay} onChange={(e) => setSameDirectionDay(e.target.value)} className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Monthly expiry day</label>
              <input type="number" value={monthlyExpiryDay} onChange={(e) => setMonthlyExpiryDay(e.target.value)} className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Candle high/low time</label>
            <TimeInput value={candleHighLowTime} withSeconds onChange={(e) => setCandleHighLowTime(e.target.value)} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Retracement</label>
            <div className="relative rounded-md shadow-sm">
              <input type="number" value={retracement} onChange={(e) => setRetracement(e.target.value)} className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Index time</label>
            <TimeInput value={niftyTime}  withSeconds onChange={(e) => setNiftyTime(e.target.value)} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Entry duration time</label>
            <TimeInput value={entryDurationTime}  withSeconds onChange={(e) => setEntryDurationTime(e.target.value)} className="w-full" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-center text-white">Entry and Exit</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {head.map((item)=>(

            <div key={item}>
              
              <label className="block text-lg font-medium text-zinc-300 mb-1">{item.key}</label>
              <div className="flex items-center gap-2">
                <input type="number"    onChange= {(e)=>handleheadchange(item.id,e.target.value)} className="form-input flex-grow py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
                
              </div>
            </div>
              ) 
              )}
          

          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
            <DropdownMenuCheckboxes stat="3"/>
              {/* <input type="text" className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Active" /> */}
            </div>
            <div>
            <div>
            <Button onClick={()=>handlemode()} variant="outline" className={paper ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>{paper?"Paper":"Live"}</Button>
            </div>
              {/* <input type="text" className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Active" /> */}
            </div>
          </div>
        </div>

        
      </div>
      <div className=' flex justify-between items-center'>
      <Button
              onClick={() => {
                setIsOpen(false);
              }}
              className="mt-4"
            >
              Cancel
            </Button>
      <Button
      onClick={()=>savedatta()}
              className="mt-4"
            >
              Save
            </Button>
            
            </div>
      
    </div>
    )}
    </>
    )}


      {viewall&&(<Strategy3_form onCancel={()=>handleCancelViewAll()} blockid={currentblock}/>)}
  
    

    </>
  )

}