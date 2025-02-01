export const Specificdelete = (item, deleteFunction) => {

  if (item === 0 || item === null){
    deleteFunction(0);
    return;
  }
  if (!item || !item.orderdata) {
    deleteFunction(item.Blockid);
    return;
  }

  if (item.orderdata.length === 0) {
   
    deleteFunction(item.Blockid);
    return;
  }
  else {
    alert("This block contains order data. Are you sure you want to delete it?");
    
    
  }
}


export const handleexchangerequest = async (type, payload, endpoint) => {


  const sdd = localStorage.getItem("token");
  console.log(payload)
  try {
    const t = "token " + sdd;

    if (type === "POST") {
      const response = await fetch("http://3.111.155.182:8000/" + endpoint, {
        method: type,
        headers: {
          "Content-Type": "application/json",
          Authorization: t,
        },
        body: payload,
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const datastr = await response.json();
      return datastr.message
      console.log(datastr);
      
    }
    if (type === "PUT") {
      const response = await fetch("http://3.111.155.182:8000/" + endpoint, {
        method: type,
        headers: {
          "Content-Type": "application/json",
          Authorization: t,
        },
        body: payload,
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const datastr = await response.json();

      return datastr.message

      console.log(data);

    }

    if (type === "GET" || "DELETE") {
      const response = await fetch(
        "http://3.111.155.182:8000/" + endpoint +"?"+ payload,
        {
          method: type,
          headers: {  
            "Content-Type": "application/json",
            Authorization: t,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const datastr = await response.json();

      return  datastr.message

      
    }

    // if (!response.ok) {
    //   throw new Error('Login failed');
    // }
    // const data = await response.json()
  } catch (error) {
    console.error("INIT error:", error);
    return  false

  }

  // Reset the form after submission
};