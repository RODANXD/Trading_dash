import { useState } from 'react'
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
  const [movement, setMovement] = useState('3')
  const [ioChange, setIoChange] = useState('3')
  const [fromTime, setFromTime] = useState('09:20 AM')
  const [toTime, setToTime] = useState('09:30 AM')
  const [sameDirectionDay, setSameDirectionDay] = useState('3')
  const [monthlyExpiryDay, setMonthlyExpiryDay] = useState('4')
  const [candleHighLowTime, setCandleHighLowTime] = useState('09:20 AM')
  const [retracement, setRetracement] = useState('20')
  const [niftyTime, setNiftyTime] = useState('09:45 AM')
  const [entryDurationTime, setEntryDurationTime] = useState('12:30 PM')
  const [isOpen, setIsOpen] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [viewall, setviewall]= useState(false)

  
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

  const toggleActivation = () => {
    setIsActivated(!isActivated);
  };
  const Addform = () => {
    
    const endpoint = "addblock"
    const strategy= 3
    const payload = JSON.stringify({strategy})
    const type = "POST"
    handleexchangerequest(type, payload, endpoint)
    .then(response => {
    setIsOpen(true);

    console.log(response)
    })

  };
  const handleviewall = ()=>{
    setviewall(true)

  }

  const handleCancelViewAll = () => {
    setviewall(false);
  };
  return (
    
    <>
    {!viewall && (
      <>
     <div className="col-md-4 col-6">
          <button type="button" className="btn btn-success" onClick={Addform}>
            + Add Trade
          </button>
        </div>
        {!isOpen && (
     <div className="h-screen  mt-3 flex flex-col gap-10">
            <div className="w-full p-2 text-xs border border-white  text-white">
              <div className="h-32 w-full flex justify-evenly">
               
                <div className="flex items-center justify-center h-24 w-64">
                  <Popover>
                    <PopoverTrigger>
                      <button className="btn btn-danger w-32">Delete</button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72">
                      <div className="grid place-items-center gap-4">
                        <div className="space-y-2 flex items-center gap-3">
                          <h4 className="font-medium leading-none text-center">Are You really want to Delete</h4>
                          <button className="btn btn-danger w-32">confirm</button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex items-center justify-center h-24 w-64">
                  <button
                    className={`btn w-44 ${isActivated ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} text-white`}
                    onClick={toggleActivation}
                  >
                    {isActivated ? "Deactivate" : "Activate"}
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
                  <button className="btn btn-info w-24" onClick={handleviewall}>
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
                <input type="text" value={movement} onChange={(e) => setMovement(e.target.value)} className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Active" />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">From Time</label>
              <TimeInput value={fromTime} onChange={(value) => setFromTime(value)} className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">To Time</label>
              <TimeInput value={toTime} onChange={(value) => setToTime(value)} className="w-full" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-center text-white">Eliminate</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">IO Change below</label>
              <div className="relative rounded-md shadow-sm">
                <input type="text" value={ioChange} onChange={(e) => setIoChange(e.target.value)} className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Same direction day</label>
              <input type="text" value={sameDirectionDay} onChange={(e) => setSameDirectionDay(e.target.value)} className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Monthly expiry day</label>
              <input type="text" value={monthlyExpiryDay} onChange={(e) => setMonthlyExpiryDay(e.target.value)} className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Candle high/low time</label>
            <TimeInput value={candleHighLowTime} onChange={(value) => setCandleHighLowTime(value)} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Retracement</label>
            <div className="relative rounded-md shadow-sm">
              <input type="text" value={retracement} onChange={(e) => setRetracement(e.target.value)} className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Nifty time</label>
            <TimeInput value={niftyTime} onChange={(value) => setNiftyTime(value)} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Entry duration time</label>
            <TimeInput value={entryDurationTime} onChange={(value) => setEntryDurationTime(value)} className="w-full" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-center text-white">Entry and Exit</h2>
          <p className="text-white mb-4">Entry will be once bal stock break of its high or low marked spot price of Candle High/low time</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-lg font-medium text-zinc-300 mb-1">Strike Price</label>
              <div className="flex items-center gap-2">
                <input type="number" className="form-input flex-grow py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
                
              </div>
            </div>
            <div>
              <label className="block text-lg font-medium text-zinc-300 mb-1">Target</label>
              <input type="text" className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
            </div>
            <div>
              <label className="block text-lg font-medium text-zinc-300 mb-1">Amount</label>
              <input type="text" className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-lg font-medium text-zinc-300 mb-1">SL</label>
              <input type="text" className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
            </div>
            <div>
              <label className="block text-lg font-medium text-zinc-300 mb-1">SL Trail</label>
              <input type="text" className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
            </div>
            <div>
              <label className="block text-lg font-medium text-zinc-300 mb-1">Timer</label>
              <input type="text" className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-lg font-medium text-zinc-300 mb-1">Profit Trail Active</label>
              <input type="text" className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
            </div>
            <div>
              <label className="block text-lg font-medium text-zinc-300 mb-1">Lock</label>
              <input type="text" className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
            </div>
            <div>
              <label className="block text-lg font-medium text-zinc-300 mb-1">Trail</label>
              <input type="text" className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
            </div>
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
            <div>
            <DropdownMenuCheckboxes/>
              {/* <input type="text" className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Active" /> */}
            </div>
            <div>
            <Button variant="outline" className="w-full bg-blue-300">Paper Live</Button>
              {/* <input type="text" className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Active" /> */}
            </div>
          </div>
        </div>

        
      </div>
      <Button
              onClick={() => {
                setIsOpen(false);
              }}
              className="mt-4"
            >
              Cancel
            </Button>
      
    </div>
    )}
    </>
    )}


      {viewall&&(<Strategy3_form onCancel={handleCancelViewAll}/>)}
  
    

    </>
  )

}