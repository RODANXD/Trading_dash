// import axios from 'axios';
import * as React from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { DatePickerInput } from '@mantine/dates';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  const [datevalue, SetDatevalue] = useState(new Date());
  const [datevalue1, SetDatevalue1] = useState(new Date());
  const [segment,SetSegment]=useState('')
  const [strikePrices, setStrikePrices] = useState([]);
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

  const [viewall, setviewall]= useState(false)




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

  const settings = ()=>{
    const endpoint = "settings"
    const payload = JSON.stringify({datevalue,datevalue1,tradetype,segment,selectVertical,
      brokerselect,Paper,live,rentry,lossblock,Activeblock,pnlblock,lossblock,lockblock,targetblock,tslblock,pnlblock})
    const type = "POST"
    handleexchangerequest(type, payload, endpoint)
    .then(response => {
    console.log(response)
    })
  }

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


  const handleviewall = ()=>{
    setviewall(true)

  }
  const handleCancelViewAll = () => {
    setviewall(false);
  };


 const handledatecahnge= (e)=>{
    SetDatevalue(e.target.value)
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
    setAddtrade(!addtrade)}
    const endpoint = "addblock"
    const strategy= 1
    const payload = JSON.stringify({strategy})
    const type = "POST"
    handleexchangerequest(type, payload, endpoint)
    .then(response => {
    console.log(response)
    })

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
    {!viewall && (
      <>
    <div className="container-xl my-3">
      <div className="row">
        <div className="col-md-4 col-6">
          <button type="button" className="btn btn-success" onClick={handleAddTrade} disabled={isExpirySelected || isStrikeSelected}>+ Add Trade</button>
          

        </div>
        
        <div className="col-md-4 col-6 d-flex justify-content-end order-md-2">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="w-100">
              Exit All
            </Dropdown.Toggle>
            {/* <Dropdown.Menu> */}
              {/* <Dropdown.Item href='#'>Trade 01 <span style={{ float: 'right' }}> <input type="checkbox" /></span></Dropdown.Item> */}
              {/* <Dropdown.Item href='#'>Trade 02 <span style={{ float: 'right' }}> <input type="checkbox" /></span></Dropdown.Item> */}
              {/* <Dropdown.Item href='#'>Trade 03 <span style={{ float: 'right' }}> <input type="checkbox" /></span></Dropdown.Item> */}
              {/* <Dropdown.Item href='#'>Trade 04 <span style={{ float: 'right' }}> <input type="checkbox" /></span></Dropdown.Item> */}
              {/* <Dropdown.Item href='#'>Trade 05 <span style={{ float: 'right' }}> <input type="checkbox" /></span></Dropdown.Item> */}
              {/* <Dropdown.Item href='#'>Trade 06 <span style={{ float: 'right' }}> <input type="checkbox" /></span></Dropdown.Item> */}
            {/* </Dropdown.Menu> */}
            
          </Dropdown>
        </div>
        <div className="col-md-4 col-12 text-center mt-md-0 mt-3">
          {/* <button type="button" className="btn w-100" style={{ backgroundColor: '#e6e6e9', width: 'fit-content', borderRadius: '5px' }}><b>Terminal ON/OFF</b>&ensp; {toggleStatus ? <i className="fa fa-toggle-on text-primary" style={{ fontSie: '18px' }} onClick={() => setToggleStatus(false)} /> : <i className="fa fa-toggle-off text-primary" style={{ fontSize: '18px' }} onClick={() => setToggleStatus(true)} />}</button> */}
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
        </div>
      </div >

      {!addtrade && (
     <div className="h-[65%] border border-emerald-900 mt-3">
            <div className="w-full p-2 text-xs text-white">
              <div className="h-32 w-full flex justify-evenly">
               
                <div className="flex items-center justify-center h-24 w-64">
                  <Popover>
                    <PopoverTrigger>
                      <button className="btn btn-danger w-32">Delete</button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72">
                      <div className="grid place-items-center gap-4">
                        <div className="space-y-2 flex items-center gap-3">
                          <h4 className="font-medium leading-none text-center">Are You really want to Delete</h4>
                          <button className="btn btn-danger w-32">confirm</button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex items-center justify-center h-24 w-64">
                  <button
                    className={`btn w-44 ${isActivated ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} text-white`}
                    onClick={toggleActivation}
                  >
                    {isActivated ? "Deactivate" : "Activate"}
                  </button>
                </div>
                <div className="pt-1 flex flex-col gap-3 h-32 w-64">
                  <button className="btn btn-danger">Exit All</button>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">PNL</Label>
                    <Input type="number" placeholder="Value" />
                  </div>
                </div>
                <div className="flex items-center justify-center h-24 w-64">
                  <button className="btn btn-info w-24" onClick={handleviewall}>
                    View All
                  </button>
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
                      <th className="border border-gray-300 p-1">Action</th>
                      <th className="border border-gray-300 p-1">Action Button</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scriptData.map((item) => (
                      <tr key={item.name} className="text-gray-800">
                        <td className="border border-gray-300 p-1 text-white">{item.name}</td>
                        <td className="border border-gray-300 p-1 text-white">{item.candleHighLow}</td>
                        <td className="border border-gray-300 p-1 text-white">{item.longshort}</td>
                        <td className="border border-gray-300 p-1 text-white">{item.status}</td>
                        <td className="border border-gray-300 p-1 text-white">{item.pnl}</td>
                        <td className="border border-gray-300 p-1 text-white">{item.cancel}</td>
                        <td className="border border-gray-300 p-1">
                          <Button className="text-xs p-2">{item.exit}</Button>
        
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
              </div>
            </div>
          </div>
          
    )}

     {addtrade?( <div className=' flex flex-col gap-4'>
      <div className="mt-2">
        <div className="row">
          <div className="col-lg-6 mt-3">
            <div className="row">
              <div className="col-4">
                <button type="button" className="btn btn-light w-100" onClick={() => (setShowCalender(!showCalender), setShowCalender2(false))}>Trade Validity <i className="fa fa-angle-down" /></button>
                {/* <DatePickerInput className='text-white'
      valueFormat="YYYY MMM DD"
      type="multiple"
      label="Pick date"
      placeholder="Pick date"
    /> */}
              </div>
              
              <div className="col-4">
              <select id="selectVertical" className='form-select' onChange={(e) => handletradetype(e)} value={tradetype}>
                    <option value="">Select Tradetype</option>
                    <option value="NIFTY">Intrday</option>
                    <option value="BANKNIFTY">Carryforward</option>
                  </select>

                  
                
              </div>
              <div className="col-4">

                <button type="button" className="btn btn-light w-100" onClick={() => (setShowCalender2(!showCalender2), setShowCalender(false))}>No Trading Zone <i className="fa fa-angle-down" /></button>
              </div>
            </div>
            {showCalender ? 
                // <div style={{ position: 'absolute', zIndex: '999' }}><Calendar onChange={onChange} value={value} /></div>
                
          <div style={{ position: 'absolute', zIndex: '999' }}><input  onChange={handledatecahnge} className =" bg-white w-2/3 rounded-sm mt-2"value={datevalue} type="datetime-local" name="date" min="1994-01-01T00:00"/></div>
          : <></>}
            <div className='d-flex justify-content-end' style={{ position: 'relative' }}>{showCalender2 ?
          <div style={{ position: 'absolute', zIndex: '999', right: "-40px" }}><input className=' bg-white w-2/3 rounded-sm mt-2'  onChange={handledatecahnge1} value={datevalue1} type="datetime-local" name="date" min="1994-01-01T00:00"/></div>

             : <></>}</div>
          </div>
          <div className="col-lg-6 mt-3">
            <div className="row">
              <div className="col-lg-4 col-sm-6 col-7 offset-lg-4">
                <button type="button" className="btn btn-light w-100">{toggleStatus2 ? <i className="fa fa-toggle-on text-primary" style={{ fontSie: '18px' }} onClick={() => setToggleStatus2(false)} /> : <i className="fa fa-toggle-off text-primary" style={{ fontSize: '18px' }} onClick={() => setToggleStatus2(true)} />}&ensp;Active/Deactivate</button>
              </div>
              <div className="col-lg-4 col-sm-6 col-5">
                <button type="button" className="btn btn-light w-100">❌ Exit All</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div className="row">
          <div className="col-lg-6 mt-3">
            <div className="row">
              <div className="col-4">
              <select  className='form-select'
                onChange={handlesegment}
                      
                    >
                      <option value=""> select segment</option>
                      <option value="Cash">Cash </option>
                      <option value="Derivative">Derivative </option>
                      </select>
                    </div>
              
              <div className="col-4">
                {!loading ?
                  <select id="selectVertical" className='form-select' onChange={(e) => handleSelectChange(e)} value={selectVertical}>
                    <option value="">Select Vertical</option>
                    <option value="NIFTY">Nifty</option>
                    <option value="BANKNIFTY">BANKNIFTY</option>
                  </select>
                  :
                  <div className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                }
              </div>
              <div className="col-4">
                {expiries.length !== 0 ?
                  <select id="expirySelect" className='form-select' onChange={(e) => sethandleexpiry(e)}value={expiry}>
                    <option>Select Expiry</option>
                    {expiries.map((date, index) =>
                      <option key={index} value={date}>{date}</option>
                    )}
                  </select>
                  :
                  <select id="expirySelect" className='form-select'>
                    <option>Select Expiry</option>
                  </select>
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
                  <select  className='form-select' onChange={handleTradeadvice}>
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
                        <Button variant="outline" className="w-32 bgreen-600">Leg No</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                          checked={showStatusBar}
                          onCheckedChange={setShowStatusBar}
                        >
                          1
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={showActivityBar}
                          onCheckedChange={setShowActivityBar}
                        >
                          2
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={showPanel}
                          onCheckedChange={setShowPanel}
                        >
                          3
                        </DropdownMenuCheckboxItem>
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
        <input type="text" placeholder="value" className="bg-white w-32 text-black rounded-sm px-1"/>
      </div>
                )}
                  



                  <div className="col-lg-3 col-6">
                    <button type="button" className="btn btn-light w-100">PNL</button>
                  </div>
                  <div className="col-lg-3 col-6">
                    <button type="button" className="btn btn-light w-100">❌ Exit All</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-5 col-9 mt-3">
              <div className="row">
                <div className="col-6">
                  {strikePrices.length !== 0 ?
                    <select id="strikePriceSelect" className='form-select' onChange={() => setIsStrikeSelected(true)}>
                      <option>Select Strike Price</option>
                      {strikePrices.map((Price, index) =>
                        <option key={index} value={Price}>{Price}</option>
                      )}
                    </select>
                    :
                    <select id="strikePriceSelect" className='form-select'>
                      <option>Select Strike Price</option>
                    </select>
                  }
                </div>
                <div className="col-6">
                  <button type="button" className="btn btn-success w-100">Automatic</button>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-sm-2 col-3 mt-3">
              <input type="text" className='form-control' placeholder='Strike Price' defaultValue={defaultstrikePrices} disabled />
            </div>
            <div className="col-lg-3 col-sm-5 mt-3">
              <input type="number" className='form-control' onChange={(e)=>setNearestatml1(e.target.value)}  placeholder='Nearest ATM' />
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
                  <button type="button" className="btn btn-light w-100">Call</button>
                </div>
                <div className="col-6">
                  <button type="button" className="btn btn-light w-100">Buy</button>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-6 mt-3 offset-lg-10 offset-6">
              <div className="row">
                <div className="col-6">
                  <button type="button" className="btn btn-light w-100">Put</button>
                </div>
                <div className="col-6">
                  <button type="button" className="btn btn-light w-100">Sell</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-9 mt-3">
              <div className="row">
                <div className="col-6">
                  <button type="button" className="btn btn-light w-100">Strike</button>
                </div>
                <div className="col-6">
                  <button type="button" className="btn btn-success w-100">Automatic</button>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-3 mt-3">
              <input type="text" className='form-control' placeholder='Value' />
            </div>
            <div className="col-lg-3 col-sm-6 mt-3">
              <div className="row">
                <div className="col-6">
                <select  className='form-select'onChange={handlesltype}>
                      <option value=""> SL</option>
                      <option value="Points">Spot Points </option>
                      <option value="Percentage">Points</option>
                      <option value="Percentage">Value</option>
                      <option value="">%</option>
                </select>
                        </div>
                <div className="col-6">
                  <input type="text" placeholder='Manual Entry' className='form-control' />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mt-3">
              <div className="row">
                <div className="col-6">
                <select  className='form-select'onChange={handletsltype}>
                      <option value=""> TRAILSL</option>
                      <option value="Points">Points </option>
                      <option value="Percentage">%</option>
                      </select>
                      </div>
                <div className="col-6">
                  <input type="text" placeholder='Manual Entry' className='form-control' />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mt-3 offset-lg-5">
              <div className="row">
                <div className="col-6">
                <select  className='form-select'onChange={handleTargettype}>
                      <option value="">Target</option>
                      <option value="Points">Spot Points </option>
                      <option value="Percentage">Points</option>
                      <option value="Percentage">Value</option>
                      <option value="">%</option>
                </select>

                  </div>
                <div className="col-6">
                  <input type="text" placeholder='Manual Entry' className='form-control' />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mt-3">
              <div className="row">
                <div className="col-6">
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic" className="w-100">
                      Timer
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {/* <Dropdown.Item href='#'>Point</Dropdown.Item> */}
                      {/* <Dropdown.Item href='#'>Percentage</Dropdown.Item> */}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="col-6">
                  <input type="text" placeholder='Manual Entry' className='form-control' />
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
                  <input type="number" className='form-control' onchange = { handlesetactive} placeholder='Active' />
                </div>
                <div className="col-lg col-sm-4 mt-3">
                  <input type="number" className='form-control' onChange={handlesetlock} placeholder='Lock' />
                </div>
                <div className="col-lg col-sm-4 mt-3">
                  <input type="number" className='form-control'  onchange= {handletslleg} placeholder='Trail Profit' />
                </div>
                <div className="col-lg col-sm-6 mt-3">
                  <input type="number" className='form-control' onchange={handleLegTarget} placeholder='TARGET' />
                </div>
                <div className="col-lg col-sm-6 mt-3">
                  <button type="button" className="btn btn-success w-100" >+ Add Leg</button>
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
                <div className="col-6 mt-3">
                <select  onChange={(e)=>handlebrokerchange(e)} className='form-select'>
                  <option value=""> Broker </option>
                <option value="Zerodha">Zerodha</option>
                <option value="Angel">Angel</option>
                </select>
                   
                  
                </div>
                <div className="col-6 mt-3">
                  <input type="number" className=' bg-white text-black p-2 rounded-sm' value={Amountblock} onChange= {(e)=>setAmountblock(e.target.value)} placeholder='Amount'></input>
                  
                  
                  
                </div>
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
              <input type="text"  onChange={ handleblockactive} className='form-control' placeholder='Active' />
            </div>
            <div className="col-lg col-sm-4 mt-3">
              <input type="number"  onChange={handleblockLock} className='form-control' placeholder='Lock' />
            </div>
            <div className="col-lg col-sm-4 mt-3">
              <input type="number"  onChange={handlebloctsl} className='form-control' placeholder='Trail Profit' />
            </div>
            <div className="col-lg col-sm-6 mt-3">
              <input type="number"  onChange={handleblockTarget}  className='form-control' placeholder='Overall TARGET' />
            </div>
            <div className="col-lg col-sm-6 mt-3">
              <input  onChange={handleBlockpnl} type="text" className='form-control' placeholder='Overall PNL' />
            </div>
          </div>
          
        </div>
        {/* <div className="col-sm-4 mt-3"> */}
            {/* <button type="button"  onClick={() => settings()} className="btn btn-success w-100 btn-lg"><i className="fa fa-save" /> Save</button> */}
          {/* </div> */}
      </div>

        </>
        
        
      


      <div className='mt-3' style={{ maxWidth: '500px', margin: 'auto' }}>
        <div className="row">
          <div className="col-sm-4 mt-3">
            <button type="button" className="btn btn-success w-100 btn-lg"><i className="fa fa-save" /> Save</button>
          </div>
          <div className="col-sm-4 mt-3">
            <button type="button" className="btn btn-secondary w-100 btn-lg">Approved</button>
          </div>
          <div className="col-sm-4 mt-3">
            <button type="button" className="btn btn-secondary w-100 btn-lg">Deployed</button>
          </div>
        </div>
      </div>
      
    </div>):''}
    </div>
    </>
    )}

{viewall&&(<Strategy1_form onCancel={handleCancelViewAll}/>)}


    </>
  );
}

export default Custom;