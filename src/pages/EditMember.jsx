import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Table from "../components/Table";
import { useLocation, useNavigate } from "react-router-dom";
import FlashMessage from "react-flash-message";

function Dashboard() {
  const navigate = useNavigate();
  const route = useLocation();
  const [dataTable, setDataTable] = useState([]);
  const [visible, setVisible] = useState({ bool: false, msg: "", type: "" });
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
  useEffect(() => {
    setHandleForm(route?.state?.user);
  }, [route]);
  const [handleForm, setHandleForm] = useState(route?.state?.user ?? null);
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
        "x-access-token": localStorage.getItem("token"),
      },
    });
    console.log("user list calisti");
    const data = await req.json();
    if (data.status === "ok") {

      setDataTable(data.userList);
    } else {
      alert(data.error);
    }
  };
  const column = [
    { heading: "Name", value: "name" },
    { heading: "Email", value: "email" },
    { heading: "Address", value: "address" },
    { heading: "Birthday", value: "birthdate" },
    { heading: "Entrance Date", value: "entranceDate" },
    { heading: "Actions", value: "btns" },
  ];
  const updatUserInfo = async (event) => { 
    event.preventDefault();
    const response = await fetch("http://localhost:1337/api/updateUserInfo", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(handleForm)
   }
  )
    const data = await response.json();
    if(data.status === "ok"){
      setVisible({bool:true,msg:'User updated successfully',type:'success'})
      getUserList();
      setHandleForm(null)

    }else{
      setVisible({bool:true,msg:data.error,type:'error'})
    }
    setTimeout(()=>{
      
      setVisible({bool:false,msg:"",type:''})
} ,5000)}
const deleteMember =async (email) => { 
  if (window.confirm("Are you sure you want to delete this member?")
  == true) {
    const response = fetch("http://localhost:1337/api/deleteUser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})
    })
    const data = await response;
    if(data.ok){
      setVisible({bool:true,msg:'User deleted successfully',type:'success'})
      getUserList();
      setHandleForm(null)
  
    }else{
      setVisible({bool:true,msg:data.error,type:'error'})
    }
    setTimeout(()=>{
      
      setVisible({bool:false,msg:"",type:''})
  } ,4000)
  } 

 }
  if (handleForm) {
    return (
      <div className="padding App">
        <h1>Create Member</h1>

        <form onSubmit={updatUserInfo}>
          <input
            type="text"
            placeholder="Name"
            value={handleForm.name}
            onChange={(e) => {
              setHandleForm({ ...handleForm, name: e.target.value });
            }}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            value={handleForm.email}
            onChange={(e) => {
              setHandleForm({ ...handleForm, email: e.target.value });
            }}
          />
          <br />
          <input
            type="text"
            placeholder="Address"
            value={handleForm.address}
            onChange={(e) => {
              setHandleForm({ ...handleForm, address: e.target.value });
            }}
          />
          <br />
          <input
            type="date"
            placeholder="Birthdate"
            value={new Date(handleForm.birthdate).toISOString().split("T")[0]}
            onChange={(e) => {
              setHandleForm({ ...handleForm, birthdate: e.target.value });
            }}
          />

          <br />

          <input className="button" type={"submit"} value="Create Member" />
          {visible.bool && (
            <div>
              <FlashMessage duration={5000}>
                <strong
                  style={{ color: visible.type === "error" ? "red" : "green" }}
                >
                  {visible.msg}
                </strong>
              </FlashMessage>
            </div>
          )}
        </form>
      </div>
    );
  }else{
  return (
    <div className="App padding ">
      <h1>Club Members</h1>

      <Table data={dataTable ?? []} column={column} navigate={navigate} deleteMember={deleteMember} />
    </div>
  );
}
}
export default Dashboard;
