const express = require("express");
const cors = require("cors");
const User = require("./models/user.model");
const Admin = require("./models/admin.model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "Your database connection url here"
);
app.post("/api/deleteUser", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if(user){
      await User.deleteOne({ email: req.body.email });
      res.json({status:'ok', message: "user deleted" });
    }
    else{
      res.json({status:'error',error:'user not found'});
    }
  } catch (error) {
    res.json({ status: "error" ,error});
  }
})
app.post("/api/updateUserInfo", async (req, res) => {
  try {
    const { name, email, address, birthdate, entranceDate } =
      req.body;
      // Store hash in your password DB.
      
      if (
        name !== "" &&
        email !== "" &&
        address !== "" &&
        birthdate !== "" &&
        entranceDate !== ""
      ) {
        User.findOneAndUpdate({email:email},{name,email,address,birthdate,entranceDate},function(error,result){
          if(error){

            res.json({status:'error',error:error});
          }else{
            res.json({status:'ok',user:result});
          }
        });
      } else {
        res.json({ status: "error", error: "Please fill all the fields" });
      }
     
    }

  
   catch (error) {
    res.json({ status: "error", error: "Duplicate Email" });
  }
});
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, address, birthdate, entranceDate } =
      req.body;
      // Store hash in your password DB.
      const user = await User.findOne({ email });

      if (
        !user &&
        name !== "" &&
        email !== "" &&
        address !== "" &&
        birthdate !== "" &&
        entranceDate !== ""
      ) {
        await User.create({
          name,
          email,
          address,
          birthdate,
          entranceDate,
        });
        res.json({ status: "ok", error: "User created successfully" });
      } else {
        user ? res.json({ status: "error", error: "User already exists" }):
        res.json({ status: "error", error: "Please fill all the fields" });
      }
  
  } catch (error) {
    res.json({ status: "error", error: "Duplicate Email" });
  }
});
app.post("/api/registeradmin", async (req, res) => {
  try {
    const { email,password} =
      req.body;
      // Store hash in your password DB.
      const user = await User.findOne({ email });

      if (
        email !== "" &&
        password !== ""
      ) {
        bcrypt.hash(password, 10,async (err, hash) => {
          if (err) {
            res.json({ status: "error", error: "Error while hashing password" });

          } else {

             await Admin.create({
        email,
        password:hash
      })
          }
           ;
      res.json({ status: "ok", error: "User created successfully" });
        })
      
      } else {
        user ? res.json({ status: "error", error: "User already exists" }):
        res.json({ status: "error", error: "Please fill all the fields" });
      }
  
  } catch (error) {
    res.json({ status: "error", error: error });
  }
});
app.post("/api/loginadmin", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (admin) {
    bcrypt.compare(password, admin.password, function (err, result) {
      if (result) {
        const token = jwt.sign(
          { name: admin.email },
          "secret123"
        );
        res.json({ status: "ok", user: token });
      } else {
        res.json({ status: "error", error: "Wrong Password" });
      }
      // result == true
    });
  } else res.json({ status: "ok", user: false });
});



app.get("/api/userList", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.name;
    const user = await Admin.findOne({ email });
    if (user) {
      User.find({}).then(function (users) {
        return res.json({ status: "ok", userList: users });
      });
    }
  } catch (error) {
    res.json({ status: "error", error: "Invalid Token" });
  }
});
const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
