import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleexchangerequest } from "../utility/Api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Report = () => {
    const location = useLocation();
    const blockid = location.state?.blockid; 
    console.log("Received blockid:", blockid);
    const [scriptData, setScriptData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);
    
    
    const tableheaddata = ["ID",	"Broker",'strategy',	"Symbol",	"buyorderid",	"LTP",	"avg_price"	,"Side"	,"QTY",	"Status",	"sellorderid",	"sl",	"SLHIT",	"TargetHit",	"TRAILHIT",	"Action"];
    const navigate = useNavigate();
    useEffect(() => {
      const filteredData = scriptData.filter(script =>
        script.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === 'ALL' || script.status === statusFilter)
      );
      setScriptData(filteredData);
    }, [searchTerm, statusFilter]);
  
    useEffect(() => {
    
        Alltrade();
      
    }, []);
  
    const Alltrade = async () => {
      const endpoint = "Alltrade";
      const payload = '';
      const type = "GET";
  
      try {
        const response = await handleexchangerequest(type, payload, endpoint);
        if (response) {
          console.log("API response data:", response.legdata);
  
          
          setData(response);
          console.log("Formatted data for the table:", formattedData);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    const tradeblocklist= async () =>{
        const endpoint = "tradeblock"
        const payload = 'strategy=0'
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
    
  
    const handleOpen = () => {
      setIsOpen(true);
    };
  
    const handleUpdate = ()=>{
      window.location.reload();
    }
  
    return (
      <>
        <div className='flex flex-col items-center gap-10'>
          <div className='text-white'>Open Postions</div>
          <div className='flex flex-row gap-10'>
            {/* <div>
              <Label htmlFor="search" className="sr-only">Search</Label>
              <Input
                id="search"
                placeholder="Search by script name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div> */}
            <div>
              {/* <div className="flex flex-col">
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
               */}
            </div>
        <Button onClick={() => navigate('/home')}> Back to Dashboard</Button>


          </div>
          <div className='w-[64rem]'>
            <div className="overflow-x-auto h-82 w-full rounded-lg">
              <table className="min-w-full border border-gray-300 text-sm bg-gray-300 rounded-sm">
                <thead>
                  <tr>
                    {tableheaddata.map((header) => (
                      <th key={header} className="p-1 px-4 border-b border-r text-left">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                  console.log(item,'item'),
                    <tr key={item.id} className="text-gray-800 bg-slate-500 ">
                      
                                <td className="border border-gray-300 p-1 text-slate-950 break-all">{item.id}</td>
                                  
                                <td className="border border-gray-300 p-1 text-slate-950 break-all">{item.broker}</td>  
                                <td className="border border-gray-300 p-1 text-slate-950 break-all">{item.strategy}</td>  

                                <td className="border border-gray-300 p-1 text-slate-950 break-all">{item.tradingsymbol}</td>
                                <td className="border border-gray-300 p-1 text-slate-950 break-all">{item.buyorderid}</td>
                                <td className="border border-gray-300 p-1 text-slate-950 break-all">{item.ltp}</td>
                    
                                <td className="border border-gray-300 p-1 text-slate-950 break-all">{item.avg_price}</td>
                                <td className="border border-gray-300 p-1 text-slate-950 break-all">{item.side}</td>
                                <td className="border border-gray-300 p-1 text-slate-950 break-all">{item.quantity}</td>
                                <td className="border border-gray-300 p-1 text-slate-950 break-all">{item.status?"ACTIVE":"OFF"}</td>
                                <td className="border border-gray-300 p-1 text-slate-950 break-all">{item.sellorderid}</td>
                                <td className="border border-gray-300 p-1 text-slate-950 break-all">{item.sl}</td>
                                <td className="border border-gray-300 p-1 text-slate-950 break-all">{item.slhit}</td>
                                <td className="border border-gray-300 p-1 text-slate-950 break-all">{item.targethit}</td>
                                <td className="border border-gray-300 p-1 text-slate-950 break-all">{item.trailhit}</td>
                      <td className="p-1 px-4 border-b border-r">
                        <Button size="sm" className="w-full" onClick={handleOpen}>EXIT</Button>
                      </td>
                                          </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
  
        </div>

      </>
  )
}

export default Report