import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DropdownMenuCheckboxes from "./ui/dropdown";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import * as React from "react";
import Strategy2_form from "./Strategy2_form";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Strategy() {
  const [isOpen, setIsOpen] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [viewall, setviewall]= useState(false)


  const Addform = () => {
    setIsOpen(true);
  };

  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);
  const scriptData = [
    { name: "RAMCOCEM", candleHighLow: "826.15", longshort: "LONG", status: "EXECUTED", pnl: "+200", cancel: "CANCEL", exit: "EXIT" },
    { name: "EXIDEIND", candleHighLow: "504.90", longshort: "SHORT", status: "PENDING", pnl: "", cancel: "CANCEL", exit: "EXIT" },
  ];

  const toggleActivation = () => {
    setIsActivated(!isActivated);
  };
  const handleCancelViewAll = () => {
    setviewall(false);
  };
  const handleviewall = ()=>{
    setviewall(true)

  }

  return (
    <>
    {!viewall && (
      <>
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center text-white">Index Price</h2>
        <div className="col-md-4 col-6">
          <button type="button" className="btn btn-success" onClick={Addform}>
            + Add Trade
          </button>
        </div>
        
        
          {!isOpen && (
            <div className=" flex flex-col gap-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {["Nifty", "Bank Nifty", "Sensex", "Midcap", "Finnifty", "PNL", "Active/Deactive"].map((item) => (
              <div key={item} className="flex flex-col items-center gap-2">
                <Label variant="outline" className="w-full text-teal-50 text-lg">
                  {item}
                </Label>
                <Input placeholder="Value" className="w-full" />
              </div>
            ))}
          </div>
        

        
          <div className="h-[60%] border border-emerald-900">
            <div className="w-full border border-white rounded-sm h-[10%] p-2 text-xs text-white">
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
                    View All
                  </button>
                </div>
              </div>

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
        )}

     
        {isOpen && (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {['Movement Time', 'Movement Continuity', 'Amount'].map((item) => (
          <div key={item} className="flex flex-col items-center gap-2">
            <Button variant="outline" className="w-full bg-green-600">{item}</Button>
            <Input placeholder="Value" className="w-full" defaultValue={item === 'Amount' ? '20000' : item === 'Movement Continuity' ? '1500' : '100'} />
          </div>
        ))}
      </div>
      
      

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col items-center gap-2">
          <Button variant="outline" className="w-full bg-green-600">Spike in Index</Button>
          <Input placeholder="Value" className="w-full" defaultValue="0.20%" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button variant="outline" className="w-full bg-green-600">Strike Price</Button>
          <div className="flex w-full gap-2">
            <Input placeholder="Value" type="number" className="flex-grow" defaultValue="4%" />
            
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button variant="outline" className="w-full bg-green-600">Target</Button>
          <Input placeholder="Value" className="w-full" defaultValue="50%" />
        </div>
      </div>
      <h2 className=" text-white text-xl">Profit Trail</h2>
      {['SL', 'Active'].map((section, index) => (
        <div key={section} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[section, ['SL Trail', 'Lock'][index], ['Re entry', 'Trail'][index]].map((item) => (
            <div key={item} className="flex flex-col items-center gap-2">
              <Button variant="outline" className="w-full bg-green-600">{item}</Button>
              <Input 
                placeholder="Value" 
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
            <Button variant="outline" className="w-full bgreen-600">Paper/Live</Button>
            </div>
          </div>

      <Button className="w-full sm:w-auto">Save</Button>

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
      </div>
      
      
    </div>
    </>
    )}
    {viewall&&(<Strategy2_form onCancel={handleCancelViewAll}/>)}
    </>
  );
}
