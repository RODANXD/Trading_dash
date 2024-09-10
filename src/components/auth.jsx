 
 import React, { useEffect, useState} from 'react';
 // import    '../style/botstyle.css';
 
 
 
 
 
 
 export const handleauth= ()=>{
        const [isAuthExpired, setIsAuthExpired] = useState(false);

    const func = ()=>{

        const expiry = localStorage.getItem('expiry')
        const authexpired = Date.now()>expiry
        setIsAuthExpired(authexpired)
        

    } 

    

    useEffect (()=> {
        func()

        
    }
    

        
    ,[func])
 return isAuthExpired


 }
 