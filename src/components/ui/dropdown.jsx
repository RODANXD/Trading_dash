"use client"

import * as React from "react"
import { useState } from "react";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DropdownMenuCheckboxes() {
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  const [showPanel, setShowPanel] = React.useState(false)
  
  const [broker,setBroker]= useState([
    {id:1,name:'Shoonya',Account:"",value:true},
    {id:2,name:'Dhan',Account:"",value:true},
    {id:3,name:'Angel',Account:"",value:true},]


  )
  const showStatusBar= (id,val) =>{

    setBroker((prevData) =>
  prevData.map((item) =>
    item.id === id ? { ...item,value:!item.value } : item
  )
);


}



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full bg-blue-300">Account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel></DropdownMenuLabel>
        <DropdownMenuSeparator />
  
        
        {broker.map((item) => (
          <DropdownMenuCheckboxItem
          
          onCheckedChange={()=>showStatusBar(item.id,!item.value)} 
          checked={item.value}
          >
          {item.name}
        </DropdownMenuCheckboxItem>

            ))}

      </DropdownMenuContent>
    </DropdownMenu>
  )
}