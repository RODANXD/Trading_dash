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





export default function DropdownMenuCheckboxes({stat, onAccountSelect}) {
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  const [showPanel, setShowPanel] = React.useState(false)
  
  const [broker,setBroker]= useState([

    {id:1,Username:"Xyz",brokername:'Shoonya',accountnumber:"123456", strategy:stat,value:true},
    {id:2,Username:"Xyz",brokername:'Angel',accountnumber:"123456",strategy:stat,value:true},
    {id:3,Username:"Xyz",brokername:'Dhan',accountnumber:"123456",strategy:stat,value:true},]


  )

  React.useEffect(()=>{
    getbroker()
  },[])

  const getbroker = async () =>{
    const endpoint = "broker"
    const type = "GET"
    const payload= ''
    const sdd= localStorage.getItem('token')
    const token = "token " + sdd;

    if (type === "GET" || "DELETE") {
      const response = await fetch(
        "http://3.111.155.182:8000/" + endpoint +"?"+ payload,
        {
          method: type,
          headers: {  
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const datastr = await response.json();
      console.log(datastr)
      
      setBroker(datastr.message)


      
    }

  }

  const updatedBroker = broker.find(b => b.id === id);
    if (updatedBroker) {
      onAccountSelect({
        id: updatedBroker.id,
        Username: updatedBroker.Username,
        brokername: updatedBroker.brokername,
        accountnumber: updatedBroker.accountnumber,
        value: !updatedBroker.value
      });
    }
  
  


  const showStatusBar= (id,val) =>{
    const endpoint = "broker"
    const strategy= 1
    const sublegdata= {advice,spotprice,correction,sltype,tsltype,strikeprice,targettype,sl,target,timer,trail,call,
      put,Activeleg,lockleg,targetleg,tslleg,Quantprice,Amount,nearestatm, instruction}
    const tradetool=   {tradevalidity,Notradingzone,tradetype,segment,selectVertical,fno,expiry,paper,rentry,overallActive,overallloss,overallLock,overallTARGET,overallTrailprofit,overallpnl,selectsymbol}
    const payload = JSON.stringify({strategy,tradetool,sublegdata})
    const type = "POST"
    getbroker(type, payload, endpoint)
    .then(response => {
    console.log(response)
    })

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