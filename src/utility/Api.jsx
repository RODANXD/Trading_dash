export const Specificdelete = (All,item,blockid, deleteFunction) => {

  if (All){
    let totalLength=0
    item.forEach(keys => {
      if (keys.orderdata) {
        totalLength += keys.orderdata.length;
      }
    });
    if (totalLength<1){
    deleteFunction(0);}
    else {
      alert("Please exit the open position to delete block ");

    }
    console.log('you are all delete')
    return;

  }
  else if (item === 0 && !All) {
    console.log('you are not all delete')
   
    deleteFunction(blockid);
    return;
  }
  else {
    alert("Please exit the open position to delete block ");
    
    
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