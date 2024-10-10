// import axios from 'axios';
import * as React from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState, useRef } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Addleg from "./Addleg";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { TimePicker } from 'antd';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react"

import { ChevronDown } from "lucide-react"
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';


import DateRangePicker from "./ui/Datetimepicker";
import { TimePicker } from "antd";


import DropdownMenuCheckboxes from './ui/dropdown'
import Strategy1_form from "./Strategy1_form";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {handleexchangerequest} from '../utility/Api'


function Custom() {

  const [expiries, setExpiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tradevalidity, Settradevalidity] = useState(new Date());
  const [Notradingzone, SetNotradingzone] = useState(new Date());
  const [segment,SetSegment]=useState('')
  const [strikePrices, setStrikePrices] = useState([ 17000,18000]);


  const [strikeprice,setstrikeprice]= useState('')
  const [Quantprice,setQuantprice]= useState('')

  const [toggleStatus, setToggleStatus] = useState(true);
  const [showCalender, setShowCalender] = useState(false);
  const [selectVertical, setSelectVertical] = useState('');
  const [toggleStatus2, setToggleStatus2] = useState(true);
  const [showCalender2, setShowCalender2] = useState(false);
  const [isExpirySelected, setIsExpirySelected] = useState(false);
  const [isStrikeSelected, setIsStrikeSelected] = useState(false);
  const [defaultstrikePrices, setDefaultStrikePrices] = useState("");
  const [tradetype, setTradetype] = useState("");
  const [expiry, setExpiry] = useState("")
  const [isOpen, setIsOpen] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [currentblock,setcurrentblock]= useState('')
  // const [value, setValue] = useState<Date | null>(null);

  const [showAddleg, setShowAddleg] = useState(false);


  const [sltype,setsltype]=useState('')
  const [tsltype,settsltype]=useState('')
  const [targettype,settargettype]=useState('')
  const [Activeleg,setActiveleg]=useState(0)
  const [sl,setsl]=useState(0)
  const [trail,settrail]=useState(0)
  const [target,settarget]=useState('')
  const [timer,settimer]=useState('')
  const [showsymbol,setshowsymbol]=useState(false)
  const [selectsymbol,setselectsymbol]=useState('')

  


  const [tslleg,setTslleg]=useState(0)
  const [paper,setPaper]= useState(false)
  const[live,setLive]= useState(false)
  const [targetleg,setTargetleg]=useState(0)
  const [isContentDisabled,setisContentDisabled]= useState(false)
  const [isContentDisabledEXP,setisContentDisabledEXP]= useState(true)
  const [lockleg,setLockleg]=useState(0)
  const [overallTARGET,setoverallTARGET]=useState(0)
  const [overallActive,setoverallActive]=useState(0)
  const [overallTrailprofit,setoverallTrailprofit]=useState(0)
  const [overallpnl,setoverallpnl]= useState(0)
  const [overallLock,setoverallLock]=useState(0)
  const[overallloss,setoverallloss]= useState(0)
  const [rentry,setReentry]= useState(0)
  const [correction,setcorrection]= useState(0)
  const [Symbol,setsymbol]= useState([])
  const [call,setcall]= useState('')
  const [put,setput]= useState('')
  const [value, onChange] = useState('10:00');

  
  
  // new usestate
  
  
  const [selectedOption, setSelectedOption] = useState(null)
  const [instruction, setinstruction] = useState('')
  const [Comboopen, setComboOpen] = useState(false)
  const [Combovalue, setComboValue] = useState(false)
  const [Comsymbols, setComSymbols] = useState(false)
  const [market,setmarket]=useState(false)
  const [paper1, setpaper1]= useState(false)
  


console.log(selectedOption,'selectedOption')

const handleOptionSelect = (option) => {
  setSelectedOption(option);
  if (option === 'Call') {
    setput('');
  } else {
    setcall('');
  }
};




const  handlecallput = (type)=>{
  
  if (selectedOption==='Call'){
    setcall(type)    
  }
  
  if (selectedOption==='Put'){
    setput(type)
  }
  if (fno==='EQ'){
    setinstruction(type)
   
  }
  
  if (fno==='FUTIDX'){
    setinstruction(type)
   
  }
  if (fno==='STXIDX'){
    setinstruction(type)
    
  }
  }

  

 const getButtonColor = (buttonType) => {
  switch (buttonType) {
    case 'Call':
      return selectedOption === 'Call' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black';
    case 'Put':
      return selectedOption === 'Put' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black';
    case 'Buy':
      return (call === 'BUY' || put === 'BUY') ? 'bg-green-500 text-white' : 'bg-gray-200 text-black';
    case 'Sell':
      return (call === 'SELL' || put === 'SELL') ? 'bg-red-500 text-white' : 'bg-gray-200 text-black';
    default:
      return 'bg-gray-200 text-black';
  }
};




  // const handleOptionClick = (option) => {
  //   if (option !== optionlabel) {
  //     setoptionlabel(option);
  //     setcall('');
  //     setput('');
  //   }
  // };


  const [viewall, setviewall]= useState(false)
  const [Tradeblockno,settradeblockno]= useState([])

  const [fno, setFno] = useState("");
  const [sublegid,setsublegid]= useState([
    {Blockid:'' ,sublegid:1,checked:false}
  ])

  const [Amount,setAmount]= useState('')
  const [addtrade,setAddtrade]= useState(false)
  const [advice,Setadvice]= useState('')
  const[brokerselect,setbrokerselect]= useState('')
  const [spotprice,setspotprice]= useState(0)
  const[nearestatm,setNearestatm]= useState(0)
  console.log(brokerselect)
  const [numberOfLegs, setNumberOfLegs] = useState(() => {
    const storedNumberOfLegs = localStorage.getItem('numberOfLegs');
    return storedNumberOfLegs ? parseInt(storedNumberOfLegs) : 1;
  });
  const [legPLTs, setLegPLTs] = useState(() => {
    const storedLegPLTs = localStorage.getItem('legPLTs');
    return storedLegPLTs ? JSON.parse(storedLegPLTs) : Array.from({ length: numberOfLegs }, () => 1);
  });

  useEffect(() => {
    localStorage.setItem('legPLTs', JSON.stringify(legPLTs));
    localStorage.setItem('numberOfLegs', numberOfLegs.toString());
  }, [numberOfLegs, legPLTs]);

  const settings =  ()=>{
    const endpoint = "saveblockst1"
    const strategy= 1
    const sublegdata= {advice,spotprice,correction,sltype,tsltype,strikeprice,targettype,sl,target,timer,trail,call,
      put,Activeleg,lockleg,targetleg,tslleg,Quantprice,Amount,nearestatm, instruction}
    const tradetool=   {tradevalidity,Notradingzone,tradetype,segment,selectVertical,fno,expiry,paper,rentry,overallActive,overallloss,overallLock,overallTARGET,overallTrailprofit,overallpnl,selectsymbol}
    const payload = JSON.stringify({strategy,tradetool,sublegdata})
    const type = "POST"
    handleexchangerequest(type, payload, endpoint)
    .then(response => {
    console.log(response)
    })
  }

  const legadd = ()=>{
    const endpoint = "SpotLeg"
    const payload = JSON.stringify({
      })
    const type = "POST"
    handleexchangerequest(type, payload, endpoint)
    .then(response => {
    console.log(response)
    })
  }


  const handleselectsymbol = (e) => {
    setselectsymbol(e.target.value);

    const sdd = localStorage.getItem("token");
    const t = "token " + sdd;


    setLoading(true)
    const fetchData = async () => {
      try {
        // const response = await axios.get(`http://127.0.0.1:5000/option_chain?option_type=${event.target.value}`);
        const response = await fetch (`http://3.111.155.182:8000/option_type?option_type=${e.target.value}&segment=${segment}&instrument=${fno}`,
          {
            method: 'GET',
            headers: {  
              "Content-Type": "application/json",
              Authorization: t,
            },
          }
        );
        const data = await response.json();

        console.log(data,'expiry')
        // const removeDuplicates = [...new Set(data.message.Expiry)];
        const removeDuplicatesstrike = [...new Set(data.message.StrikePrice)];
        // const removeDuplicatsymbol = [...new Set(data.message.Symbol)];



        // setExpiries(removeDuplicates);
        // setsymbol(removeDuplicatsymbol);
        setStrikePrices(removeDuplicatesstrike);
        // setDefaultStrikePrices(response.message.underlyingValue)
        setLoading(false)
      } catch (error) {
        alert("Getting Error While Fetching API! Please Try Again!!!",)
        console.log(error)
        setLoading(false)
      }
    };
    fetchData();

    useEffect(() => {
      if (selectVertical && segment && Symbol) {
        fetchData();
      }
    }, [selectVertical, segment, Symbol])





  };




  // useEffect(()=>{
    // const removeDuplicates = [...new Set(expiries)];
    // console.log(removeDuplicates,'removeDuplicates')
    // setExpiries(removeDuplicates)
// 
    // 
// 
// 
// 
  // },[])

  
  
  
  
  const handleSelectdisable = (e) => {
    setFno(e.target.value);

  if  (e.target.value==='FUTSTK'){
      // setshowsymbol(false)
      setshowsymbol(true)
      setisContentDisabled(true)
      setSelectVertical('stock')
      setisContentDisabledEXP(true)
   
    }

   if  (e.target.value==='OPTSTK'){
      // setshowsymbol(false)
      setshowsymbol(true)
      setSelectVertical('stock')
      setisContentDisabled(false)
      setisContentDisabledEXP(true)
    

}

   if  (e.target.value==='FUTIDX'){
      setisContentDisabled(true)
      setshowsymbol(false)
      setisContentDisabledEXP(true)
 
      }
    
   if (e.target.value==='OPTIDX'){
      setisContentDisabled(false)
      setisContentDisabledEXP(true)
      setshowsymbol(false)
    
    }
   if (e.target.value==='EQ'){
      setisContentDisabledEXP(false)
     
      setisContentDisabled(true)
      
      setSelectVertical('stock')
      setshowsymbol(true)

    }
   if (e.target.value === 'SLEFNO'){
      setisContentDisabled(true)
      setshowsymbol(true)
      setisContentDisabledEXP(true)
     

    }
      // else {
      //   setisContentDisabledEXP(false);
        
      // }
  

    const sdd = localStorage.getItem("token");
    const t = "token " + sdd;


    setLoading(true)


    const fetchData = async () => {
      try {
        // const response = await axios.get(`http://127.0.0.1:5000/option_chain?option_type=${event.target.value}`);
        const response = await fetch (`http://3.111.155.182:8000/option_type?option_type=${selectVertical}&segment=${segment}&instrument=${e.target.value}`,
          {
            method: 'GET',
            headers: {  
              "Content-Type": "application/json",
              Authorization: t,
            },
          }
        );
        const data = await response.json();
       

        console.log(data,'expiry')
        const removeDuplicates = [...new Set(data.message.Expiry)];
        const removeDuplicatesstrike = [...new Set(data.message.StrikePrice)];
        const removeDuplicatsymbol = [...new Set(data.message.Symbol)];



        setExpiries(removeDuplicates);
        setsymbol(removeDuplicatsymbol);
        setStrikePrices(removeDuplicatesstrike);
        // setDefaultStrikePrices(response.message.underlyingValue)
        setLoading(false)
      } catch (error) {
        alert("Getting Error While Fetching API! Please Try Again!!!",)
        console.log(error)
        setLoading(false)
      }
    };
    fetchData();





  };


  
  const Deleteblock = (Blockid) =>{
    const endpoint = "tradeblock"
    const payload = 'strategy=1&Blockid='+Blockid
    const type = "DELETE"
    handleexchangerequest(type, payload, endpoint)
    .then(response => {

    console.log(response)
    window.location.reload()
    })
  }
  const tradeblocklist= async () =>{
    const endpoint = "tradeblock"
    const payload = 'strategy=1'
    const type = "GET"

    handleexchangerequest(type, payload, endpoint)
    .then (response=> {
      if (response){
        settradeblockno(response)
    console.log(response,'resposnse')


      }

    console.log(response,'resposnse')
    })
  }
  useState(()=>{
    tradeblocklist()

  },[])

  const handleviewall = (id)=>{
    setcurrentblock(id)
    setviewall(true)

  }
  const handleCancelViewAll = () => {
    setviewall(false);
  };

  
  
  const handlemode2 = () =>{
    setpaper1(!paper1)
    setisContentDisabled(!isContentDisabled)
    
  }

  


 const handledatecahnge= (e)=>{
    Settradevalidity(e.target.value)
  }

  const handletradetype =(e)=>{
    setTradetype(e.target.value)
  }
  const  sethandleexpiry =(e)=>{
    setExpiry(e.target.value)
  }

  const handlesetactive= (e)=>{
    setActiveleg(e.target.value)
  }
  const handletslleg= (e)=>{
    setTslleg(e.target.value)
  }
  const handleLegTarget= (e)=>{
    setTargetleg(e.target.value)
  }
  const handlesetlock= (e)=>{
    setLockleg(e.target.value)
  }
  const handleblockactive= (e)=>{
    setoverallActive(e.target.value)
  }
  const handlebloctsl= (e)=>{
    setoverallTrailprofit(e.target.value)
  }
  const handleblockTarget= (e)=>{
    setoverallTARGET(e.target.value)
  }
  const handleblockLock= (e)=>{
    setoverallLock(e.target.value)
  }
  const handleBlockpnl= (e)=>{
    setoverallpnl(e.target.value)
  }
  
  const toggleAddleg = () => {
    setShowAddleg(false);
  };

  // const toggleActivation = () => {
    // setIsActivated(!isActivated);
    
  const toggleActivation = (id,ac) => {
    const endpoint = "Activateblock"
    const Blockid= id
    const strategy= 1
    const Activate= ac
    const payload = JSON.stringify({Blockid,strategy,Activate})
    const type = "POST"
    handleexchangerequest(type, payload, endpoint)
    .then (response=> {
      console.log(response)
})
  tradeblocklist()
  
  };
  
  const handledatecahnge1= (e)=>{
    SetNotradingzone(e.target.value)
  }
  const handlesegment= (e)=>{
    SetSegment(e.target.value)
  }
  const handleTradeadvice= (e)=>{
    Setadvice(e.target.value);
    if(e.target.value === 'Market'){
      setmarket(true)
    }
    

  }

  const Addform = () => {
    setIsOpen(true);
  };

  const  handlebrokerchange=(e)=>{
    setbrokerselect(e.target.value)
  }
  const handlesltype= (e)=>{
  setsltype(e.target.value)}
  
  const handletsltype= (e)=>{
    settsltype(e.target.value)}
  
    const handleTargettype= (e)=>{
      settargettype(e.target.value)}
  
  
  const handlelegselect= (id) =>{

        setsublegid((prevData) =>
      prevData.map((item) =>
        item.sublegid === id ? { ...item,checked:!item.checked } : item
      )
    );
    
    
    }
    
  
  const handleAddTrade= ()=>{
    setAddtrade(!addtrade)

  }

  const handleviewaddleg=(id)=>{

    setShowAddleg(true)
    setcurrentblock(id)
  }


  const handleCheckboxChange = (id) => {
      setbrokerselect((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, value: !item.value } : item
        )
      )}
  // const handleAddTrade = () => {
    // setLegPLTs(prev => [...prev, 1]);
    // setNumberOfLegs(prev => prev + 1);
  // };

  const handleAddPLT = (legIndex) => {
    setLegPLTs(prev => {
      const updatedPLTs = [...prev];
      updatedPLTs[legIndex] += 1;
      return updatedPLTs;
    });
  };

  const brokerstatus= (id,val) =>{

    setBroker((prevData) =>
  prevData.map((item) =>
    item.id === id ? { ...item,value:!item.value } : item
  )
);}


  const handleSelectChange = async (event) => {
    setSelectVertical(event.target.value)


  };

  const scriptData = [
    { name: "RAMCOCEM", candleHighLow: "826.15", longshort: "LONG", status: "EXECUTED", pnl: "+200", cancel: "CANCEL", exit: "EXIT" },
    { name: "EXIDEIND", candleHighLow: "504.90", longshort: "SHORT", status: "PENDING", pnl: "", cancel: "CANCEL", exit: "EXIT" },
  ];

  const handleTimeRangeChange = (timeRange) => {
    console.log(`Selected time range: ${timeRange}`);
  };

  

  return (
    <>
    {!viewall && (
      <>
    <div className="container-xl my-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="flex justify-center sm:justify-start">
          <Button 
            onClick={handleAddTrade} 
            disabled={isExpirySelected || isStrikeSelected}
            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white"
          >
            + Add Trade
          </Button>
        </div>
        
        <div className="flex justify-center sm:justify-end gap-3 order-3 sm:order-2 lg:order-3">
          <Button className="w-full sm:w-auto">Exit All</Button>
          
          <Popover>
        <PopoverTrigger asChild>
        <Button variant="destructive" className="w-full max-xs:text-sm sm:w-32">Delete All</Button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <div className="grid place-items-center gap-4">
            <div className="space-y-2 flex flex-col sm:flex-row items-center gap-3">
              <h4 className="font-medium leading-none text-center">Are You really want to Delete</h4>
              <Button variant="destructive" className="w-full sm:w-32 max-xs:text-sm"  onClick={() => Deleteblock(0)}>confirm</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
        </div>
        
        
      </div>

      {!addtrade && (
      
      Tradeblockno.map((item)=>(
     
     <div>
     <div className="h-full mt-3 flex flex-col gap-3">
      
      
            <div className="w-full border border-white rounded-sm p-2 text-xs text-white">
            <p className="text-white">{item.Blockid}</p>
            <div className="col-span-1 sm:col-span-2 lg:col-span-1 order-2 sm:order-3 lg:order-2">
          <div className="grid grid-cols-2 place-items-center mb-2 sm:grid-cols-2 gap-2">
            <Button variant="outline" className="w-1/2 text-xs text-black sm:text-sm">
              Max Moving High {890}
            </Button>
            <Button variant="outline" className="w-1/2 text-xs text-black sm:text-sm">
              Avg Moving
            </Button>
            <Button variant="outline" className="w-1/2 text-xs text-black sm:text-sm">
              Max Drawdown
            </Button>
            <Button variant="outline" className="w-1/2 text-xs text-black sm:text-sm">
              Up Avg Moving
            </Button>
          </div>
        </div>
      
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
               
                <div className="flex items-center justify-center">
                  <Popover>
                    <PopoverTrigger asChild>
                    <Button variant="destructive" className="w-full sm:w-32">Delete</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72">
                      <div className="grid place-items-center gap-4">
                        <div className="space-y-2 flex items-center gap-3">
                          <h4 className="font-medium leading-none text-center">Are You really want to Delete</h4>
                          <Button variant="destructive" className="w-full sm:w-32"  onClick={()=>Deleteblock(item.Blockid)}>confirm</Button>
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
                  <Button className="w-full sm:w-24"  onClick={()=>handleviewall(item.Blockid)}>
                    View Detail
                  </Button>
                </div>
                <div className="flex items-center justify-center">
                  <Button className="w-full sm:w-24" onClick={() => handleviewaddleg(item.Blockid)}>
                    Add Leg
                  </Button>
                </div>
                <div className="flex items-center justify-center">
                  <Button className="btn btn-info w-24" >
                    View Leg
                  </Button>
                
                  {showAddleg && (
        <div >
          <div >
            
           { showAddleg && <Addleg onClose={toggleAddleg} Blockid={currentblock} />}
          </div>
        </div>
      )}
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
                      <th className="border border-gray-300 p-1">Action Button</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.orderdata.map((item) => (
                      <tr key={item.id} className="text-gray-800">
                        <td className="border border-gray-300 p-1 text-white">{item.id}</td>
                        <td className="border border-gray-300 p-1 text-white">{item.side}</td>
                        <td className="border border-gray-300 p-1 text-white">{item.quantity}</td>
                        <td className="border border-gray-300 p-1 text-white">{item.status?"ACTIVE":"OFF"}</td>
                        <td className="border border-gray-300 p-1 text-white">{item.tradingsymbol}</td>
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
        ))
          
    )}

     {addtrade?( <div className=' flex flex-col gap-4'>
      <div className="container mt-2">
  <div className="row g-3">
    <div className="col-lg-10 col-md-12">
      <div className="row ">
        <div className="col-12 row col-md-4">
        <style>
        {`
          .react-datepicker-time__input input{
          background-color: #8e9eab;
          border-radius: 0.2rem;
          color: black;
          padding: 5px
          }
          
        `}
      </style>
          <label className="text-white text-lg">Trade Validity</label>
          <DatePicker
            className="bg-white text-black p-2 rounded-lg w-100"
            selected={tradevalidity}
            onChange={(date) => Settradevalidity(date)}
            showTimeInput
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>

        <div className="col-12 row col-md-4">
          <label className="text-white text-lg">Tradetype</label>
          <select
            id="selectVertical"
            className='form-select'
            onChange={(e) => handletradetype(e)}
            value={tradetype}
          >
            <option value="">Select Tradetype</option>
            <option value="Intrday">Intrday</option>
            <option value="Carryforward">Carryforward</option>
          </select>
        </div>

        <div className="col-12 row col-md-4">
          <label className="text-white text-lg">No Trade Zone</label>
          <DateRangePicker className="bg-white w-100 mt-2" />
        </div>
      </div>

      {showCalender && (
        <div style={{ position: 'absolute', zIndex: '999' }}>
          <input
            onChange={(e) => handledatecahnge(e)}
            className="bg-white w-100 rounded-sm mt-2"
            value={tradevalidity}
            type="datetime-local"
            name="date"
            min="1994-01-01T00:00"
          />
        </div>
      )}

      <div className='d-flex justify-content-end' style={{ position: 'relative' }}>
        {showCalender2 && (
          <div style={{ position: 'absolute', zIndex: '999', right: "-40px" }}>
            <input
              className='bg-white w-100 rounded-sm mt-2'
              onChange={(e) => handledatecahnge1(e)}
              value={Notradingzone}
              type="datetime-local"
              name="date"
              min="1994-01-01T00:00"
            />
          </div>
        )}
      </div>
    </div>
  </div>
</div>

      <div className="mt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="col-span-1 sm:col-span-2 lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="col-span-1">
                <select
                  className='form-select w-full'
                  onChange={(e)=>handlesegment(e)}
                >
                  <option value=""> select segment</option>
                  <option value="NSE">NSE </option>
                  <option value="NFO">NFO</option>
                  <option value="BFO">BFO</option>
                </select>
              </div>
              
              <div className="col-span-1">
                <select id="selectVertical" className='form-select w-full' onChange={(e) => handleSelectChange(e)} value={selectVertical}>
                  <option value="">Select Vertical</option>
                  {segment=='NFO'&&<option  value="NIFTY">Nifty</option>}
                  {segment=='NFO'&&<option  value="BANKNIFTY">BANKNIFTY</option>}
                  {segment=='NFO'&&<option  value="FINNIFTY">FINNIFTY</option>}
                  {segment=='BFO'&& <option   value="SENSEX">SENSEX</option>}
                </select>
              </div>  
              <div className="col-span-1">
                <select id="selectVertical" className='form-select w-full' multiple="" onChange={(e)=>handleSelectdisable(e)} value={fno}>
                  <option value="SLEFNO">Select FNO</option>
                  {segment!='NSE' && <option value="FUTIDX">FUTURE</option>}
                  {segment!='NSE' && <option value="OPTIDX">OPTION</option>}
                  {segment!='NSE' &&<option value="FUTSTK">STOCK FUTURE</option>}
                  {segment!='NSE' &&<option value="OPTSTK"> STOCK OPTION</option>}
                  
                  {segment=='NSE' && <option value="EQ"> CASH</option>}
                </select>
              </div>
              <div className={`col-span-1 ${showsymbol ? '' : 'hidden'}`}>
                {showsymbol ?
                
                  // <select id="SymbolSelect"  className='form-select w-full' onChange={(e) => handleselectsymbol(e)} value={selectsymbol}>
                  //   <option>Select Symbol</option>
                  //   {Symbol.map((val, index) =>
                  //     <option key={index} value={val}>{val}</option>
                  //   )}
                  // </select>

                  <Popover open={Comboopen} onOpenChange={setComboOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={Comboopen}
                      className="w-[200px] justify-between"
                    >
                      {selectsymbol || "Select Symbol"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search symbol..." />
                      <CommandList>
                        <CommandEmpty>No symbol found.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem value="select-symbol" onChange={(e) => setselectsymbol(e)}>
                            Select Symbol
                          </CommandItem>
                          {Symbol.map((symbol, index) => (
                            <CommandItem
                              key={index}
                              value={symbol}
                              onSelect={() => setselectsymbol(symbol)}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  selectsymbol === symbol ? "opacity-100" : "opacity-0"
                                }`}
                              />
                              {symbol}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                : <></>}
                
              </div>


              <div className={`col-span-1 ${isContentDisabledEXP ? 'opacity-50 pointer-events-none' : ''}`}>
                {expiries.length !== 0 ?
                  // <select id="expirySelect" className='form-select w-full' disabled={isContentDisabledEXP}  onChange={(e) => sethandleexpiry(e)} value={expiry}>
                  //   <option>Select Expiry</option>
                  //   {expiries.map((date, index) =>
                  //     <option key={index} value={date}>{date}</option>
                  //   )}
                  // </select >
                  <Popover open={Comsymbols} onOpenChange={setComSymbols}>
                   <PopoverTrigger asChild>
                   <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={Comsymbols}
                      className="w-[200px] justify-between"
                    >
                      {expiry || "Select Expiry"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search expiry..." />
                      <CommandList>
                        <CommandEmpty>No symbol found.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem value="select-expiry" onChange={(e) => sethandleexpiry(e)}>
                            Select Symbol
                          </CommandItem>
                          {expiries.map((symbol, index) => (
                            <CommandItem
                              key={index}
                              value={symbol}
                              onSelect={() => sethandleexpiry(symbol)}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  expiry === symbol ? "opacity-100" : "opacity-0"
                                }`}
                              />
                              {symbol}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                   </PopoverContent>
                </Popover>
                  :
                  <Popover open={Comsymbols} onOpenChange={setComSymbols}>
                   <PopoverTrigger asChild>
                   <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={Comsymbols}
                      className="w-[200px] justify-between"
                    >
                      {expiry || "Select Expiry"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search symbol..." />
                      <CommandList>
                        <CommandEmpty>No Expiry.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem value="select-symbol" onChange={(e) => sethandleexpiry(e)}>
                            Select Expiry
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                }
              </div>


            </div>
          </div>
        </div>
      </div>
      
      {defaultstrikePrices !== '' ? <h1 className='mt-3'>Current Spot Price <span className='bg-secondary text-white px-2 py-1 fs-3'>₹ {defaultstrikePrices}</span></h1> : <></>}
      
     
      
        <>


          <div className="mt-4">
            <div className="row" style={{ background: '#CCCCCC' }}>
              <div className="col-lg-6 my-3">
                <div className="row">
                  <div className="col-sm-4 col-5">
                  <select  className='form-select' onChange={(e)=>handleTradeadvice(e)}>
                      <option value=""> TRADE ADVICE</option>
                      <option value="SPOT">Spot </option>
                      <option value="SQUENCE">Sequnce </option>
                      <option value="COVER">cover </option>
                      <option value="Market">Market </option>
                      </select> 
                      </div>
                  <div className="col-4">
                    
                    <input type="number" className="form-control"  onChange={(e)=>setspotprice(e.target.value)} placeholder='Spot Price' />
                  </div>
                  
                  <div className={`col-4 ${market? '':'hidden'}`}>
                    {market?
                  <DatePicker
            className="bg-white text-black p-2 rounded-lg w-100"
            selected={tradevalidity}
            onChange={(date) => Settradevalidity(date)}
            showTimeInput
            dateFormat="MMMM d, yyyy h:mm aa"
          />:<></>}
                  </div>
                  {(advice === 'cover' || advice === 'sequence') && (
                      <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-32 bgreen-600 text-black">Leg No</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Leg</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {sublegid.map((Item)=>
                        <DropdownMenuCheckboxItem
                        checked={Item.checked}
                       onCheckedChange={()=>handlelegselect(Item.sublegid)}>
                        {Item.sublegid}
                        </DropdownMenuCheckboxItem>

                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    )}
                </div>
              </div>
              <div className="col-lg-6 my-3">
                <div className="row">

                {advice === 'sequence' && (
      <div className="flex w-1/2 gap-3">
        <button className="btn btn-light w-32">Correction</button>
        <input type="text" onChange={(e)=>setcorrection(e.target.value)} placeholder="value" className="bg-white w-32 text-black rounded-sm px-1"/>
      </div>
                )}
                </div>
              </div>
            </div>
          </div>
          <div className=" flex justify-between flex-wrap">
          <div className={`row ${isContentDisabled ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="col-lg-6 col-sm-5 col-9 mt-3">
              <div className="row">
                <div className="col-6">
                  
                    {/* <select id="strikePriceSelect" className='form-select' onChange={(e) => setstrikeprice(e.target.value)}>
                      <option>Select Strike Price</option>
                      {strikePrices.map((Price, index) =>
                        <option key={index} value={Price}>{Price}</option>
                      )}
                    </select> */}

                  <Popover open={Combovalue} onOpenChange={setComboValue}>
                   <PopoverTrigger asChild>
                   <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={Combovalue}
                      className="w-[200px] justify-between"
                    >
                      {strikeprice || "Select Price"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search Price..." />
                      <CommandList>
                        <CommandEmpty>No symbol found.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem value="select-symbol" onChange={(e) => setstrikeprice(e.target.value)}>
                            Select Price
                          </CommandItem>
                          {strikePrices.map((symbol, index) => (
                            <CommandItem
                              key={index}
                              value={symbol}
                              onSelect={() => setstrikeprice(symbol)}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  strikeprice === symbol ? "opacity-100" : "opacity-0"
                                }`}
                              />
                              {symbol}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                  
                </div>
                <div className="col-6">
                  <button type="button" className="btn btn-success w-100">Automatic</button>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-2 col-3 mt-3">
              <input type="text" className='form-control' value= {strikeprice!=='Select Strike Price'?strikeprice:''} placeholder='Strike Price' defaultValue={defaultstrikePrices} disabled />
            </div>
            <div className="col-lg-3 col-sm-5 mt-3">
              <input type="number" value={nearestatm} className='form-control' onChange={(e)=>setNearestatm(e.target.value)}  placeholder='Nearest ATM' />
            </div>
            </div>
            
            
            
               
             
            
            <div className="col-lg-2 col-6 mt-3">
              <div className="row">
                <div className="col-6">
                <button  onClick={() => {
              handleOptionSelect('Call')
             
            }}
            type="button"  
            className={`px-4 text-black  py-2 rounded ${isContentDisabled ? 'opacity-50 pointer-events-none' : ''} 
            ${getButtonColor('Call')}`}>Call
              </button>
                </div>
                
                <div className="col-6">
                <button  onClick={()=>handlecallput('BUY')} type="button"  className={`px-4 py-2 text-black rounded ${getButtonColor('Buy')}`}>Buy</button>
                </div>
              
              </div>
            </div>
            </div>
            
            <div className="col-lg-2 col-6 mt-3 offset-lg-10 offset-6">
              <div className="row">
                <div className="col-6">
                <button onClick={() => {
              handleOptionSelect('Put')
              
            }} type="button"  className={`px-4 py-2 text-black rounded ${isContentDisabled ? 'opacity-50 pointer-events-none' : ''} ${getButtonColor('Put')}`}>Put</button>
                </div>
               
                <div className="col-6">
                <button  onClick={()=>handlecallput('SELL')} type="button" className={`px-4 py-2 text-black rounded ${getButtonColor('Sell')}`}>Sell</button>

                </div>
               
              </div>
            </div>
            
            </>

            <>
             
          
          <div className="row">
            <div className="col-lg-3 col-9 mt-3">
              <div className="row">
                <div className="col-6">
                  <button type="button" className="btn btn-light w-100">Quantity</button>
                  <Input className="mt-1 text-black" onChange={(e)=>setQuantprice(e.target.value)} value= {Quantprice} placeholder="Value" type="number"/>
                </div>
                <div className="col-6">
                  <button type="button" className="btn btn-success w-100">AMOUNT</button>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-3 mt-3">
              <input onChange={(e)=>setAmount(e.target.value)} value={Amount}   type="text"  className='form-control'  placeholder='Value'  />
            </div>
            <div className="col-lg-3 col-sm-6 mt-3">
              <div className="row">
                <div className="col-6">
                  <label className="text-white"> SL</label>
                <select  className='form-select'onChange={(e)=>handlesltype(e)}>
                      <option value=""> SL</option>
                      <option value="SpotPoints">Spot Points </option>
                      <option value="Points">Points</option>
                      <option value="value">Value</option>
                      <option value="Percentage">%</option>
                </select>
                        </div>
                <div className="col-6">
                  <input type="text" onChange={(e)=>setsl(e.target.value)} value = {sl} placeholder='Manual Entry' className='form-control' />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mt-3">
              <div className="row">
                <div className="col-6">
                  <label className="text-white">Trail SL</label>
                <select  className='form-select'onChange={(e)=>handletsltype(e)}>
                      <option value=""> TRAILSL</option>
                      <option value="Points">Points </option>
                      <option value="Percentage">%</option>
                      </select>
                      </div>
                <div className="col-6">
                  <input type="text" onChange={(e)=>settrail(e.target.value)} value = {trail} placeholder='Manual Entry' className='form-control' />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mt-3 offset-lg-5">
              <div className="row ">
                <div className="col-6">
                  <label className="text-white"> Target</label>
                <select  className='form-select'onChange={(e)=>handleTargettype(e)}>
                      <option value="">Target</option>  
                      <option value="Points">Spot Points </option>
                      <option value="Points">Points</option>
                      <option value="Value">Value</option>
                      <option value="Percentage">%</option>
                </select>

                  </div>
                <div className="col-6">
                  <input type="text"  onChange={(e)=>settarget(e.target.value)} value = {target} placeholder='Manual Entry' className='form-control' />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mt-3">
              <div className="row">
              <div className="col-6">

            
      <Popover  >
        <PopoverTrigger asChild>
          <div>
            <label className=" text-white text-center"> Timer</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  Timer <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setSelectedOption('time')}>
                  Time
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedOption('hours')}>
                  Hrs/Min
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80" >
          {selectedOption === 'time' && <TimePicker.RangePicker />}
          {selectedOption === 'hours' &&  <TimePicker
        
        
        clearIcon={null}
        clockIcon={null}
        disableClock={true}
        format="HH:mm"
        className="bg-white"
      />}
         
        </PopoverContent>
      </Popover>
    </div>
                <div className="col-6">
                
                  
                  <input type="text" onChange={(e)=>settimer(e.target.value)} value = {timer} placeholder='Manual Entry' className='form-control' />
                </div>
              </div>
            </div>
          </div>
          <h2 className="mt-5 text-danger">
            Profit Lock and Trail
          </h2>
          
            <div >
              <div className="row">
                <div className="col-lg col-sm-4 mt-3">
                  <input type="number" className='form-control' onchange = {(e)=> handlesetactive(e)} placeholder='Active' />
                </div>
                <div className="col-lg col-sm-4 mt-3">
                  <input type="number" className='form-control' onChange={(e)=> handlesetlock(e)} placeholder='Lock' />
                </div>
                <div className="col-lg col-sm-4 mt-3">
                  <input type="number" className='form-control'  onchange= {(e)=> handletslleg(e)} placeholder='Trail Profit' />
                </div>
                <div className="col-lg col-sm-6 mt-3">
                  <input type="number" className='form-control' onchange={(e)=> handleLegTarget(e)} placeholder='TARGET' />
                </div>
                
              </div>
            </div>
        
        </>
        <>
        <div className="mt-4">
        <div className="row pb-5" style={{ background: '#CCCCCC' }}>
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="row items-center">
                 <h2>Block settings </h2>
                <div className="col-6 mt-3">
                  <button onClick={()=>{setPaper(true),setLive(false)}} type="button" className= {paper?"btn btn-success w-100":"btn btn-light w-100"}>Paper</button>
                </div>
                <div className="col-6 mt-3">
                  <button  onClick={()=>{setLive(true),setPaper(false)}}type="button" className={live?"btn btn-success w-100":"btn btn-light w-100"}>Live</button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="row items-center">
                {/* <div className="col-6 mt-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full bgreen-600">Broker</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
              <DropdownMenuLabel></DropdownMenuLabel>
                <DropdownMenuSeparator />
                {broker.map((item) => (
                <DropdownMenuCheckboxItem
                
                onCheckedChange={()=>brokerstatus(item.id,!item.value)} 
                checked={item.value}
                >
                {item.name}
              </DropdownMenuCheckboxItem>

                  ))}
                  </DropdownMenuContent>
                  </DropdownMenu>
                </div> */}
                <div className="col-6 mt-3">
                <DropdownMenuCheckboxes stat="1" />
                </div>
                <div>
                </div>
                <div className="col-6 mt-3"><Button onClick={()=>handlemode2()} className={paper1 ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>{paper1?"Automatic Strike":"Automatic Strike"}</Button></div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-2 col-sm-4 mt-3">
              <button type="button"  className="btn btn-secondary w-100">Re Entry</button>
            </div>
            <div className="col-lg-2 col-sm-4 mt-3">
              <input type="number" onchange={(e)=>setReentry(e.target.value)} className='w-100 form-control' />
            </div>
            <div className="col-lg-2 col-sm-4 mt-3">
              <input type="number" onChange={(e)=>setoverallloss(e.target.value)} className='w-100 form-control' placeholder='Overall Loss' />
            </div>
          </div>

          <h4 className="mt-5 text-danger">
            Overall Profit Lock And Trail
          </h4>

          <div className="row">
            <div className="col-lg col-sm-4 mt-3">
              <input type="text"  onChange={(e)=> handleblockactive(e)} className='form-control' placeholder='Active' />
            </div>
            <div className="col-lg col-sm-4 mt-3">
              <input type="number"  onChange={(e)=>handleblockLock(e)} className='form-control' placeholder='Lock' />
            </div>
            <div className="col-lg col-sm-4 mt-3">
              <input type="number"  onChange={(e)=>handlebloctsl(e)} className='form-control' placeholder='Trail Profit' />
            </div>
            <div className="col-lg col-sm-6 mt-3">
              <input type="number"  onChange={(e)=>handleblockTarget(e)}  className='form-control' placeholder='Overall TARGET' />
            </div>
            <div className="col-lg col-sm-6 mt-3">
              <input  onChange={(e)=>handleBlockpnl(e)} type="text" className='form-control' placeholder='Overall PNL' />
            </div>
          </div>
          
        </div>
      </div>

        </>
        
        
      



      <div className='mt-3' style={{ maxWidth: '500px', margin: 'auto' }}>
        <div className="flex items-center gap-4 max-xs:flex-col w-full ">
          <div className="col-sm-6 mt-3">
            <button type="button" onClick= {()=>settings()}className="btn btn-success w-100 btn-lg"><i className="fa fa-save" /> Save</button>
          </div>
          
          <div className="col-sm-6 mt-3 ">
        <button onClick={() => {
                setAddtrade(false);
              }} type="button" className="btn btn-danger w-100 btn-lg">Cancel</button>
        </div>
        </div>
      </div>
      
    </div>):''}
    </div>
    </>
    )}

{viewall&&(<Strategy1_form onCancel={handleCancelViewAll} blockid={currentblock}/>)}


    </>
  );
}

export default Custom;