import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DropdownMenuCheckboxes from "./ui/dropdown"
import { useEffect, useState } from 'react';
import * as React from "react"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Strategy() {
  const [addtrade,setAddtrade]= useState(true)
  const [isOpen,setIsOpen] = useState(false)
  const Addform= ()=>{
    setIsOpen(!isOpen)}

  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  const [showPanel, setShowPanel] = React.useState(false)
  const scriptData = [
    { name: 'RAMCOCEM', candleHighLow: '826.15', longshort: 'LONG', status: 'EXECUTED', pnl: '+200', cancel: 'CANCEL', exit: 'EXIT' },
    { name: 'EXIDEIND', candleHighLow: '504.90', longshort: 'SHORT', status: 'PENDING', pnl: '', cancel: 'CANCEL', exit: 'EXIT' },
    { name: 'HINDALCO', candleHighLow: '687.01', longshort: 'SHORT', status: 'CANCELLED', pnl: '', cancel: 'CANCEL', exit: 'EXIT' },
    { name: 'BALKRISIND', candleHighLow: '2865.04', longshort: 'LONG', status: 'REJECTED', pnl: '', cancel: 'CANCEL', exit: 'EXIT' },
    { name: 'AMBUJACE', candleHighLow: '630.32', longshort: 'LONG', status: 'EXECUTED', pnl: '+300', cancel: 'CANCEL', exit: 'EXIT' },
  ]

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center text-white">Index Price</h2>
        <div className="col-md-4 col-6">
          <button type="button" className="btn btn-success" onClick={Addform}>+ Add Trade</button>
          

        </div>
        
        <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {['Nifty', 'Bank Nifty', 'Sensex', 'Midcap', 'Finnifty', 'PNL', 'Active/Deactive'].map((item) => (
            <div key={item} className="flex flex-col items-center gap-2">
              <Button variant="outline" className="w-full">{item}</Button>
              <Input placeholder="Active" className="w-full" />
            </div>
          ))}
        </div>
      </div>

      <div className="h-[10%]">
        <div className=" w-full border border-white rounded-sm h-[10%] p-2 text-xs text-white">
        <table className="w-[] border-collapse border border-gray-300 ">
          <thead>
            <tr className='bg-gray-300 text-black'>
              <th className="border border-gray-300 p-2 w-[12%]" colSpan={2}>ID</th>
              <th className="border border-gray-300 p-2">Side</th>
              <th className="border border-gray-300 p-1">LOT</th>
              <th className="border border-gray-300 p-1">Status</th>
              <th className="border border-gray-300 p-1">Symbol </th>
              <th className="border border-gray-300 p-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {scriptData.map((item) => ( <tr key={item.name} className="text-gray-800 ">
                <td className="border border-gray-300 p-1">{item.name}</td>
                <td className="border border-gray-300 p-1">{item.candleHighLow}</td>
                <td className="border border-gray-300 p-1">{item.longshort}</td>
                <td className="border border-gray-300 p-1">{item.status}</td>
                <td className="border border-gray-300 p-1">{item.pnl}</td>
                <td className="border border-gray-300 p-1">{item.cancel}</td>
                <td className="border border-gray-300 p-1"><Button className="text-xs p-3">{item.exit}</Button></td>
              </tr>))}
              </tbody>
        </table>

        </div>
      </div>


      {isOpen?(
      <div className=" flex flex-col gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {['Movement Time', 'Movement Continuity', 'Amount'].map((item) => (
          <div key={item} className="flex flex-col items-center gap-2">
            <Button variant="outline" className="w-full">{item}</Button>
            <Input placeholder="Active" className="w-full" defaultValue={item === 'Amount' ? '20000' : item === 'Movement Continuity' ? '1500' : '100'} />
          </div>
        ))}
      </div>
      
      

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col items-center gap-2">
          <Button variant="outline" className="w-full bg-green-600">Spike in Index</Button>
          <Input placeholder="Active" className="w-full" defaultValue="0.20%" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button variant="outline" className="w-full bg-green-600">Strike Price</Button>
          <div className="flex w-full gap-2">
            <Input placeholder="Active" className="flex-grow" defaultValue="4%" />
            <Button variant="destructive" className="px-3">+</Button>
            <Button variant="default" className="px-3">-</Button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button variant="outline" className="w-full bg-green-600">Target</Button>
          <Input placeholder="Active" className="w-full" defaultValue="50%" />
        </div>
      </div>
      <h2 className=" text-white text-xl">Profit Trail</h2>
      {['SL', 'Active'].map((section, index) => (
        <div key={section} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[section, ['SL Trail', 'Lock'][index], ['Re entry', 'Trail'][index]].map((item) => (
            <div key={item} className="flex flex-col items-center gap-2">
              <Button variant="outline" className="w-full bg-green-600">{item}</Button>
              <Input 
                placeholder="Active" 
                className="w-full" 
                defaultValue={
                  item === 'SL' ? '10%' : 
                  item === 'SL Trail' ? '4' : 
                  item === 'Re entry' ? '5' : 
                  item === 'Profit Trail Active' ? '5%' : 
                  item === 'Lock' ? '2%' : 
                  item === 'Trail' ? '1%' : ''
                } 
              />
            </div>
          ))}
        </div>
        
      ))}

<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
            <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full bgreen-600">Broker</Button>
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
            </div>
            <div>
            <DropdownMenuCheckboxes/>
            </div>
            <div>
            <Button variant="outline" className="w-full bgreen-600">Paper Live</Button>
            </div>
          </div>

      <Button className="w-full sm:w-auto">Save</Button>
    </div>
    ):''}
    </div>
  
    
    </div>
  )
}