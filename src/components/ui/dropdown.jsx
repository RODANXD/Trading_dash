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

export default function DropdownMenuCheckboxes(stat) {
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  const [showPanel, setShowPanel] = React.useState(false)
  
  const [broker,setBroker]= useState([
    {id:1,Username:"Xyz",brokername:'Shoonya',accountnumber:"123456", strategy:stat,value:true},
    {id:2,Username:"Xyz",brokername:'Angel',accountnumber:"123456",strategy:stat,value:true},
    {id:3,Username:"Xyz",brokername:'Dhan',accountnumber:"123456",strategy:stat,value:true},]


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
          {item.Username +" " +item.brokername+" "+item.accountnumber}
        </DropdownMenuCheckboxItem>

            ))}

      </DropdownMenuContent>
    </DropdownMenu>
  )
}