import { useState, useEffect } from "react";
import * as React from "react";

import { TimeInput } from "@mantine/dates";
import { CiClock2 } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DropdownMenuCheckboxes from "./ui/dropdown";
import { Label } from "@/components/ui/label";
import Strategy3_form from "./Strategy3_form";
import { handleexchangerequest } from "../utility/Api";

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

export default function TradingForm() {
  const [movement, setMovement] = useState("");
  const [ioChange, setIoChange] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [sameDirectionDay, setSameDirectionDay] = useState("");
  const [monthlyExpiryDay, setMonthlyExpiryDay] = useState("");
  const [candleHighLowTime, setCandleHighLowTime] = useState("");
  const [retracement, setRetracement] = useState("");
  const [niftyTime, setNiftyTime] = useState("");
  const [entryDurationTime, setEntryDurationTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [viewall, setviewall] = useState(false);
  const [paper, setpaper] = useState(false);
  const [currentblock, setcurrentblock] = useState("");

  const [Tradeblockno, settradeblockno] = useState([]);
  const [head, Sethead] = useState([
    { id: 1, key: "Amount", value: 0 },
    { id: 2, key: "Target", value: 0 },
    { id: 3, key: "Strike", value: 0 },
    { id: 4, key: "SL", value: 0 },
    { id: 5, key: "SLtrail", value: 0 },
    { id: 6, key: "Active", value: 0 },
    { id: 7, key: "Lock", value: 0 },
    { id: 8, key: "Trail", value: 0 },
    { id: 9, key: "Timer", value: 0 },
  ]);

  const [bodydata, SetBodydata] = useState([
    { id: 1, key: "movementum", value: movement },
    { id: 2, key: "oichange", value: ioChange },
    { id: 3, key: "fromtime", value: fromTime },
    { id: 4, key: "totime", value: toTime },
    { id: 5, key: "samedirection", value: sameDirectionDay },
    { id: 6, key: "monthlyexpiry", value: monthlyExpiryDay },
    { id: 7, key: "candlehighlowtime", value: candleHighLowTime },
    { id: 8, key: "Retracement", value: retracement },

    { id: 9, key: "indextime", value: niftyTime },
    { id: 10, key: "Entrytime", value: entryDurationTime },
  ]);

  useEffect(() => {
    SetBodydata([
      { id: 1, key: "movementum", value: movement },
      { id: 2, key: "oichange", value: ioChange },
      { id: 3, key: "fromtime", value: fromTime },
      { id: 4, key: "totime", value: toTime },
      { id: 5, key: "samedirection", value: sameDirectionDay },
      { id: 6, key: "monthlyexpiry", value: monthlyExpiryDay },
      { id: 7, key: "candlehighlowtime", value: candleHighLowTime },
      { id: 8, key: "Retracement", value: retracement },
      { id: 9, key: "indextime", value: niftyTime },
      { id: 10, key: "Entrytime", value: entryDurationTime },
    ]);
  }, [
    movement,
    ioChange,
    fromTime,
    toTime,
    sameDirectionDay,
    monthlyExpiryDay,
    candleHighLowTime,
    retracement,
    niftyTime,
    entryDurationTime,
  ]);

  const scriptData = [
    {
      name: "RAMCOCEM",
      candleHighLow: "826.15",
      longshort: "LONG",
      status: "EXECUTED",
      pnl: "+200",
      cancel: "CANCEL",
      exit: "EXIT",
    },
    {
      name: "EXIDEIND",
      candleHighLow: "504.90",
      longshort: "SHORT",
      status: "PENDING",
      pnl: "",
      cancel: "CANCEL",
      exit: "EXIT",
    },
    {
      name: "HINDALCO",
      candleHighLow: "687.01",
      longshort: "SHORT",
      status: "CANCELLED",
      pnl: "",
      cancel: "CANCEL",
      exit: "EXIT",
    },
    {
      name: "BALKRISIND",
      candleHighLow: "2865.04",
      longshort: "LONG",
      status: "REJECTED",
      pnl: "",
      cancel: "CANCEL",
      exit: "EXIT",
    },
    {
      name: "AMBUJACE",
      candleHighLow: "630.32",
      longshort: "LONG",
      status: "EXECUTED",
      pnl: "+300",
      cancel: "CANCEL",
      exit: "EXIT",
    },
  ];

  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);

  const handleheadchange = (id, val) => {
    Sethead((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, value: val } : item))
    );
  };

  const handlemode = () => {
    setpaper(!paper);
  };
  const Addform = () => {
    setIsOpen(true);
  };
  const toggleActivation = (id, ac) => {
    const endpoint = "Activateblock";
    const Blockid = id;
    const strategy = 3;
    const Activate = ac;
    const payload = JSON.stringify({ Blockid, strategy, Activate });
    const type = "POST";
    handleexchangerequest(type, payload, endpoint).then((response) => {
      console.log(response);
    });
    tradeblocklist();
  };

  const savedatta = () => {
    const endpoint = "saveblock3";
    const strategy = 3;
    const payload = JSON.stringify({ head, paper, bodydata, strategy });
    const type = "POST";
    handleexchangerequest(type, payload, endpoint).then((response) => {
      console.log(response);
    });
  };

  const Deleteblock = (Blockid) => {
    const endpoint = "tradeblock";
    const payload = "strategy=3&Blockid=" + Blockid;
    const type = "DELETE";
    handleexchangerequest(type, payload, endpoint).then((response) => {
      console.log(response);
      window.location.reload();
    });
  };

  const tradeblocklist = async () => {
    const endpoint = "tradeblock";
    const payload = "strategy=3";
    const type = "GET";
    // try {}
    // catch (error){
    //
    // }

    handleexchangerequest(type, payload, endpoint).then((response) => {
      if (response) {
        settradeblockno(response);
        console.log(response, "resposnse");
      }
    });
  };
  useState(() => {
    tradeblocklist();
  }, []);

  const handleviewall = (id) => {
    setviewall(true);
    setcurrentblock(id);
  };

  const handleCancelViewAll = () => {
    setviewall(false);
  };
  return (
    <>
      {!viewall && (
        <>
          <div className="container mx-auto px-4 py-8">
            <div className=" max-xs:w-[80%]">
            <div className="max-xs:w-[70%] max-xs:flex">
            <div className="flex flex-col sm:flex-row max-xs:w-[75%] justify-between items-center mb-4 space-y-4 sm:space-y-0">
              {" "}
              <Button
                onClick={Addform}
                className=" bg-green-600 max-xs:w-full hover:bg-green-700 sm:w-auto"
              >
                {" "}
                + Add Trade{" "}
              </Button>{" "}
              <div className="flex flex-col sm:flex-row max-xs:w-full gap-3 sm:w-auto">
                {" "}
                <Button className="sm:w-auto max-xs:w-full">Exit All</Button>{" "}
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
      </Popover>{" "}
              </div>{" "}
            </div>
            </div>

            {!isOpen && (
              <div className=" max-xs:w-[55%]">
                <>
                  <div className="overflow-y-scroll mb-6">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-300 text-black">
                          <th
                            className="border border-gray-300 p-2"
                            colSpan={2}
                          >
                            Filtered Script
                          </th>
                          <th className="border border-gray-300 p-2">
                            Pending
                          </th>
                          <th className="border border-gray-300 p-2">
                            Executed
                          </th>
                          <th className="border border-gray-300 p-2">
                            Cancelled
                          </th>
                          <th className="border border-gray-300 p-2">PNL</th>
                        </tr>
                      </thead>
                      <tbody className="text-white">
                        <tr>
                          <td className="border border-gray-300 p-2">
                            Long side
                          </td>
                          <td className="border border-gray-300 p-2">3</td>
                          <td className="border border-gray-300 p-2">1</td>
                          <td className="border border-gray-300 p-2">2</td>
                          <td className="border border-gray-300 p-2"></td>
                          <td className="border border-gray-300 p-2"></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2">
                            Short Side
                          </td>
                          <td className="border border-gray-300 p-2">2</td>
                          <td className="border border-gray-300 p-2">1</td>
                          <td className="border border-gray-300 p-2"></td>
                          <td className="border border-gray-300 p-2">1</td>
                          <td className="border border-gray-300 p-2">+500</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="overflow-y-scroll w-full rounded-lg">
                    <table className="min-w-full border border-gray-300 text-sm bg-white rounded-sm">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 border-b border-r text-left">
                            Script Name
                          </th>
                          <th className="py-2 px-4 border-b border-r text-left">
                            Candle high low
                          </th>
                          <th className="py-2 px-4 border-b border-r text-left">
                            LONG/SHORT
                          </th>
                          <th className="py-2 px-4 border-b border-r text-left">
                            Status
                          </th>
                          <th className="py-2 px-4 border-b border-r text-left">
                            PNL
                          </th>
                          <th
                            className="py-2 px-4 border-b text-left"
                            colSpan={2}
                          >
                             cancel 
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {scriptData.map((script, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }
                          >
                            <td className="py-2 px-4 border-b border-r">
                              {script.name}
                            </td>
                            <td className="py-2 px-4 border-b border-r">
                              {script.candleHighLow}
                            </td>
                            <td className="py-2 px-4 border-b border-r">
                              {script.longshort}
                            </td>
                            <td className="py-2 px-4 border-b border-r">
                              <span
                                className={`px-2 py-1 rounded ${
                                  script.status === "EXECUTED"
                                    ? "bg-green-200 text-green-800"
                                    : script.status === "PENDING"
                                    ? "bg-yellow-200 text-yellow-800"
                                    : script.status === "CANCELLED"
                                    ? "bg-red-200 text-red-800"
                                    : "bg-gray-200 text-gray-800"
                                }`}
                              >
                                {script.status}
                              </span>
                            </td>
                            <td className="py-2 px-4 border-b border-r">
                              <span
                                className={
                                  script.pnl.startsWith("+")
                                    ? "text-green-600 font-semibold"
                                    : ""
                                }
                              >
                                {script.pnl}
                              </span>
                            </td>
                            <td className="py-2 px-2 border-b border-r">
                              <Button
                                variant="destructive"
                                size="sm"
                                className="w-full"
                              >
                                {script.cancel}
                              </Button>
                            </td>
                            
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>

                {Tradeblockno.map((item) => (
                  <div>
                    <div className="h-full mt-3 flex flex-col gap-3">
                      <div className="w-full max-xs:w-[90%] border border-white rounded-sm p-2 text-xs text-white">
                        <p className="text-white">Block Id:{item.Blockid}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center justify-center">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="destructive"
                                  className="w-full sm:w-32"
                                >
                                  Delete
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-72">
                                <div className="grid place-items-center gap-4">
                                  <div className="space-y-2 flex flex-col sm:flex-row items-center gap-3">
                                    <h4 className="font-medium leading-none text-center">
                                      Are You really want to Delete
                                    </h4>
                                    <Button
                                      variant="destructive"
                                      className="w-full sm:w-32"
                                      onClick={() => Deleteblock(item.Blockid)}
                                    >
                                      confirm
                                    </Button>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="flex items-center justify-center">
                            <Button
                              className={`w-full sm:w-44 ${
                                item.Activate
                                  ? "bg-green-500 hover:bg-green-600"
                                  : "bg-red-500 hover:bg-red-600"
                              } text-white`}
                              onClick={() =>
                                toggleActivation(item.Blockid, !item.Activate)
                              }
                            >
                              {item.Activate ? "Deactivate" : "Activate"}
                            </Button>
                          </div>
                          <div className="flex flex-col gap-3">
                            <Button variant="destructive" className="w-full">
                              Exit All
                            </Button>
                            <div className="grid w-full items-center gap-1.5">
                              <Label htmlFor="email">PNL</Label>
                              <Input
                                type="number"
                                className=" text-black"
                                placeholder="Value"
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <Button
                              className="w-full sm:w-24"
                              onClick={() => handleviewall(item.Blockid)}
                            >
                              View Detail
                            </Button>
                          </div>
                        </div>

                        <div className="overflow-y-scroll h-28 ">
                          <table className="w-full border-collapse border border-gray-300">
                            <thead>
                              <tr className="bg-gray-300 text-black">
                                <th className="border border-gray-300 p-2">
                                  ID
                                </th>
                                <th className="border border-gray-300 p-2">
                                  Side
                                </th>
                                <th className="border border-gray-300 p-1">
                                  LOT
                                </th>
                                <th className="border border-gray-300 p-1">
                                  Status
                                </th>
                                <th className="border border-gray-300 p-1">
                                  Symbol
                                </th>
                                <th className="border border-gray-300 p-1">
                                  Action
                                </th>
                                <th className="border border-gray-300 p-1">
                                  Action Button
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {scriptData.map((item) => (
                                <tr key={item.name} className="text-gray-800 ">
                                  <td className="border border-gray-300 p-1 text-white">
                                    {item.name}
                                  </td>
                                  <td className="border border-gray-300 p-1 text-white">
                                    {item.candleHighLow}
                                  </td>
                                  <td className="border border-gray-300 p-1 text-white">
                                    {item.longshort}
                                  </td>
                                  <td className="border border-gray-300 p-1 text-white">
                                    {item.status}
                                  </td>
                                  <td className="border border-gray-300 p-1 text-white">
                                    {item.pnl}
                                  </td>
                                  <td className="border border-gray-300 p-1 text-white">
                                    {item.cancel}
                                  </td>
                                  <td className="border border-gray-300 p-1 items-center flex justify-center">
                                    <Button size="sm" className="">
                                      {item.exit}
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          </div>

          {isOpen && (
            <div className="p-4 max-w-7xl mx-auto">
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-300 text-black">
                      <th className="border border-gray-300 p-2" colSpan={2}>
                        Filtered Script
                      </th>
                      <th className="border border-gray-300 p-2">Pending</th>
                      <th className="border border-gray-300 p-2">Executed</th>
                      <th className="border border-gray-300 p-2">Cancelled</th>
                      <th className="border border-gray-300 p-2">PNL</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr>
                      <td className="border border-gray-300 p-2">Long side</td>
                      <td className="border border-gray-300 p-2">3</td>
                      <td className="border border-gray-300 p-2">1</td>
                      <td className="border border-gray-300 p-2">2</td>
                      <td className="border border-gray-300 p-2"></td>
                      <td className="border border-gray-300 p-2"></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">Short Side</td>
                      <td className="border border-gray-300 p-2">2</td>
                      <td className="border border-gray-300 p-2">1</td>
                      <td className="border border-gray-300 p-2"></td>
                      <td className="border border-gray-300 p-2">1</td>
                      <td className="border border-gray-300 p-2">+500</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-8 max-xs:w-[80%]">
                <div className="text-white">
                  <h2 className="text-xl font-semibold mb-4 text-center">
                    Script Selection
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Movement
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <input
                          type="text"
                          value={movement}
                          onChange={(e) => setMovement(e.target.value)}
                          className="form-input text-black w-full py-2 px-3 text- bg-white rounded-sm "
                          placeholder="Active"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <span className="text-gray-500 sm:text-sm">%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-1">
                        From Time
                      </label>
                      <TimeInput
                        value={fromTime}
                        withSeconds
                        onChange={(e) => setFromTime(e.target.value)}
                        className="w-full text-black "
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-1">
                        To Time
                      </label>
                      <TimeInput
                        value={toTime}
                        withSeconds
                        onChange={(e) => setToTime(e.target.value)}
                        className="w-full text-black "
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-center text-white">
                    Eliminate
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-1">
                        IO Change below
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <input
                          type="number"
                          value={ioChange}
                          onChange={(e) => setIoChange(e.target.value)}
                          className="form-input w-full py-2 px-3 text- bg-white rounded-sm "
                          placeholder="Value"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <span className="text-gray-500 sm:text-sm">%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-1">
                        Same direction day
                      </label>
                      <input
                        type="number"
                        value={sameDirectionDay}
                        onChange={(e) => setSameDirectionDay(e.target.value)}
                        className="form-input w-full py-2 px-3 text- bg-white rounded-sm "
                        placeholder="Value"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-1">
                        Monthly expiry day
                      </label>
                      <input
                        type="number"
                        value={monthlyExpiryDay}
                        onChange={(e) => setMonthlyExpiryDay(e.target.value)}
                        className="form-input w-full py-2 px-3 text- bg-white rounded-sm "
                        placeholder="Value"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">
                      Candle high/low time
                    </label>
                    <TimeInput
                      value={candleHighLowTime}
                      withSeconds
                      onChange={(e) => setCandleHighLowTime(e.target.value)}
                      className="w-full "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">
                      Retracement
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="number"
                        value={retracement}
                        onChange={(e) => setRetracement(e.target.value)}
                        className="form-input w-full py-2 px-3 text- bg-white rounded-sm "
                        placeholder="Value"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <span className="text-gray-500 sm:text-sm">%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">
                      Index time
                    </label>
                    <TimeInput
                      value={niftyTime}
                      withSeconds
                      onChange={(e) => setNiftyTime(e.target.value)}
                      className="w-full "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">
                      Entry duration time
                    </label>
                    <TimeInput
                      value={entryDurationTime}
                      withSeconds
                      onChange={(e) => setEntryDurationTime(e.target.value)}
                      className="w-full "
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-center text-white">
                    Entry and Exit
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {head.map((item) => (
                      <div key={item}>
                        <label className="block text-lg font-medium text-zinc-300 mb-1">
                          {item.key}
                        </label>
                        <div className="flex items-center gap-2 ">
                          <input
                            type="number"
                            onChange={(e) =>
                              handleheadchange(item.id, e.target.value)
                            }
                            className="form-input flex-grow py-2 px-3 text-black bg-white rounded-sm"
                            placeholder="Value"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="">
                      <DropdownMenuCheckboxes stat="3" />
                      {/* <input type="text" className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Active" /> */}
                    </div>
                    <div>
                      <div>
                        <Button
                          onClick={() => handlemode()}
                          variant="outline"
                          className={
                            paper
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-red-500 hover:bg-red-600"
                          }
                        >
                          {paper ? "Paper" : "Live"}
                        </Button>
                      </div>
                      {/* <input type="text" className="form-input w-full py-2 px-3 text- bg-white rounded-sm" placeholder="Active" /> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex justify-between items-center max-xs:justify-evenly">
                <Button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="mt-4"
                >
                  Cancel
                </Button>
                <Button onClick={() => savedatta()} className="mt-4">
                  Save
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {viewall && (
        <Strategy3_form
          onCancel={() => handleCancelViewAll()}
          blockid={currentblock}
        />
      )}
    </>
  );
}
