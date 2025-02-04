import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from 'react-router-dom';

import { handleexchangerequest } from "../utility/Api";

const Viewlegtable = () => {
  const location = useLocation();
  const blockid = location.state?.blockid || "Unknown Block ID"; 
  console.log("Received blockid:", blockid);

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [sublegid, setsublegid] = useState(null);
  const [Blockid, setBlockid] = useState(null);

  const tableheaddata = ["Blockid", "sublegid", "Activeleg", "lockleg", "tslleg", "targetleg", "sl", "trail", "target", "timer", "strikeprice", "advice", "spotprice", "call", "put", "correction", "sltype", "tsltype", "targettype", "nearestatm", "Linkleg", "Edit", "Delete"];
  const updatetable = ["Activeleg", "lockleg", "tslleg", "targetleg", "sl", "trail", "target", "timer", "strikeprice", "spotprice", "call", "put", "correction", "nearestatm", "Linkleg"];

  useEffect(() => {
    if (blockid) {
      viewlegdata(blockid);
    }
  }, [blockid]);

  const viewlegdata = async (id = blockid) => {
    const endpoint = "addleg";
    const payload = `Blockid=${id}`;
    const type = "GET";

    try {
      const response = await handleexchangerequest(type, payload, endpoint);
      if (response) {
        const formattedData = response.legdata.map((item) => ({
          ...item,
          Blockid: id,
          original: { ...item },
        }));
        
        setData(formattedData);
        console.log("Formatted data for the table:", formattedData);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleInputChange = (header, value) => {
    if (selectedRow !== null) {
      setData((prevData) =>
        prevData.map((row, rowIndex) =>
          rowIndex === selectedRow
            ? {
                ...row,
                [header]: value || row.original?.[header],
              }
            : row
        )
      );
    }
  };

  const handleOpen = (rowIndex,id,blkid) => {
    setSelectedRow(rowIndex);
    setsublegid(id)
    setIsOpen(true);
    setBlockid(blkid)
  };

  const handleUpdate = (Blockid,sublegid) => {
    console.log("Updated data:", data);
    const endpoint = "addleg"
    const payload = JSON.stringify({data,Blockid,sublegid})
    const type = "PUT"
    
      handleexchangerequest(type, payload, endpoint)
      .then (response=> {
        if (response){
      console.log(response,'resposnse')
    
    
        }
    
      })

  };

  return (
    <>
      <div className="flex flex-col items-center gap-10">
        <div className="text-white text-lg font-bold">Viewlegtable</div>
        <div className="flex flex-row gap-10">
          <div>
            <Label htmlFor="search" className="sr-only">Search</Label>
            <Input
              id="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="w-[64rem]">
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
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-slate-400" : "bg-slate-300"}>
                    {tableheaddata.slice(0, -2).map((header, cellIndex) => (
                      <td key={cellIndex} className="p-1 px-4 border-b border-r">{row[header] || 'N/A'}</td>
                    ))}
                    <td className="p-1 px-4 border-b border-r">
                      <Button size="sm" className="w-full" onClick={() => handleOpen(rowIndex,row.sublegid,row.Blockid)}>Edit</Button>
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

        {isOpen && selectedRow !== null && (
          <div className="small-window text-white bg-blue-950 rounded-md p-3 h-1/2 overflow-hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button className="float-right text-white" onClick={() => setIsOpen(false)}>X</button>
            <div className="h-4/6 overflow-auto mt-8">
              <span className="text-lg font-bold block">Block ID: {blockid}</span>
              <span className="text-lg font-bold block">Subleg ID: {data[selectedRow]?.sublegid || "N/A"}</span>

              <table className="multi-table text-white w-full mt-4">
                <thead className="bg-slate-600">
                  <tr>
                    {["OPTIONS", "CURRENT", "NEW"].map((header) => (
                      <th key={header} className="p-2 border-b border-gray-300 text-center">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {updatetable.map((header, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-slate-500" : "bg-slate-400"}>
                      <td className="p-2 border-b border-gray-300 text-center">{header}</td>
                      <td className="p-2 border-b border-gray-300 text-center">
                        {data[selectedRow]?.[header] || "N/A"}
                      </td>
                      <td className="p-2 border-b border-gray-300 text-center">
                        {header === "call"||header === "put"?(
                          <select onChange ={(e) => handleInputChange(header, e.target.value)}
                           className="w-44 rounded-md text-white p-1 text-xs font-thin bg-slate-800">
                            <option value="Buy">BUY</option>
                            <option value="Sell">SELL</option>
                          </select>
                        ):(
                          <input
                          type="number"
                          onChange={(e) => handleInputChange(header, e.target.value)}
                          className="w-44 rounded-md text-white p-1 text-xs font-thin bg-slate-800"
                        />
                          
                        )}
                        
                        
                        {/* <input
                          type="number"
                          onChange={(e) => handleInputChange(header, e.target.value)}
                          className="w-44 rounded-md text-white p-1 text-xs font-thin bg-slate-800"
                        /> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="bg-green-600 text-white p-2 rounded-md mt-4" onClick={()=>handleUpdate(blockid,sublegid)}>
              UPDATE
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Viewlegtable;
