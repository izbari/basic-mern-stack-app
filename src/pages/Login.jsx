import { useState } from "react";
import '../app.css';
function Login() {
  const [handleForm, setHandleForm] = useState({
    email: "",
    password: "",
  });
  const loginAdmin = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:1337/api/loginadmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(handleForm),
    });
    const data = await response.json();
    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("Login Successful");
      window.location.replace("/dashboard");
    } else alert("Please check your username and password");
  };
  return (

    <div style={{alignItems:'center',backgroundColor:'lavender',justifyContent:'center',paddingTop:100}}>
      <h1 style={{fontSize:36,marginBottom:20}}>Admin Paneli</h1>
      <form 
      className="form"
      onSubmit={loginAdmin}>
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={handleForm.email}
          onChange={(e) => {
            setHandleForm({ ...handleForm, email: e.target.value });
          }}
        />
        <br />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={handleForm.password}
          onChange={(e) => {
            setHandleForm({ ...handleForm, password: e.target.value });
          }}
        />
        <br />

        <input
        className="button"
        type={"submit"} value="Login" />
      </form>
    </div>

  );
}

export default Login;
