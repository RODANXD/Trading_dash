"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DropdownMenuCheckboxes({ stat, onAccountSelect }) {
  const [broker, setBroker] = useState([
    { id: 1, Username: "Xyz", brokername: "Shoonya", accountnumber: "123456", strategy: stat, value: true },
    { id: 2, Username: "Xyz", brokername: "Angel", accountnumber: "123456", strategy: stat, value: true },
    { id: 3, Username: "Xyz", brokername: "Dhan", accountnumber: "123456", strategy: stat, value: true },
  ]);

  useEffect(() => {
    getBroker();
  }, []);

  const getBroker = async () => {
    const endpoint = "broker";
    const type = "GET";
    const sdd = localStorage.getItem("token");
    const token = "token " + sdd;

    try {
      const response = await fetch(`http://3.111.155.182:8000/${endpoint}`, {
        method: type,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch brokers");

      const data = await response.json();
      console.log(data);
      setBroker(data.message);
    } catch (error) {
      console.error("Error fetching broker data:", error);
    }
  };

 
  onAccountSelect(broker)
  

  const showStatusBar =  (id, value) => {
    
    setBroker((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, value: !value } : item
      )
    );
    // const updatedBroker = broker.find((b) => b.id === id);
    // if (updatedBroker) {
    //   onAccountSelect({
    //     id: updatedBroker.id,
    //     Username: updatedBroker.Username,
    //     brokername: updatedBroker.brokername,
    //     accountnumber: updatedBroker.accountnumber,
    //     value: !updatedBroker.value,
    //   });
    // }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full bg-blue-300">
          Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel></DropdownMenuLabel>
        <DropdownMenuSeparator />
        {broker.map((item) => (
          <DropdownMenuCheckboxItem
            key={item.id}
            onCheckedChange={() => showStatusBar(item.id, item.value)}
            checked={item.value}
          >
            {`${item.Username} ${item.brokername} ${item.accountnumber}`}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
