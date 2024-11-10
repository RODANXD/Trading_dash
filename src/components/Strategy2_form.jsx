
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DropdownMenuCheckboxes from "./ui/dropdown";
import { Label } from "@/components/ui/label";
import { useState,useEffect } from "react";
import * as React from "react";
import {handleexchangerequest} from '../utility/Api'

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


const Strategy2_form = ({ onCancel,blockid }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [paper, setpaper]= useState(false)


  const Addform = () => {
    setIsOpen(true);
  };

  const handlemode = () =>{
    setpaper(!paper)
  }
  const [onAccountSelect,setonAccountSelect]= useState([
    { id: 1, Username: "Xyz", brokername: "Shoonya", accountnumber: "123456", strategy: '', value: true },
  
  ])
  
  const [head,Sethead]= useState([{id:1,key:'MTime',value:0}, 
    {id:2,key:'MContinuity',value:0},
    {id:3,key: 'Amount',value:0},
    {id:4,key: 'Spike',value:0},
    {id:5,key: 'Target',value:0},
    {id:6,key: 'Strike',value:0},
    {id:7,key: 'SL',value:0},
    {id:8,key: 'SLtrail',value:0},
     {id:9,key: 'Rentry',value:0},
    {id:10,key: 'Active',value:0},
    {id:11,key: 'Lock',value:0},
    {id:12,key: 'Trail',value:0},
    ])

  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);
  const scriptData = [
    { name: "RAMCOCEM", candleHighLow: "826.15", longshort: "LONG", status: "EXECUTED", pnl: "+200", cancel: "CANCEL", exit: "EXIT" },
    { name: "EXIDEIND", candleHighLow: "504.90", longshort: "SHORT", status: "PENDING", pnl: "", cancel: "CANCEL", exit: "EXIT" },
  ];

  const savedatta = (Blockid=blockid)=>
  
    { 
      const endpoint = "saveblockst2"
      const strategy= 2
      const payload = JSON.stringify({head,paper,strategy,Blockid,onAccountSelect})
      const type = "PUT"
      handleexchangerequest(type, payload, endpoint)
      .then(response => {
  
      console.log(response)
      window.location.reload()
      })
  
    }


    const handleheadchange = (id, val) => {
      Sethead((prevData) =>
        prevData.map((item) => (item.id === id ? { ...item, value: val } : item))
      )}
    
    
      console.log(head,'head')
    const handleviewdetail = (Blockid=blockid)=>
  
      {
        const endpoint = "saveblockst2"
        const payload = "Blockid="+Blockid
        const type = "GET"
        handleexchangerequest(type, payload, endpoint)
        .then(response => {
          if (response.length!=0){
            console.log(response,'headres')

          Sethead(response)
        }

        
        })
    
      }
      

      
      useEffect (()=>{
        handleviewdetail()
  
      },[])
  
  

  const toggleActivation = () => {
    setIsActivated(!isActivated);
  };

  return (
    <>
    <div>
    {!isOpen && (
      
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {head.map((item) => (
          <div key={item} className="flex flex-col items-center gap-2">
            <Button variant="outline" className="w-full bg-green-600">{item.key}</Button>
            <Input placeholder="Value" value= {item.value} className="w-full" type="number" onChange= {(e)=>handleheadchange(item.id,e.target.value)}/>
          </div>
        ))}
      </div>


<div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-4">
            {/* <div>
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
            </div> */}
            <div><Button className='bg-green-700'>Automatic Strike</Button></div>
            <div>
            <DropdownMenuCheckboxes stat='2' onAccountSelect={setonAccountSelect}/>
            </div>
            <div>
                       <Button onClick={()=>handlemode()} variant="outline" className={paper ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>{paper?"Paper":"Live"}</Button>

            </div>
          </div>

      <Button onClick={()=>savedatta()} className="w-full sm:w-auto">Save</Button>

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