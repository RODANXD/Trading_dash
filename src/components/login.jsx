import React, { useState} from 'react';
// import    '../style/botstyle.css';
import { useNavigate  } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();
  const navigate = useNavigate();
  const onback = () =>{
       navigate('/')
}

 

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://52.66.78.108:8000/login', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         
         
          
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json()

      
      
      
     
      
      // Login successful, perform further actions (e.g., redirect to a different page)
      console.log('Login successful');
      const token = data.message.token
      const id = data.id
      //const status = data.message.ClientStatus
      
      
        
      localStorage.setItem('token',token)
           

      history('/home');

      
    } catch (error) {
      setError('Invalid username or password');
      console.error('Login error:', error);
    }

    // Reset the form after submission
    setUsername('');
    setPassword('');
  };
   

  return (
    <div>
            
    <div className="login-container">
   
    <h1>Login</h1>
    <form className="login-form">
      <label >Username</label>
      <input type="text"   value={username} onChange={handleUsernameChange}  required/>

      <label >Password</label>
      <input type="password"   value={password} onChange={handlePasswordChange} required />

      <button type="submit" onClick= {handleSubmit}>Log in</button>
      
    </form>
   
    {error?(<p>{error}</p>):(<p></p>)}
    </div>
    </div>
    
   

  );
 
  
};

 

export default LoginPage;

