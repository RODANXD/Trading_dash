
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DropdownMenuCheckboxes from "./ui/dropdown";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import * as React from "react";

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


const Strategy2_form = ({ onCancel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

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

  return (
    <>
    <div>
    {!isOpen && (
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
              onClick={onCancel}
              className="mt-4"
            >
              Cancel
            </Button>
          </div>
        )}
    </div>
    </>
  )
}

export default Strategy2_form