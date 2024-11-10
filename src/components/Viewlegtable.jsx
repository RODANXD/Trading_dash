import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { handleexchangerequest } from "../utility/Api";


const Viewlegtable = ({blockid}) => {
  console.log("teek h", blockid);
  const [scriptData, setScriptData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  
  const tableheaddata = ["Blockid", "sublegid", "Activeleg", "lockleg", "tslleg", "targetleg", "sl", "trail", "target", "timer", "strikeprice", "advice", "spotprice", "ATM", "call", "put", "correction", "sltype", "tsltype", "targettype", "nearestatm", "Linkleg", "Edit", "Delete"];
  const tablebodydata = ["name", "candleHighLow", "longshort", "longshort", "longshort", "longshort", "longshort", "longshort", "longshort", "longshort", "longshort", "longshort", "longshort", "longshort", "longshort", "longshort", "longshort", "longshort", "longshort", "longshort", "longshort", "status"];
  useEffect(() => {
    const filteredData = scriptData.filter(script =>
      script.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'ALL' || script.status === statusFilter)
    );
    setScriptData(filteredData);
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    viewlegdata();
  }, []);

  const viewlegdata = async (id=blockid) => {
    const endpoint = "addleg";
    const payload = 'Blockid='+id; 
    const type = "GET";

    try {
      const response = await handleexchangerequest(type, payload, endpoint);
      if (response) {
        const formattedData = response.legdata.map((item, index) => ({
          options: tableheaddata[index],
          current: item[tablebodydata[index]] || 'unknown',
          new: ''
        }));
        setScriptData(response.legdata);
        setData(formattedData);
        console.log(formattedData);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className='flex flex-col items-center gap-10'>
        <div className='text-white'>Viewlegtable</div>
        <div className='flex flex-row gap-10'>
          <div>
            <Label htmlFor="search" className="sr-only">Search</Label>
            <Input
              id="search"
              placeholder="Search by script name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            {/* filter box */}
            <div className="flex flex-col">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Statuses</SelectItem>
                  <SelectItem value="EXECUTED">Executed</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className='w-[64rem]'>
          <div className="overflow-x-auto h-72 w-full rounded-lg">
            <table className="min-w-full border border-gray-300 text-sm bg-gray-300 rounded-sm">
              <thead>
                <tr>
                  {tableheaddata.map((header) => (
                    <th key={header} className="p-1 px-4 border-b border-r text-left">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scriptData.map((script, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-slate-400" : "bg-slate-300"}>
                    {tablebodydata.map((field) => (
                      <td key={field} className="p-1 px-4 border-b border-r">{script[field]}</td>
                    ))}
                    <td className="p-1 px-4 border-b border-r">
                      <Button size="sm" className="w-full" onClick={handleOpen}>Edit</Button>
                    </td>
                    <td className="p-1 px-4 border-b border-r">
                      <Button variant="destructive" size="sm" className="w-full">Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {isOpen && (
          <div className="small-window text-white bg-blue-950 rounded-md p-3 h-1/2 overflow-hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button className="float-right text-white" onClick={() => setIsOpen(false)}>X</button>
            <div className='h-4/6 overflow-auto mt-8'>
              <table className="multi-tablem text-white w-full">
                <thead className='bg-slate-600'>
                  <tr className="text-center">
                    {["OPTIONS", "CURRENT", "NEW"].map((header) => (
                      <th key={header} className="p-2 border-b border-gray-300 text-center">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-slate-500" : "bg-slate-400"}>
                      <td className="p-2 border-b border-gray-300 text-center">{item.options}</td>
                      <td className="p-2 border-b border-gray-300 text-center">{item.current}</td>
                      <td className="p-2 border-b border-gray-300 text-center">
                        <input type="text" className="w-44 rounded-md text-white p-1 text-xs font-thin bg-slate-800" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="optionbutton bg-green-600 text-white p-2 rounded-md mt-4">
              UPDATE
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Viewlegtable;
