// import axios from 'axios';
import * as React from "react";
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { DatePickerInput } from '@mantine/dates';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TimePicker } from 'antd';
import { ChevronDown } from "lucide-react"

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
import DropdownMenuCheckboxes from './ui/dropdown';
import { Check, ChevronsUpDown } from "lucide-react"

import Strategy1_form from "./Strategy1_form";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { handleexchangerequest } from '../utility/Api';

const Addleg = ({ onClose,Blockid }) => {
  const bid= Blockid
  console.log(bid,'bid')


const [expiries, setExpiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [datevalue, SetDatevalue] = useState(new Date());
  const [datevalue1, SetDatevalue1] = useState(new Date());
  const [segment,SetSegment]=useState('')
  const [strikePrice, setStrikePrice] = useState([]);
  const [toggleStatus, setToggleStatus] = useState(true);
  const [showCalender, setShowCalender] = useState(false);
  // const [selectVertical, setSelectVertical] = useState('');
  const [toggleStatus2, setToggleStatus2] = useState(true);
  const [showCalender2, setShowCalender2] = useState(false);
  const [isExpirySelected, setIsExpirySelected] = useState(false);
  const [isStrikeSelected, setIsStrikeSelected] = useState(false);
  const [defaultstrikePrices, setDefaultStrikePrices] = useState("");
  const [tradetype, setTradetype] = useState("");
  const [expiry, setExpiry] = useState("")
  const [isOpen, setIsOpen] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [Quantprice,setQuantprice]= useState('')
  const [Amount,setAmount]= useState('')
  const [sl,setsl]=useState(0)
  const [trail,settrail]=useState(0)
  const [target,settarget]=useState('')
  const [timer,settimer]=useState('')
  const [strikeprice,setstrikeprice]= useState('')
  const [strikePrices, setStrikePrices] = useState([ 17000,18000]);







  const[blockno,setblockno]= useState('')
  const [broker,setBroker]= useState([
    {id:1,name:'Shoonya',value:true},
    {id:2,name:'Dhan',value:true},
    {id:3,name:'Angel',value:true},]


  )




  // const [value, setValue] = useState<Date | null>(null);



  const [sltype,setsltype]=useState('')
  const [tsltype,settsltype]=useState('')
  const [targettype,settargettype]=useState('')
  const [Activeleg,setActiveleg]=useState('')
  const [tslleg,setTslleg]=useState('')
  const [action, setAction] = useState('');
  const[live,setLive]= useState(false)
 
  const [targetleg,setTargetleg]=useState('')
  const [Combovalue, setComboValue] = useState(false)
  
  
  const [lockleg,setLockleg]=useState('')
  const [targetblock,setTargetblock]=useState('')
  const [Activeblock,setActiveblock]=useState('')
  const [tslblock,setTslblock]=useState('')
  const [pnlblock,setpnlblock]= useState('')
  const [lockblock,setlockblock]=useState('')
  const[lossblock,setLossblock]= useState('')
  const [rentry,setReentry]= useState('')
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);

  const [sublegid,setsublegid]= useState([
    {Blockid:'' ,sublegid:1,checked:false}
  ])

  const [correction,setcorrection]= useState(0)
  const [blocksl,setblocksl]=useState(0)
  const [blocktrail,setblocktrail]=useState(0)
  const [blocktarget,setblocktarget]=useState('')
  const [blocktimer,setblocktimer]=useState('')
  const [paper, setpaper]= useState(false)

  const [optionlabel,setoptionlabel]= useState('')
  const [call, setcall] = useState('');
  const [put, setput] = useState('');

  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null)





  const formatTime = (time) => {
    if (!time) return null;
    if (Array.isArray(time)) {
      // Format range of times
      return `${new Date(time[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} - ${new Date(time[1]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    // Format single time
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  const   handlecallput = (type)=>{
  
    if (optionlabel==='Call'){
      setcall(type)
      setoptionlabel('')

    } 
    if (optionlabel==='Put'){
      setput(type)
      setoptionlabel('')
    }
  
    }
    const getButtonColor = (buttonType) => {
      if (buttonType === 'Call') {
        return optionlabel === 'Call' ? 'bg-blue-500 text-white' : 'bg-gray-200';
      } else if (buttonType === 'Put') {
        return optionlabel === 'Put' ? 'bg-blue-500 text-white' : 'bg-gray-200';
      } else if (buttonType === 'Buy') {
        return (call === 'BUY' || put === 'BUY') ? 'bg-green-500 text-white' : 'bg-gray-200';
      } else if (buttonType === 'Sell') {
        return (call === 'SELL' || put === 'SELL') ? 'bg-red-500 text-white' : 'bg-gray-200';
      }
      return 'bg-gray-200';
    };
    const handleOptionClick = (option) => {
      if (option !== optionlabel) {
        setoptionlabel(option);
        setcall('');
        setput('');
      }
    };






  const [viewall, setviewall]= useState(false)

  const [selectDisable, setSelectDisable] = useState("");

  const [Lockleg,setlogleg]=useState('')
  const [optiondata,setoptiondata]= useState({type:'',side:''})
  const [Amountblock,setAmountblock]= useState('')
  const [addtrade,setAddtrade]= useState(false)
  const [advice,Setadvice]= useState(false)
  const[brokerselect,setbrokerselect]= useState('')
  const [spotpricel1,setspotpricel1]= useState('')
  const[Nearestatml1,setNearestatml1]= useState('')
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


  const legadd = (id=bid)=>{
    console.log(bid,'bid')
    const endpoint = 'addleg'
    const Blockid= id
    const strategy= 1
    const sublegdata= {advice,spotpricel1,Nearestatml1, sublegid, correction,strikePrice,sltype,blocksl,blocktrail,
      tsltype,targettype,blocktarget,blocktimer,Activeleg,lockleg,tslleg,targetleg,call,put,Quantprice,Amount,nearestatm,trail,sl,target,timer,
    }
    console.log(sublegdata)
    const payload = JSON.stringify({sublegdata,Blockid,strategy
      })

    
    
      const type = "POST"


    
    handleexchangerequest(type, payload, endpoint)
    .then(response => {
    console.log(response)
    })
  }


  

  const handleSelectdisable = (e) => {
    setSelectDisable(e.target.value);
  };

  const isContentDisabled = selectDisable === "Future";


  const handleviewall = ()=>{
    setviewall(true)

  }
  const handleCancelViewAll = () => {
    setviewall(false);
  };

  const handlelegselect= (id) =>{

    setsublegid((prevData) =>
  prevData.map((item) =>
    item.sublegid === id ? { ...item,checked:!item.checked } : item
  )
);


}


 const handledatecahnge= (e)=>{
    SetDatevalue(e.target.value)
  }
  const handlemode = () =>{
    setpaper(!paper)
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
    setActiveblock(e.target.value)
  }
  const handlebloctsl= (e)=>{
    setTslblock(e.target.value)
  }
  const handleblockTarget= (e)=>{
    setTargetblock(e.target.value)
  }
  const handleblockLock= (e)=>{
    setlockblock(e.target.value)
  }
  const handleBlockpnl= (e)=>{
    setpnlblock(e.target.value)
  }
    
  const toggleActivation = () => {
    setIsActivated(!isActivated);
  };

  const handledatecahnge1= (e)=>{
    SetDatevalue1(e.target.value)
  }
  const handlesegment= (e)=>{
    SetSegment(e.target.value)
  }
  const handleTradeadvice= (e)=>{
    Setadvice(e.target.value)
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


  
  const handleAddTrade= ()=>{
    const endpoint = "addblock"
    const strategy= 1
    const payload = JSON.stringify({strategy})
    const type = "POST"
    handleexchangerequest(type, payload, endpoint)
    .then(response => {
    setAddtrade(!addtrade)

    console.log(response)
    })
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

  const  handlenearestatm=(e)=>{
    const strikenear= e.target.value
    setstrikeprice(defaultstrikePrices+strikenear)

  }
  const brokerstatus= (id,val) =>{

    setBroker((prevData) =>
  prevData.map((item) =>
    item.id === id ? { ...item,value:!item.value } : item
  )
);}



  

  return (
    <>

    
     <div className=" bg-cyan-900 rounded-md absolute right-14 bottom-10 w-9/12 max-xs:bottom-0 max-xs:h-full p-3 max-xs:overflow-y-scroll">
     <div className="w-[98%]">
     <div className=" flex flex-row-reverse">
     <Button onClick={onClose}  className="bg-red-600">X</Button>
     </div>

<div className="mt-4">
  <div className="flex rounded-sm px-2 max-xs:flex-col " style={{ background: '#CCCCCC' }}>
    <div className="col-lg-6 my-3">
      <div className="row">
        <div className="col-sm-4 col-5">
        <select  className='form-select'  onChange={(e)=>handleTradeadvice(e)}>
            <option value=""> TRADE ADVICE</option>
            <option value="spot">Spot </option>
            <option value="sequence">Sequnce </option>
            <option value="cover">cover </option>
            </select> 
            </div>
        <div className="col-4">
          <input type="number" className="form-control"  onChange={(e)=>setspotpricel1(e.target.value)} placeholder='Spot Price' />
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
<input type="text" onChange={(e)=>setcorrection(e.target.value)} placeholder="value" 
className="bg-white w-32 text-black rounded-sm px-1"/>
</div>
      )}
      </div>
    </div>        
  </div>
</div>
<div className={`flex flex-wrap ${isContentDisabled ? 'opacity-50 pointer-events-none' : ''}`}>
  <div className="col-lg-3 col-sm-5 col-9 mt-3">
    <div className="flex gap-3">
      <div className="col-6">
        
         <Popover open={Combovalue} onOpenChange={setComboValue}>
                   <PopoverTrigger asChild>
                   <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={Combovalue}
                      className="w-[140px] justify-between text-black"
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
        <button type="button" className="btn btn-success">Automatic</button>
      </div>
    </div>
  </div>
  <div className="col-lg-2 col-sm-2 col-3 mt-3">
  <input type="text" className='form-control' value= {strikeprice!=='Select Strike Price'?strikeprice:''} placeholder='Strike Price' defaultValue={defaultstrikePrices} disabled />
  </div>
  <div className="col-lg-3 col-sm-5 mt-3">
  <input type="number" value={nearestatm} className='form-control' onChange={(e)=>setNearestatm(e.target.value)}  placeholder='Nearest ATM' />
  </div>
  <div className="col-lg-2 col-6 mt-3">
    
    <div className="row">
      {/* <div className="col-6"> */}
        {/* <button type="button" className="btn btn-light w-100">(-)</button> */}
      {/* </div> */}
      {/* <div className="col-6"> */}
        {/* <button type="button" className="btn btn-danger w-100">(+)</button> */}
      {/* </div> */}
    </div>
  </div>
  <div className="col-lg-2 col-6 mt-3">
    <div className="row">
      <div className="col-6">
      <button  onClick={() => {
              setoptionlabel('Call');
              setput('');
            }}
            type="button"  className={`px-4 text-black py-2 rounded ${getButtonColor('Call')}`}>Call</button>

      </div>
      <div className="col-6">
      <button  onClick={()=>handlecallput('BUY')} type="button"  className={`px-4 py-2 text-black rounded ${getButtonColor('Buy')}`}>Buy</button>
      </div>
    </div>
  </div>
  <div className="col-lg-2 col-6 mt-3 offset-lg-10 offset-6">
    <div className="row">
      <div className="col-6">
      <button onClick={() => {
              setoptionlabel('Put');
              setcall('');
            }} type="button"  className={`px-4 py-2 text-black rounded ${getButtonColor('Put')}`}>Put</button>

      </div>
      <div className="col-6">
      <button  onClick={()=>handlecallput('SELL')} type="button" className={`px-4 py-2 text-black rounded ${getButtonColor('Sell')}`}>Sell</button>

      </div>
    </div>
  </div>
</div>

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
    <div className="row">
      <div className="col-6">
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
      <Popover>
    <PopoverTrigger asChild>
      <div>
      
        <label className="text-white text-center"> Timer</label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className=" p-2 w-full justify-between text-black">
            {formatTime(selectedTime) || "Timer"} <ChevronDown className="ml-2 h-4 w-4" />
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
    <PopoverContent className="w-80">
      {selectedOption === 'time' && (
        <TimePicker.RangePicker 
        onChange={(time) => {setSelectedTime(time); console.log(time)}} 
          className="bg-white"
          clockIcon={null}
          disableClock={true}
          format="HH:mm:ss"
        />
      )}
      {selectedOption === 'hours' && (
        <TimePicker

        onChange={(time) => {setSelectedTime(time); console.log(time)}}
          clockIcon={null}
          disableClock={true}
          format="HH:mm"
          className="bg-white"
        />
      )}
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
        <input type="number" className='form-control' onChange = {(e)=> handlesetactive(e)} placeholder='Active' />
      </div>
      <div className="col-lg col-sm-4 mt-3">
        <input type="number" className='form-control' onChange={(e)=>handlesetlock(e)} placeholder='Lock' />
      </div>
      <div className="col-lg col-sm-4 mt-3">
        <input type="number" className='form-control'  onChange= {(e)=>handletslleg(e)} placeholder='Trail Profit' />
      </div>
      <div className="col-lg col-sm-6 mt-3">
        <input type="number" className='form-control' onChange={(e)=>handleLegTarget(e)} placeholder='TARGET' />
      </div>
      <div className="col-lg col-sm-6 mt-3">
        <button type="button" onClick={()=>legadd()} className="btn btn-success w-100" >save</button>
      </div>
    </div>
  </div>
  </div>

</div>
    </>
  )
}

export default Addleg