import { useState } from "react";
import { useEffect } from "react";
import jwt from 'jsonwebtoken'
import FlashMessage from 'react-flash-message'
function CreateUser() {
  const [visible, setVisible] = useState({bool: false,msg:'',type:''})
  const [handleForm, setHandleForm] = useState({
    name: "",
    email: "",
    address: "",
    birthdate: "",
    entranceDate: new Date().toLocaleDateString("en-CA"),
  })
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {

      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
       
      }
    } else {
      window.location.href = "/login";
    }
  }, []);
  const registerUser = async (event) => { 
    event.preventDefault();
    const response = await fetch("http://localhost:1337/api/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(handleForm)
   }
  )
    const data = await response.json();
    if(data.status === "ok"){
      setVisible({bool:true,msg:'User created successfully',type:'success'})
      setHandleForm({ name: "", email: "", address: "", birthdate: "",})
    }else{
      setVisible({bool:true,msg:data.error,type:'error'})
    }
    setTimeout(()=>{
      
      setVisible({bool:false,msg:"",type:''})
} ,5000)}
  return (
    <div className="padding App">
      
      <h1>Create Member</h1>
     
      <form onSubmit={registerUser}>
        <input type="text" placeholder="Name"
        value={handleForm.name}
        onChange={(e)=>{
          setHandleForm({...handleForm, name: e.target.value})
        }} 
        />
        <br />
        <input type="email" placeholder="Email" 
           value={handleForm.email}
           onChange={(e)=>{
             setHandleForm({...handleForm, email: e.target.value})
           }}
        />
        <br />
        <input type="text" placeholder="Address" 
           value={handleForm.address}
           onChange={(e)=>{
             setHandleForm({...handleForm, address: e.target.value})
           }}
        />
        <br />
        <input type="date"  placeholder="Birthdate" 
           value={handleForm.birthdate}
           onChange={(e)=>{
             setHandleForm({...handleForm, birthdate: e.target.value})
           }}
        />
  
     
                <br />

        <input 
        className="button"
        type={"submit"} value="Create Member" />
          {visible.bool &&  
        <div>
            <FlashMessage duration={5000}>
                <strong style={{color:visible.type === 'error' ? 'red' :'green'}}>{visible.msg}</strong>
            </FlashMessage>
        </div>
   }
      </form>
    
    </div>
  );
}

export default CreateUser;




