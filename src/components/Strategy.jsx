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
  const [Automaticstrike, setAutomaticstrike]= useState(false)

  const [Tradeblockno,settradeblockno]= useState([])
  const [currentblock,setcurrentblock]= useState('')
  const [isContentDisabled,setisContentDisabled]= useState(false)
  const [indexdata,setindexdata]= useState([
    {NAME:"NIFTY",VALUE:0, },
    {NAME:"BANKNIFTY",VALUE:0, },
    {NAME:"FINNIFTY",VALUE:0, },
    {NAME:"MIDCAP",VALUE:0, },
    {NAME:"SENSEX",VALUE:0, },
    {NAME:"PNL",VALUE:0, },
  ])

  
  const [onAccountSelect,setonAccountSelect]= useState([
    { id: 1, Username: "Xyz", brokername: "Shoonya", accountnumber: "123456", strategy:'' , value: true }]
  )


  console.log(onAccountSelect,'selectedOption')

  


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
  


  React.useEffect(()=>{

  
    getindexdata()
  
  
  },[])
// const [head,Sethead]= useState([{MovementTime:'', MovementContinuity:'',Amount:''}])
const getindexdata = () => {
  const endpoint = "indexscalpdata"
  const strategy= 2
  const payload = ''
  const type = "GET"
  handleexchangerequest(type, payload, endpoint)
  .then(response => {
    setindexdata(response)
// 
  })

};

  
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
      const payload = JSON.stringify({head,paper,strategy,onAccountSelect,Automaticstrike})
      const type = "POST"
      handleexchangerequest(type, payload, endpoint)
      .then(response => {
  
      console.log(response)
      window.location.reload()
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

  
  const handlemode = () =>{
    setpaper(!paper)
  }
  const handlemode2 = () =>{
    setAutomaticstrike(!Automaticstrike)
    setisContentDisabled(!isContentDisabled)
    
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
      
    <div className="container mx-auto px-4 py-8 space-y-8 max-md:flex max-md:justify-center ">
      <div className="space-y-4 max-md:w-screen max-md:p-10">
        <h2 className="text-2xl font-bold text-center text-white max-xs:text-sm mb-6">Index Price</h2>
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
              <Button variant="destructive" className="w-full sm:w-32 max-xs:text-sm"  onClick={()=>Deleteblock(0)}>confirm</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      </div>
    </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-xs:w-3/4 lg:grid-cols-6 gap-4 mt-7">
            {indexdata.map((item) => (
              <div key={item} className="flex flex-col items-center gap-2">
                <Label variant="outline" className="w-full text-teal-50 text-lg">
                  {item.NAME}
                </Label>
                  <Input  value={item.VALUE} placeholder="Value" type="number" className="w-full" />
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
 
  
  
  <div className="overflow-y-scroll h-28 rounded-lg ">
<table className="w-full border-collapse border border-gray-300  rounded-sm">
<thead>
  <tr className="bg-gray-300 text-black">
    <th className="sticky left-0 z-20 bg-gray-200 border border-gray-300 px-4 py-2">ID</th>
    <th className="border border-gray-300 p-1">Broker</th>
    <th className="border border-gray-300 p-1">Symbol</th>
    <th className="border border-gray-300 p-2">buyorderid</th>
    <th className="border border-gray-300 p-2">LTP</th>
    <th className="border border-gray-300 p-2">avg_price</th>
    <th className="border border-gray-300 p-2">Side</th>
    <th className="border border-gray-300 p-1">QTY</th>
    <th className="border border-gray-300 p-1">Status</th>
    <th className="border border-gray-300 p-1">PNL</th>

    <th className="border border-gray-300 p-2">sellorderid</th>
    <th className="border border-gray-300 p-2">sl</th>
    <th className="border border-gray-300 p-2">SLHIT</th>
    <th className="border border-gray-300 p-2">TargetHit</th>
    <th className="border border-gray-300 p-2">TRAILHIT</th>
    <th className="border border-gray-300 p-1">Action Button</th>
  </tr>
</thead>
<tbody>

  {item.orderdata.map((item) => (
    <tr key={item.id} className="text-gray-800  bg-slate-500 ">
            <td className="sticky left-0 z-20 bg-gray-200 border border-gray-300 px-4 py-2">{item.id}</td>
              
            <td className="border border-gray-300 p-1 break-all text-slate-950">{item.broker}</td>  
            <td className="border border-gray-300 p-1 break-all text-slate-950">{item.tradingsymbol}</td>
            <td className="border border-gray-300 p-1 break-all text-slate-950">{item.buyorderid}</td>
            <td className="border border-gray-300 p-1 break-all text-slate-950">{item.ltp}</td>
 break-all
            <td className="border border-gray-300 p-1 break-all text-slate-950">{item.avg_price}</td>
            <td className="border border-gray-300 p-1 break-all text-slate-950">{item.side}</td>
            <td className="border border-gray-300 p-1 break-all text-slate-950">{item.quantity}</td>
            <td className="border border-gray-300 p-1 break-all text-slate-950">{item.status?"ACTIVE":"OFF"}</td>
            <td className="border border-gray-300 p-1 text-slate-950 break-all">{item.pnl}</td>

            <td className="border border-gray-300 p-1 break-all text-slate-950">{item.sellorderid}</td>
            <td className="border border-gray-300 p-1 break-all text-slate-950">{item.sl}</td>
            <td className="border border-gray-300 p-1 break-all text-slate-950">{item.slhit}</td>
            <td className="border border-gray-300 p-1 break-all text-slate-950">{item.targethit}</td>
            <td className="border border-gray-300 p-1 break-all text-slate-950">{item.trailhit}</td>
            <td className="border border-gray-300 p-1">
        <Button className="text-xs p-2">EXIT</Button>  

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
            disabled={item.key === 'Strike' && isContentDisabled}
             className={`w-full ${item.key === 'Strike' && isContentDisabled ? ' opacity-1' : 'bg-green-600'}`}>{item.key}</Button>
            <Input placeholder="Value" disabled={item.key === 'Strike' && isContentDisabled} className="w-full" type="number" onChange= {(e)=>handleheadchange(item.id,e.target.value)}/>
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
            
            <div><Button onClick={()=>handlemode2()} className={Automaticstrike ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>{Automaticstrike?"Automatic Strike":"Automatic Strike"}</Button></div>
            <div>
            <DropdownMenuCheckboxes stat="2" onAccountSelect={setonAccountSelect}/>
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
