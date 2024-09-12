import { useState } from 'react'
import * as React from "react"

import { TimeInput } from '@mantine/dates'
import { CiClock2 } from "react-icons/ci"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DropdownMenuCheckboxes from './ui/dropdown'
import { Label } from "@/components/ui/label";



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

const Strategy3_form = ({ onCancel }) => {
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
  const [paper, setpaper]= useState(false)

  
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
    setIsOpen(true);
  };

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
                <input type="number" value={movement} onChange={(e) => setMovement(e.target.value)} className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Active" />
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
                <input type="number" value={ioChange} onChange={(e) => setIoChange(e.target.value)} className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Same direction day</label>
              <input type="number" value={sameDirectionDay} onChange={(e) => setSameDirectionDay(e.target.value)} className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
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
            <TimeInput value={candleHighLowTime} onChange={(value) => setCandleHighLowTime(value)} className="w-full" />
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
              <input type="number" className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
            </div>
            <div>
              <label className="block text-lg font-medium text-zinc-300 mb-1">Amount</label>
              <input type="number" className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-lg font-medium text-zinc-300 mb-1">SL</label>
              <input type="number" className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
            </div>
            <div>
              <label className="block text-lg font-medium text-zinc-300 mb-1">SL Trail</label>
              <input type="number" className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
            </div>
            <div>
              <label className="block text-lg font-medium text-zinc-300 mb-1">Timer</label>
              <input type="number" className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-lg font-medium text-zinc-300 mb-1">Profit Trail Active</label>
              <input type="number" className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
            </div>
            <div>
              <label className="block text-lg font-medium text-zinc-300 mb-1">Lock</label>
              <input type="number" className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
            </div>
            <div>
              <label className="block text-lg font-medium text-zinc-300 mb-1">Trail</label>
              <input type="number" className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Value" />
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
            <Button onClick={()=>handlemode()} variant="outline" className={paper ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>{paper?"Paper":"Live"}</Button>
              
            </div>
          </div>
        </div>

        
      </div>
      <Button
              onClick={onCancel}
              className="mt-4"
            >
              Cancel
            </Button>
      
    </div>
    </>
  )
}

export default Strategy3_form