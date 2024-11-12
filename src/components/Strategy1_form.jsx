    // import axios from 'axios';
import * as React from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { DatePickerInput } from '@mantine/dates';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DatePicker from 'react-datepicker'
import TimeRangePicker from "shadcn-time-range-picker";
import "react-datepicker/dist/react-datepicker.css"

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

import DropdownMenuCheckboxes from './ui/dropdown'

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import DateRangePicker from "./ui/Datetimepicker";
import { ChevronDown } from "lucide-react"
import { Check, ChevronsUpDown } from "lucide-react"
import { TimePicker } from "antd";





import {handleexchangerequest} from '../utility/Api'

const Strategy1_form = ({onCancel,blockid}) => {
  const [expiries, setExpiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [datevalue, SetDatevalue] = useState(new Date());
  const [datevalue1, SetDatevalue1] = useState(new Date());
  const [segment,SetSegment]=useState('')
  const [strikePrices, setStrikePrices] = useState([]);
  const [isContentDisabled,setisContentDisabled]= useState(false)
  const [strikeprice,setstrikeprice]= useState('')

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
  const [fno, setFno] = useState("");

  const [selectDisable, setSelectDisable] = useState("");
  const [Quantprice,setQuantprice]= useState('')

  const [onAccountSelect,setonAccountSelect]= useState([
    { id: 1, Username: "Xyz", brokername: "Shoonya", accountnumber: "123456", strategy: '', value: true },

  ])
  
  // const [isOpen, setIsOpen] = React.useState(false)
  // const Addform = () => setIsOpen(!isOpen)


  // const [value, setValue] = useState<Date | null>(null);



  const [sltype,setsltype]=useState('')
  const [sltytpe,settsltype]=useState('')
  const [targettype,settargettype]=useState('')
  const [Activeleg,setActiveleg]=useState('')
  const [tslleg,setTslleg]=useState('')
  const [Paper,setPaper]= useState(false)
  const[live,setLive]= useState(false)
  console.log(live,Paper)
  const [targetleg,setTargetleg]=useState('')
  
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

  const [head,Sethead]= useState([])

  // NEW
  const [tradevalidity, Settradevalidity] = useState(new Date());
  const [correction,setcorrection]= useState(0)
  const[nearestatm,setNearestatm]= useState(0)
  const [optionlabel,setoptionlabel]= useState('')
  const [put,setput]= useState('')
  const [sl,setsl]=useState(0)
  const [trail,settrail]=useState(0)
  const [target,settarget]=useState('')
  const [timer,settimer]=useState('')
  const [call,setcall]= useState('')
  const [Notradingzone, SetNotradingzone] = useState(new Date());
  const [isContentDisabledEXP,setisContentDisabledEXP]= useState(true)

  const [Comboopen, setComboOpen] = useState(false)
  const [Combovalue, setComboValue] = useState(false)
  const [Comsymbols, setComSymbols] = useState(false)
  const [market,setmarket]=useState(false)
  const [showsymbol,setshowsymbol]=useState(false)
  const [selectsymbol,setselectsymbol]=useState('')
  const [Symbol,setsymbol]= useState([])
  const [instruction, setinstruction] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [Amount,setAmount]= useState('')
  const [paper1, setpaper1]= useState(false)
  const [selectedTime, setSelectedTime] = useState(null);







  





  const formatTime = (time) => {
    if (!time) return null;
    if (Array.isArray(time)) {
      // Format range of times
      return `${new Date(time[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} - ${new Date(time[1]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    // Format single time
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };


  const handledatecahnge= (e)=>{
    Settradevalidity(e.target.value)
  }


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
      if (isContentDisabled) {
    
        switch (buttonType) {
          case 'Buy':
            return selectedOption === 'Buy' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black';
          case 'Sell':
            return selectedOption === 'Sell' ? 'bg-red-500 text-white' : 'bg-gray-200 text-black';
          default:
            return 'bg-gray-200 text-black';
        }
      } else {
    
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
      }
    };
    
  const handleOptionClick = (option) => {
    if (option !== optionlabel) {
      setoptionlabel(option);
      setcall('');
      setput('');
    }
  };





  const handlemap=()=>{
}

  const handleSelectdisable = (e) => {
    setFno(e.target.value);

  if  (e.target.value==='FUTSTK'){
      // setshowsymbol(false)
      setshowsymbol(true)
      setisContentDisabled(true)
      setSelectVertical('stock')}

  if  (e.target.value==='OPTSTK'){
      // setshowsymbol(false)
      setshowsymbol(true)
      setSelectVertical('stock')
      setisContentDisabled(false)

}

    if  (e.target.value==='FUTIDX'){
      setisContentDisabled(true)
      setshowsymbol(false)
      }
    
    if (e.target.value==='OPTIDX'){
      setisContentDisabled(false)
      setshowsymbol(false)
    }
    if (e.target.value==='CASH'){
      setisContentDisabledEXP(true)
      // setshowsymbolEXP(false)
      setshowsymbol(true)

    }
    else {
      setisContentDisabledEXP(false);
    }

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


useEffect(()=>{
  head.map((item)=>{
    console.log(item,'value1')
    SetDatevalue(item.tradevalidity)
    SetDatevalue1(item.Notradingzone)
    setTradetype(item.tradetype)
    SetSegment(item.segment)
    setSelectVertical(item.selectVertical)
    setSelectDisable(item.fno)

    setDefaultStrikePrices(item.ATM)
    // setTargetblock(item.blocktarget)
    // setTslblock(item.blocksl)



  

  })

},[head,SetDatevalue,SetDatevalue1,setTradetype,,SetSegment,setSelectVertical,setSelectDisable,
  setDefaultStrikePrices])



  const [Lockleg,setlogleg]=useState('')
  const [optiondata,setoptiondata]= useState({type:'',side:''})
  const [Amountblock,setAmountblock]= useState('')
  const [addtrade,setAddtrade]= useState(false)
  const [advice,Setadvice]= useState(false)
  const[brokerselect,setbrokerselect]= useState('')
  const [spotpricel1,setspotpricel1]= useState('')
  const[Nearestatml1,setNearestatml1]= useState('')
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

  const handlezerodha = ()=>{
    const endpoint = "zerodha"
    const payload = ""
    const type = "POST"
    handleexchangerequest(type, payload, endpoint)
    .then(response => {
      window.open(response)
    })
  }
  const settings =  ()=>{
    const endpoint = "saveblockst1"
    const strategy= 1
    const sublegdata= {advice,spotprice,correction,sltype,tsltype,strikeprice,targettype,sl,target,timer,trail,call,
      put,Activeleg,lockleg,targetleg,tslleg,Quantprice,Amount,nearestatm}
    const tradetool=   {tradevalidity,Notradingzone,tradetype,segment,selectVertical,fno,expiry,paper,rentry,overallActive,overallloss,overallLock,overallTARGET,overallTrailprofit,overallpnl,selectsymbol}
    const payload = JSON.stringify({strategy,tradetool,sublegdata})
    const type = "PUT"
    handleexchangerequest(type, payload, endpoint)
    .then(response => {
    console.log(response)
    })
  }

  

  const handleviewdetail = (Blockid=blockid)=>
  
    {
      const endpoint = "saveblockst1"
      const payload = "Blockid="+Blockid
      const type = "GET"
      handleexchangerequest(type, payload, endpoint)
      .then(response => {
        if (response.length!=0){

        Sethead(response)
        
      }

      
      })
    }
    useEffect (()=>{
      handleviewdetail()

    },[])


  const legadd = ()=>{
    const endpoint = "SpotLeg"
    const payload = JSON.stringify({advice,spotpricel1,Nearestatml1,segment,selectVertical,
      brokerselect,Paper,live,rentry,lossblock,Activeblock,pnlblock,lossblock,lockblock,targetblock,tslblock,pnlblock})
    const type = "POST"
    handleexchangerequest(type, payload, endpoint)
    .then(response => {
    console.log(response)
    })
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

  const handleAddTrade= ()=>{
    setAddtrade(!addtrade)}

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

  

  const handleSelectChange = async (event) => {
    setSelectVertical(event.target.value)
    setLoading(true)
    const fetchData = async () => {
      try {
        // const response = await axios.get(`http://127.0.0.1:5000/option_chain?option_type=${event.target.value}`);
        const response = await axios.get(`serverURL/option_chain?option_type=${event.target.value}`);
        setExpiries(response.data.records.expiryDates);
        setStrikePrices(response.data.records.strikePrices);
        setDefaultStrikePrices(response.data.records.underlyingValue)
        setLoading(false)
      } catch (error) {
        alert("Getting Error While Fetching API! Please Try Again!!!")
        setLoading(false)
      }
    };
    fetchData();
  };


  const scriptData = [
    { name: "RAMCOCEM", candleHighLow: "826.15", longshort: "LONG", status: "EXECUTED", pnl: "+200", cancel: "CANCEL", exit: "EXIT" },
    { name: "EXIDEIND", candleHighLow: "504.90", longshort: "SHORT", status: "PENDING", pnl: "", cancel: "CANCEL", exit: "EXIT" },
  ];
  return (

    
    
    
    <>
              <div className="col-lg-6 w-full">
                
            <div className="flex flex-wrap gap-3 w-96">
              <div className="col-lg-4 col-6 mt-2">
                <button type="button" className="btn btn-light w-100 text-sm">Max Moving High {890}</button>
              </div>
              <div className="col-lg-4 col-6 mt-2">
                <button type="button" className="btn btn-light w-100 text-sm">Avg Moving</button>       
              </div>
              <div className="col-lg-4 col-6  mt-2">
                <button type="button" className="btn btn-light w-100 text-sm">Max Drawdown</button>
              </div>
              <div className="col-lg-4 col-6 mt-2">
                <button type="button" className="btn btn-light w-100 text-sm">Up Avg Moving</button>
              </div>
            </div>
          </div>

        <div className=' flex flex-col gap-4'>
    <div className="mt-2">
      <div className="row justify-evenly">
        <div className="col-lg-6 mt-3">
          <div className="row">
              <div className="col-4">
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

              
              <div className="col-4">
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
              <div className="col-4">
              <label className="text-white text-lg">No Trade Zone</label>
          <DateRangePicker className="bg-white w-100" />
                {/* <button type="button" className="btn btn-light w-100" onClick={() => (setShowCalender2(!showCalender2), setShowCalender(false))}>No Trading Zone <i className="fa fa-angle-down" /></button> */}
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
          <div className='d-flex justify-content-end' style={{ position: 'relative' }}>{showCalender2 ?
          <div style={{ position: 'absolute', zIndex: '999', right: "-40px" }}><input className=' bg-white w-2/3 rounded-sm mt-2'  onChange={(e)=>handledatecahnge1(e)} value={Notradingzone} type="datetime-local" name="date" min="1994-01-01T00:00"/></div>
        

           : <></>}</div>
        </div>

      </div>
    </div>

    <div className="mt-2">
      <div className="w-full">
        <div className="col-lg-6 mt-3">
          <div className="flex justify-around gap-5 w-full">
            <div className="col-4">
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
            
             <div className="col-4">
                <select id="selectVertical" className='form-select w-full' onChange={(e) => handleSelectChange(e)} value={selectVertical}>
                  <option value="">Select Vertical</option>
                  {segment=='NFO'&&<option  value="NIFTY">Nifty</option>}
                  {segment=='NFO'&&<option  value="BANKNIFTY">BANKNIFTY</option>}
                  {segment=='NFO'&&<option  value="FINNIFTY">FINNIFTY</option>}
                  {segment=='BFO'&& <option   value="SENSEX">SENSEX</option>}
                </select>
              </div>  
              <div className="col-4">
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

            <div className="col-4">
              {expiries.length !== 0 ?
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
                           onSelect={() => setExpiry(symbol)}
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
    
    {/* {defaultstrikePrices !== '' ? <h1 className='mt-3'>Current Spot Price <span className='bg-secondary text-white px-2 py-1 fs-3'>₹ {defaultstrikePrices}</span></h1> : <></>} */}

    
   
    
      <>
        <div className="mt-4">
          <div className="row" style={{ background: '#CCCCCC' }}>
            <div className="col-lg-6 my-3">
              <div className="row">
                <div className="col-sm-4 col-5">
                <select  className='form-select' onChange={(e)=>handleTradeadvice(e)}>
                    <option value=""> TRADE ADVICE</option>
                    <option value="spot">Spot </option>
                    <option value="sequence">Sequnce </option>
                    <option value="cover">cover </option>
                    <option value="Market">Market </option>

                    </select> 
                    </div>
                <div className="col-4">
                  <input type="number" className="form-control"  onChange={(e)=>setspotpricel1(e.target.value)} placeholder='Spot Price' />
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
            <input type="text" placeholder="value" onChange={(e)=>setcorrection(e.target.value)} className="bg-white w-32 text-black rounded-sm px-1"/>
    </div>
              )}
                {/* <div className="col-lg-3 col-6">
                  <button type="button" className="btn btn-light w-100">PNL</button>
                </div>
                <div className="col-lg-3 col-6">
                  <button type="button" className="btn btn-light w-100">❌ Exit All</button>
                </div> */}
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
          <div className="col-lg-2 col-sm-2 col-3 mt-3">
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
            type="button"  className={`px-4 text-black  py-2 rounded ${isContentDisabled ? 'opacity-50 pointer-events-none' : ''} 
            ${getButtonColor('Call')}`}>Call</button>
                </div>
                <div className="col-6">
                <button   onClick={()=>{handlecallput('BUY'); setSelectedOption('Buy')}} type="button"  className={`px-4 py-2 text-black rounded ${getButtonColor('Buy')}`}>Buy</button>
                </div>
              </div>
            </div>
            </div>
            <div className="col-lg-2 col-6 mt-3 offset-lg-10 offset-6">
              <div className="row">
                <div className="col-6">
                <button onClick={() => {
              handleOptionSelect('Put')
            }}  type="button"  className={`px-4 py-2 text-black rounded ${isContentDisabled ? 'opacity-50 pointer-events-none' : ''} ${getButtonColor('Put')}`}>Put</button>
                </div>
                <div className="col-6">
                <button  onClick={()=>{handlecallput('SELL'); setSelectedOption('Sell')}} type="button" className={`px-4 py-2 text-black rounded ${getButtonColor('Sell')}`}>Sell</button>

                </div>
              </div>
            </div>
        
        <div className="row">
          <div className="col-lg-3 col-9 mt-3">
            <div className="row">
            <div className="col-6">
            <lable className="text-white">LOT QUANTITY</lable>
                  <button type="button" className="btn btn-light w-100">Quantity</button>
                  <Input className="mt-1 text-black" onChange={(e)=>setQuantprice(e.target.value)} value= {Quantprice} placeholder="Value" type="number"/>
                </div>
              <div className="col-6">
              <lable className="text-white">AMOUNT</lable>

                <button type="button" className="btn btn-success w-100">AMOUNT</button>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-3 mt-3">
          <lable className="text-white">Value</lable>
          <input onChange={(e)=>setAmount(e.target.value)} value={Amount}   type="text"  className='form-control'  placeholder='Value'  />

          </div>
          <div className="col-lg-3 col-sm-6 mt-3">
            <div className="row">
              <div className="col-6">
              <lable className="text-white">SL</lable>

              <select  className='form-select'onChange={(e)=>handlesltype(e)}>
                      <option value=""> SL</option>
                      <option value="SpotPoints">Spot Points </option>
                      <option value="Points">Points</option>
                      <option value="value">Value</option>
                      <option value="Percentage">%</option>
                </select>
                      </div>
              <div className="col-6">
                <lable className="text-white">Value</lable>
              <input type="text" onChange={(e)=>setsl(e.target.value)} value = {sl} placeholder='Manual Entry' className='form-control' />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 mt-3">
            <div className="row">
              <div className="col-6">
              <label className="text-white"> SL</label>
              <select  className='form-select'onChange={(e)=>handletsltype(e)}>
                    <option value=""> TRAILSL</option>
                    <option value="Points">Points </option>
                    <option value="Percentage">%</option>
                    </select>
                    </div>
              <div className="col-6">
              <lable className="text-white">Value</lable>

              <input type="text" onChange={(e)=>settrail(e.target.value)} value = {trail} placeholder='Manual Entry' className='form-control' />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 mt-3 offset-lg-5">
            <div className="row">
              <div className="col-6">
              <label className="text-white"> Target</label>

              <select  className='form-select'onChange={(e)=>handleTargettype(e)}>
                    <option value="">Target</option>
                    <option value="Points">Spot Points </option>
                    <option value="Percentage">Points</option>
                    <option value="Percentage">Value</option>
                    <option value="">%</option>
              </select>

                </div>
              <div className="col-6">
              <lable className="text-white">Value</lable>

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
                <Button variant="outline" className=" p-2 w-full justify-between">
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
        <PopoverContent className="w-80" >
        {selectedOption === 'time' && (
        <TimePicker.RangePicker 
        onChange={(time) => setSelectedTime(time)} 
          className="bg-white"
          clockIcon={null}
          disableClock={true}
          format="HH:mm:ss"
        />
      )}
      {selectedOption === 'hours' && (
        <TimePicker

        onChange={(time) => setSelectedTime(time)}
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
              <lable className="text-white">Value</lable>
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
                  <input type="number" className='form-control' onChange={(e)=> handlesetlock(e)} placeholder='Lock' />
                </div>
                <div className="col-lg col-sm-4 mt-3">
                  <input type="number" className='form-control'  onChange= {(e)=> handletslleg(e)} placeholder='Trail Profit' />
                </div>
                <div className="col-lg col-sm-6 mt-3">
                  <input type="number" className='form-control' onChange={(e)=> handleLegTarget(e)} placeholder='TARGET' />
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
                <button onClick={()=>{setPaper(true),setLive(false)}} type="button" className= {Paper?"btn btn-success w-100":"btn btn-light w-100"}>Paper</button>
              </div>
              <div className="col-6 mt-3">
                <button  onClick={()=>{setLive(true),setPaper(false)}}type="button" className={live?"btn btn-success w-100":"btn btn-light w-100"}>Live</button>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="row">
              {/* <div className="col-6 mt-3">
              <select  onChange={(e)=>handlebrokerchange(e)} className='form-select'>
                <option value=""> Broker </option>
              <option value="Zerodha">Zerodha</option>
              <option value="Angel">Angel</option>
              </select>
                 
                
              </div> */}
               <div className=" grid place-items-center mt-8 w-44">
               <DropdownMenuCheckboxes stat="1" onAccountSelect={setonAccountSelect} />
              
            </div> 
              {/* <div className="col-6 mt-3">
                <input type="number" className=' bg-white text-black p-2 rounded-sm' value={Amountblock} onChange= {(e)=>setAmountblock(e.target.value)} placeholder='Amount'></input>
                
              </div> */}
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
            <input type="number" onChange={(e)=>setLossblock(e.target.value)} className='w-100 form-control' placeholder='Overall Loss' />
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
      {/* <div className="col-sm-4 mt-3"> */}
          {/* <button type="button"  onClick={() => settings()} className="btn btn-success w-100 btn-lg"><i className="fa fa-save" /> Save</button> */}
        {/* </div> */}
    </div>

      </>
      
      
    


    <div className='mt-3' style={{ maxWidth: '500px', margin: 'auto' }}>
      <div className="flex items-center gap-4 w-full max-xs:flex-col ">
        <div className="col-sm-6 mt-3">
        <button type="button" onClick= {()=>settings()}className="btn btn-success w-100 btn-lg"><i className="fa fa-save" /> Save</button>
        </div>
        <div className="col-sm-6 mt-3 ">
        <button onClick={onCancel} type="button" className="btn btn-danger w-100 btn-lg">Cancel</button>
          
        </div>
      </div>
    </div>
    
  </div></>
  )
}

export default Strategy1_form