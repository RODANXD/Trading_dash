import React, { useState,useEffect } from 'react';
import    './verseaX2style.css';
//import { useNavigate  } from 'react-router-dom';
import Back from './pinrigtharrow'
import Layout from './pintop'
import { useNavigate  } from 'react-router-dom';
import {Getperm} from './GetPermission'
import Alert from '@mui/material/Alert';
import { GrClose} from 'react-icons/gr';
import Edituserform from './Edituser'
const Adduser = () => {
  const [Name, setName] = useState('');
  const [MobileNumber, setMobileNumber] = useState('');
  const [Address, setAddress] = useState('');
  const [ProjectID, setProjectID] = useState('');
  const [error, setError] = useState('');
  const[token,setToken]= useState('');
  const [options, setOptions] = useState([]);
  const [GUID,setGUID]=useState([]);
  const [filterText, setFilterText] = useState('');
  const [sortOption, setSortOption] = useState('none');
  const [loading, setLoading] = useState(true);
  const[permission,setPermission]= useState(false)
  const [alert,setAlert]= useState(false)
  const[veiwpermission,setViewpermission]= useState(false)
  const [pressdelete, setPressdelete] = useState(true);
  const[pid,setPid]=useState('')
  const[istick,setIstick]=useState(false)
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const Mobile= screenSize.width<1025
  
  useEffect(() =>{
    Getperm()
    .then((data) => {
     // Use the fetched data
     setPermission(data.details.CANAddUser);
     setViewpermission(data.details.CANViewUser)
     if (! data.details.CANViewUser){
      setAlert(true)}
     console.log('Fetched position:', data.details.CANAddUser);
   })
   .catch((error) => {
     // Handle the error
     console.error('Fetch error:', error);
   });
    
    
  },[])

  const Handleedit = (pd) =>{
    setPid(pd)
    setIstick(true)
  } 
  const hadnlecloseswindow=()=>{
 

    setIstick(false)
  
  }
 
 
  
  //const [loading, setLoading] = useState(true);
 // const[csv,setCsv]=useState(null);

  
  
  
  
  
  useEffect(() =>{
    if (!veiwpermission){
 
      
      return 
    }
    const sd = localStorage.getItem('token');
    setToken(sd)
    
    const handleprosubmit = async (e) => {
    
     const t= 'token '+ sd
     console.log(t)
    
     try {
        const response = await fetch('https://x.versea.co/Clocking/projlist', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Connection: 'keep-alive',
            'Authorization': t,
  
          },
         
        });
      if (!response.ok) {
        throw new Error('Failed');
      }
      const data = await response.json();
      const optionsData = data.Details.map((item) => ({
        value: item.projectID.toString(),
        label: item.projectName,
        
      }));

      console.log(error)
     
      setOptions(optionsData);
      setLoading(false)
    } catch (error) {
      setError('Please fill all fields ');
      console.error('Login error:', error);
    }
    
    
  } 
  handleprosubmit()},[veiwpermission,setGUID]
  )
  const handlepressdelete = (pd) => {

    setPressdelete(pd)
   
  }

  const handleprodelete = async (rd)  => {
    if (!permission){
    setAlert(true)
      
      return 
    }
   
    const Permid= rd
   
    const t= 'token '+ token
    try {
      const response = await fetch('https://x.versea.co/Clocking/Adduser', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Connection: 'keep-alive',
          'Authorization': t,

        },
        body: JSON.stringify({ Permid}),
      });
     
      

      if (!response.ok) {
        throw new Error('Failed');
      }
      
      console.log('deleted')
      window.location.reload()
    } catch (error) {
      
      console.error('Login error:', error);
    }
  };
  
  useEffect(() =>{
    if (!veiwpermission){
      
      
      return 
    }
    const sd = localStorage.getItem('token');
    setToken(sd)
    
    const handlegetGUIDs= async (e) => {
    
     const t= 'token '+ sd
     console.log(t)
    
     try {
        const response = await fetch('https://x.versea.co/Clocking/Adduser1/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Connection: 'keep-alive',
            'Authorization': t,
  
          },
         
        });
      if (!response.ok) {
        throw new Error('Failed');
      }
      if (response.ok){
      const d = await response.json();
      console.log(d.details,'d1')
      setGUID(d.details)
    }
     
     // setLoading(false);
    } catch (error) {
      setError('Please fill all fields ');
      console.error('Login error:', error);
    }
    
    
  } 
  handlegetGUIDs()},[veiwpermission]
  )
  

    
  const handleFilterChange = (value) => {
    setFilterText(value);
  };
  const handleSortChange = (value) => {
    setSortOption(value);
  };

  //if (loading) {
   // return <p>Loading...</p>;
  //}

let filteredAndSortedProjects = [...GUID];

  // Apply filtering
if (filterText) {
    filteredAndSortedProjects = filteredAndSortedProjects.filter((GUID) =>
    GUID.username.toLowerCase().includes(filterText.toLowerCase())
    );
  }
  
  // Apply sorting
if (sortOption === 'asc') {
    filteredAndSortedProjects.sort((a, b) => {
      const numA = parseFloat(a.username);
      const numB = parseFloat(b.username);
      return numA - numB;
    });
} else if (sortOption === 'desc') {
    filteredAndSortedProjects.sort((a, b) => {
      const numA = parseFloat(a.username);
      const numB = parseFloat(b.username);
      return numB - numA;
    });
  }
   

  return (
    <div>
    <div className="container" style={Mobile?{height:screenSize.height,width:screenSize.width }:null}>
       <Layout>
       <div> {alert?(<Alert className= 'alert' variant="filled" severity="error">You dont Have permission to perform this action </Alert>):null}</div>
        <Back/>
       <div className="table-container">
    
            
              <div className="colm2"><HandleRequest ondatacsv={GUID} permission={permission}  />
              
              <label htmlFor="filter">Filter :</label>
      <input
        type="text"
        id="filter"
        value={filterText}
        onChange={(e) => handleFilterChange(e.target.value)}
        placeholder="Search by User name"
      />

      <label htmlFor="sort">Sort:</label>
      <select id="sort" value={sortOption} onChange={(e) => handleSortChange(e.target.value)}>
        <option value="none">None</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
              

            
              
             
              </div>
              <div className="reportbox"  >
      <div className='scrollable-container1'>
            
            <table className="solid-table">             
            <thead>
              <tr>
              <th  >Permission ID </th>
                <th  >username </th>
                <th >First Name</th>
                <th >Last Name</th>
                <th>Address</th>
                <th >Email</th>
                <th >Project</th>
                <th >Role</th>
                <th >Delete</th>
                <th >Edit Role</th>
                
                </tr>
              
                </thead>
                {loading?( <div className = "loading"></div>):
              
              
                <tbody>
                  {filteredAndSortedProjects.map(item => (
                    <tr key={item.Permid} className="solid-table">
                      <td className="short-url-cell">{item.Permid} </td>
                      <td className="short-url-cell">{item.username} </td>
                    
                      <td className="short-url-cell">{item.first_name}</td>
                      <td className="short-url-cell">{item.last_name}</td>
                      <td className="short-url-cell">{item.address}</td>
                      <td className="short-url-cell">{item.email}</td>
                      <td className="short-url-cell">{item.project}</td>
                      <td className="short-url-cell">{item.role}</td>
                      <td className="short-url-cell">{pressdelete===item.Permid ?(<button onClick={() => handleprodelete(item.Permid)} type="submit"className = "qrbutton">Confirm Delete
                        </button> ):
                        <button onClick = { () => handlepressdelete(item.Permid)}  type="submit"className = "qrbutton">Delete </button>}</td>
                      
                      <td className="short-url-cell"><button onClick={() => Handleedit(item.Permid)} type="submit"className = "qrbutton">Edit
                        </button></td>
                    </tr>
                  ))}
                </tbody>}
                </table>
                </div>
                </div>
                <div className='scrollable-container2'>
        {istick?(
          
            <div className='small-windowuser'> 
            <button onClick={hadnlecloseswindow}>
            <GrClose></GrClose>
              </button> 
              
                  <div >
                  <Edituserform pd = {pid}/>
                  </div>
                  </div>
                 
                  
                ):null
                
                }
                 </div>
 
            </div>
      </Layout>
      </div>
      </div>
  );
 
  
};
export const convertToCSV = (jsonData) => {
  const keys = Object.keys(jsonData[0]);
  const headerRow = keys.join(',') + '\n';

  const dataRows = jsonData.map((item) => {
    const values = keys.map((key) => item[key]);
    return values.join(',');
  });

  return headerRow + dataRows.join('\n');
};


const downloadcsv = (data, filename) => {
    const blob = new Blob([data], { type: 'text/csv' });

  // Generate a URL for the Blob
    const url = URL.createObjectURL(blob);

  // Create a temporary link and trigger the download
    

    //const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(data);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
   
    link.click();
    URL.revokeObjectURL(url);
        };
   

function HandleRequest({ ondatacsv,permission }) {
    const navigate = useNavigate();
    const [alert,setAlert]= useState(false)

    const handleuseradd =() => {
      if (!permission){
        setAlert(true)
          
          return 
        }
      navigate('/dash/adduserform')
    }
  const handleDownload = async () => {
    try {
      
      const csvData = convertToCSV(ondatacsv)
      console.log(csvData)

      // Convert JSON to CSV
     

      
     
      
      
      const fileName = 'data.csv'; // Replace with the desired file name
      
       
      downloadcsv(csvData, fileName);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
     {alert?(<Alert className= 'alert' variant="filled" severity="error">You dont Have permission to perform this action </Alert>):null}
    <div >
      
     <button className="button" onClick={handleuseradd}>Add User</button>
    <button className="button" onClick={handleDownload}>download csv</button>
    </div>
    </div>
    
  );
};


 

export default Adduser;
