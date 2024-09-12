 
 import React, { useEffect, useState} from 'react';
 // import    '../style/botstyle.css';
 
 
 
 
 
 
 export const handleauth= ()=>{
        const [isAuthExpired, setIsAuthExpired] = useState(false);

    const func = ()=>{

        const expiry = localStorage.getItem('expiry')
        // const expirystamp= new Date(expiry).getTime()
        const authexpired = Date.now()>(parseFloat(expiry) * 1000)
        console.log(Date.now(),expiry)
        setIsAuthExpired(authexpired)
        

    } 

    

    useEffect (()=> {
        func()

        
    }
    

        
    ,[func])
 return isAuthExpired


 }
 