import React, { useEffect,useState } from "react";
import jwt from "jsonwebtoken";
import Table from "../components/Table";
import {useNavigate} from 'react-router-dom';
function Dashboard() {
  const navigate = useNavigate();

  const [dataTable, setDataTable] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {

      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        getUserList();
      }
    } else {
      window.location.href = "/login";
    }
  }, []);
  
  const getUserList = async () => {
    const req = await fetch("http://localhost:1337/api/userList", {
      headers: { 
        "content-type": "application/json",
        "x-access-token": localStorage.getItem("token") },
    });
    const data = await req.json();
    if(data.status === "ok"){
  

      setDataTable(data.userList);
    }else{
      alert(data.error)
    }
  };
  const column = [
    { heading: 'Name', value: 'name' },
    { heading: 'Email', value: 'email' },
    { heading: 'Address', value: 'address' },
    { heading: 'Birthday', value: 'birthdate' },
    { heading: 'Entrance Date', value: 'entranceDate' },


  ]

  return (
    <div className="App padding ">
      <h1>Club Members</h1>

      <Table data={dataTable ?? []} column={column} navigate={navigate}/>
    </div>
  );
}


export default Dashboard;
