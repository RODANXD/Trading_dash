import React from 'react'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const initialScriptData = [
  { name: '1', candleHighLow: '826.15', longshort: '11', status: '22', pnl: '22', cancel: '22', exit: '23' },
  { name: '2', candleHighLow: '504.90', longshort: '45', status: '33', pnl: '44', cancel: '43', exit: '44' },
  { name: '3', candleHighLow: '687.01', longshort: '11', status: '33', pnl: '44', cancel: '43', exit: '44' },
  { name: '4', candleHighLow: '2865.04', longshort: '11', status: '33', pnl: '44', cancel: '66', exit: '45' },
  { name: '5', candleHighLow: '630.32', longshort: '11', status: '33', pnl: '30', cancel: '45', exit: '45' },
]
const Viewlegtable = () => {
  const [scriptData, setScriptData] = useState(initialScriptData)
  // const [scriptData,setscriptdata]=useState([])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  useEffect(() => {
    const filteredData = initialScriptData.filter(script => 
      script.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'ALL' || script.status === statusFilter)
    )
    setScriptData(filteredData)
  }, [searchTerm, statusFilter])
  
  return (
    <>
    <div className='text-white'>Viewlegtable</div>
    <div>
      <div>
        <input type="search" name="" id="" />
      </div>
      <div>
        {/* filte box */}
        <div className="flex flex-col"></div>
      </div>
    </div>
    <div className='w-[64rem]'>
    <div className=" overflow-x-auto h-72 w-full rounded-lg">
                    <table className="min-w-full border border-gray-300 text-sm bg-gray-300 rounded-sm">
                      <thead>
                        <tr>
                          <th className="p-1 px-4 border-b  border-r text-left">
                          Blockid
                          </th>
                          <th className="p-1 px-4 border-b border-r text-left">
                          sublegid
                          </th>
                          <th className="p-1 px-4 border-b border-r text-left">
                          Activeleg
                          </th>
                          <th className="p-1 px-4 border-b border-r text-left">
                          lockleg
                          </th>
                          <th>
                            tslleg 
                          </th>
                          <th className="p-1 px-4 border-b border-r text-left">
                          targetleg
                          </th><th className="p-1 px-4 border-b border-r text-left">
                          sl
                          </th><th className="p-1 px-4 border-b border-r text-left">
                          trail
                          </th><th className="p-1 px-4 border-b border-r text-left">
                          target
                          </th><th className="p-1 px-4 border-b border-r text-left">
                          timer
                          </th><th className="p-1 px-4 border-b border-r text-left">
                          strikeprice
                          </th><th className="p-1 px-4 border-b border-r text-left">
                          advice
                          </th><th className="p-1 px-4 border-b border-r text-left">
                          spotprice
                          </th><th className="p-1 px-4 border-b border-r text-left">
                          ATM
                          </th><th className="p-1 px-4 border-b border-r text-left">
                          call
                          </th><th className="p-1 px-4 border-b border-r text-left">
                          lput
                          </th>
                          <th className="p-1 px-4 border-b border-r text-left">
                          correction
                          </th>
                          <th className="p-1 px-4 border-b border-r text-left">
                          sltype
                          </th>
                          <th className="p-1 px-4 border-b border-r text-left">
                          tsltype
                          </th>
                          <th className="p-1 px-4 border-b border-r text-left">
                          targettype
                          </th>
                          <th className="p-1 px-4 border-b border-r text-left">
                          nearestatm
                          </th>
                          <th className="p-1 px-4 border-b border-r text-left">
                          Linkleg
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        { scriptData.map((script, index) => (
                          <tr
                            key={index} 
                            className={
                              index % 2 === 0 ? "bg-slate-400" : "  bg-slate-300"
                            }
                          >
                            <td className="p-1 px-4 border-b border-r">
                              {script.name}
                            </td>
                            <td className="p-1 px-4 border-b border-r">
                              {script.candleHighLow}
                            </td>
                            <td className="p-1 px-4 border-b border-r">
                              {script.longshort}
                            </td>
                            <td className="p-1 px-4 border-b border-r">
                              {script.longshort}
                            </td>
                            <td className="p-1 px-4 border-b border-r">
                              {script.longshort}
                            </td>
                            <td className="p-1 px-4 border-b border-r">
                              {script.longshort}
                            </td>
                            <td className="p-1 px-4 border-b border-r">
                              {script.longshort}
                            </td>
                            <td className="p-1 px-4 border-b border-r">
                              {script.longshort}
                            </td>
                            <td className="p-1 px-4 border-b border-r">
                              {script.longshort}
                            </td>
                            <td className="p-1 px-4 border-b border-r">
                              {script.longshort}
                            </td>
                            <td className="p-1 px-4 border-b border-r">
                              {script.longshort}
                            </td>
                            <td className="p-1 px-4 border-b border-r">
                              {script.longshort}
                            </td>
                            <td className="p-1 px-4 border-b border-r">
                              {script.longshort}
                            </td>
                            <td className="p-1 px-4 border-b border-r">
                              {script.longshort}
                            </td>
                            <td className="p-1 px-4 border-b border-r">
                              {script.longshort}
                            </td>
                            <td className="p-1 px-4 border-b border-r">
                              {script.longshort}
                            </td>
                            <td className="p-1 px-4 border-b border-r">
                              {script.longshort}
                            </td>
                            <td className="p-1 px-4 border-b border-r">
                              {script.longshort}
                            </td>
                            <td className="p-1 px-4 border-b border-r">
                              {script.longshort}
                            </td>
                            <td className="p-1 px-4 border-b border-r">
                              {script.longshort}
                            </td>
                            <td className="p-1 px-4 border-b border-r">
                              {script.longshort}
                            </td>
                          
                            <td className="p-1 px-4 border-b border-r">
                              <span
                                className={`px-2 py-1 rounded ${
                                  script.status === "EXECUTED"
                                    ? "bg-green-200 text-green-800"
                                    : script.status === "PENDING"
                                    ? "bg-yellow-200 text-yellow-800 "
                                    : script.status === "CANCELLED"
                                    ? "bg-red-200 text-red-800"
                                    : "bg-gray-100  text-gray-800"
                                }`}
                              >
                                {script.status}
                              </span>
                            </td>
                            
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  </div>
    </>
  )
}

export default Viewlegtable