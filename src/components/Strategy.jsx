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
import {handleexchangerequest} from '../utility/Api'



import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Strategy() {
  const [isOpen, setIsOpen] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [viewall, setviewall]= useState(false)
  const [paper, setpaper]= useState(false)
  const [paper1, setpaper1]= useState(false)
  const [Automatic_strike, setAutomatic_strike]= useState(0)
  const [Tradeblockno,settradeblockno]= useState([])
  const [currentblock,setcurrentblock]= useState('')
  const [isContentDisabled,setisContentDisabled]= useState(false)
  


  


  


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

  const [broker,setBroker]= useState([
    {id:1,name:'Shoonya',Number:'',value:true},
    {id:2,name:'Dhan',Number:'',value:true},
    {id:3,name:'Angel',Number:'',value:true},]


  )

// const [head,Sethead]= useState([{MovementTime:'', MovementContinuity:'',Amount:''}])

  
  const Addform = () => {
    // const endpoint = "addblock"
    // const strategy= 2
    // const payload = JSON.stringify({strategy})
    // const type = "POST"
    // handleexchangerequest(type, payload, endpoint)
    // .then(response => {
    setIsOpen(true);

    // console.log(response)
    // })

  };

  const toggleActivation = (id,ac) => {
    const endpoint = "Activateblock"
    const Blockid= id
    const strategy= 2
    const Activate= ac
    const payload = JSON.stringify({Blockid,strategy,Activate})
    const type = "POST"
    handleexchangerequest(type, payload, endpoint)
    .then (response=> {
      console.log(response)
})
tradeblocklist()

  
  };


  const Deleteblock = (Blockid) =>{
    const endpoint = "tradeblock"
    const payload = 'strategy=2&Blockid='+Blockid
    const type = "DELETE"
    handleexchangerequest(type, payload, endpoint)
    .then(response => {
    console.log(response)
    window.location.reload()
    })




  }
  const savedatta = ()=>
  
    {
      const endpoint = "saveblockst2"
      const strategy= 2
      const payload = JSON.stringify({head,paper,strategy})
      const type = "POST"
      handleexchangerequest(type, payload, endpoint)
      .then(response => {
  
      console.log(response)
      })
  
    }
  
  const tradeblocklist= async () =>{
    const endpoint = "tradeblock"
    const payload = 'strategy=2'
    const type = "GET"

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

  
  const scriptData = [
    { name: "RAMCOCEM", candleHighLow: "826.15", longshort: "LONG", status: "EXECUTED", pnl: "+200", cancel: "CANCEL", exit: "EXIT" },
    { name: "EXIDEIND", candleHighLow: "504.90", longshort: "SHORT", status: "PENDING", pnl: "", cancel: "CANCEL", exit: "EXIT" },
  ];

  
const handleviewdetail = ()=>{





}



  const handleCancelViewAll = () => {
    setviewall(false);
  };
  const handleviewall = (id)=>{
    setviewall(true)
    setcurrentblock(id)

  }

console.log(broker,'broker')
  const showStatusBar= (id,val) =>{

          setBroker((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item,value:!item.value } : item
        )
      );


  }

  const handlemode = () =>{
    setpaper(!paper)
  }
  const handlemode2 = () =>{
    setpaper1(!paper1)
    setisContentDisabled(!isContentDisabled)
    setAutomatic_strike(true)
  }
  console.log(head,'head')
  const handleheadchange= (id,val)=>{
    
          Sethead((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item,value:val } : item
        )
      );
    
  }
  return (
    <>
    {!viewall && (

      <>
      
    <div className="container mx-auto px-4 py-8 space-y-8 ">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center text-white max-xs:text-sm">Index Price</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-xs:w-[75%]">
      <div className="flex justify-start">
        <Button 
          type="button" 
          className=" bg-green-600 w-full sm:w-auto text-sm sm:text-base max-xs:text-xs" 
          onClick={Addform}
        >
          + Add Trade
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 max-xs:flex max-xs:flex-col">
        <Button className="w-full text-sm sm:text-base">Exit All</Button>
        <Popover>
        <PopoverTrigger asChild>
        <Button variant="destructive" className="w-full max-xs:text-sm sm:w-32">Delete All</Button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <div className="grid place-items-center gap-4">
            <div className="space-y-2 flex flex-col sm:flex-row items-center gap-3">
              <h4 className="font-medium leading-none text-center">Are You really want to Delete</h4>
              <Button variant="destructive" className="w-full sm:w-32 max-xs:text-sm"  onClick={()=>Deleteblock(item.Blockid)}>confirm</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      </div>
    </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-xs:w-3/4 lg:grid-cols-6 gap-4">
            {["Nifty", "Bank Nifty", "Sensex", "Midcap", "Finnifty", "PNL"].map((item) => (
              <div key={item} className="flex flex-col items-center gap-2">
                <Label variant="outline" className="w-full text-teal-50 text-lg">
                  {item}
                </Label>
                <Input placeholder="Value" type="number" className="w-full" />
              </div>
            ))}
          </div>

          {!isOpen && (
             Tradeblockno.map((item)=>(
              <div>
            <div className=" flex flex-col gap-5">

              
        

        
            <div className="h-full mt-3 flex flex-col gap-3">

<div className="w-full border border-white rounded-sm p-2 max-xs:w-3/4 text-xs text-white">
  <p className="text-white">Block Id:{item.Blockid}</p>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">

    <div className="flex items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
        <Button variant="destructive" className="w-full max-xs:text-sm sm:w-32">Delete</Button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <div className="grid place-items-center gap-4">
            <div className="space-y-2 flex flex-col sm:flex-row items-center gap-3">
              <h4 className="font-medium leading-none text-center">Are You really want to Delete</h4>
              <Button variant="destructive" className="w-full sm:w-32 max-xs:text-sm"  onClick={()=>Deleteblock(item.Blockid)}>confirm</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
    <div className="flex items-center justify-center">
      <Button
        className={`w-full sm:w-44 ${item.Activate ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} text-white`}
       onClick= {()=> toggleActivation(item.Blockid,!item.Activate)}                  >
        {item.Activate ? "Deactivate" : "Activate"}
      </Button>
    </div>
    <div className="flex flex-col gap-3">
    <Button variant="destructive" className="w-full">Exit All</Button>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">PNL</Label>
        <Input type="number" className=" text-black" placeholder="Value" />
      </div>
    </div>
    <div className="flex items-center justify-center">
      <Button className="w-full sm:w-24" onClick={()=>handleviewall(item.Blockid)}>
      View Detail
      </Button>
    </div>
  </div>
 
  
  
  <div className="overflow-y-scroll h-28 ">
<table className="w-full border-collapse border border-gray-300">
<thead>
  <tr className="bg-gray-300 text-black">
    <th className="border border-gray-300 p-2">ID</th>
    <th className="border border-gray-300 p-2">Side</th>
    <th className="border border-gray-300 p-1">LOT</th>
    <th className="border border-gray-300 p-1">Status</th>
    <th className="border border-gray-300 p-1">Symbol</th>
    <th className="border border-gray-300 p-1">Action</th>
    <th className="border border-gray-300 p-1">Action Button</th>
  </tr>
</thead>
<tbody>

  {scriptData.map((item) => (
    <tr key={item.name} className="text-gray-800 ">
      <td className="border border-gray-300 p-1 text-white">{item.name}</td>
      <td className="border border-gray-300 p-1 text-white">{item.candleHighLow}</td>
      <td className="border border-gray-300 p-1 text-white">{item.longshort}</td>
      <td className="border border-gray-300 p-1 text-white">{item.status}</td>
      <td className="border border-gray-300 p-1 text-white">{item.pnl}</td>
      <td className="border border-gray-300 p-1 text-white">{item.cancel}</td>
      <td className="border border-gray-300 p-1 items-center flex justify-center">
        <Button size="sm" className="">{item.exit}</Button>
      </td>
    </tr>
  ))}
</tbody>
</table>
</div>
</div>
</div>
          </div>
          </div>
             ))

          
        )}

     
        {isOpen && (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {head.map((item) => (
          <div key={item} className="flex flex-col items-center gap-2">
            <Button variant="outline"
            disabled={item.key === 'Spike' && isContentDisabled}
             className={`w-full ${item.key === 'Spike' && isContentDisabled ? ' opacity-1' : 'bg-green-600'}`}>{item.key}</Button>
            <Input placeholder="Value" disabled={item.key === 'Spike' && isContentDisabled} className="w-full" type="number" onChange= {(e)=>handleheadchange(item.id,e.target.value)}/>
          </div>
        ))}
      </div>
      
      
      
      <h2 className=" text-white text-xl">Select Broker</h2>
      {/* {['SL', 'Active'].map((section, index) => ( */}
        {/* <div key={section} className="grid grid-cols-1 sm:grid-cols-3 gap-4"> */}
          {/* {[section, ['SL Trail', 'Lock'][index], ['Re entry', 'Trail'][index]].map((item) => ( */}
            {/* <div key={item} className="flex flex-col items-center gap-2"> */}
              {/* <Button variant="outline" className="w-full bg-green-600">{item}</Button> */}
              {/* <Input  */}
              {/* /> */}
            {/* </div> */}
          {/* ))} */}
        {/* </div> */}
        
      {/* ))} */}

<div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-4">
            
            <div><Button onClick={()=>handlemode2()} className={paper1 ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>{paper1?"Automatic Strike":"Automatic Strike"}</Button></div>
            <div>
            <DropdownMenuCheckboxes stat="2"/>
            </div>
            <div>
            <Button onClick={()=>handlemode()} variant="outline" className={paper ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>{paper?"Paper":"Live"}</Button>
            </div>
          </div>

      <Button  onClick={()=>savedatta()}className="w-full sm:w-auto">Save</Button>

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
    {viewall&&(<Strategy2_form onCancel={handleCancelViewAll} blockid= {currentblock}/>)}
    </>
  );
}
