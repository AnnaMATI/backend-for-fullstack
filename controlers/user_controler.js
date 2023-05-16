const Sequelize = require('sequelize');
const DataTypes = require('sequelize')
const sequelize = new Sequelize('mydb',null,null,{dialect:'sqlite',storage:'database.db'});
const jwt_generate = require("../jwt/generate")
const { User } = require('../models/user');
const {Users} = require("./index");
const  CryptoJS=require ("crypto-js")
const {generateAccessToken}= require("../middlware/generateaccsestoken")
const{checkAdmin}=require("../adminpage/checkadmin")

    function register(req, res){
      const password = req.body.password;
      const email=req.body.email;
      const name=req.body.name
      const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]{2,}$/
        if(!emailRegex.test(email)){
            return res.status(400).json({error:"Invalid email format"})
        }
        Users.findOne({where:{email:email}}).then((user)=>{
            if(user){
                return res.status(400).json({error:"Email already exists"})
            }
            const hashed_password = CryptoJS.SHA256(password).toString();
            Users.create({name,password:hashed_password,email, role:0}).then((data)=>{
              
                res.status(201).json(data)
            }).catch((err)=>{
                res.status(500).json({error:err.message})
            })
          })}


       async      function changeUserRole(req, res) {
          const { email , role } = req.body;
          try {
            const user = await Users.findOne({ where: { email } })
            .then(user => {
              if (!user) {
                throw new Error(`User ${email} not found`);
              }
              return user;
            });
            user.update({ role })
            .then(updatedUser => {
              // send response
              res.status(201).json(updatedUser);
            })
          } 
           catch (error) {
            console.log(error)
            res.status(400).json({error})
          }}


function loginUser (req, res){
  const email = req.body.email;
  const password =req.body.password;
  const hashed_password = CryptoJS.SHA256(password).toString();
  Users.findOne({
      where: {
       email:email
      }
  }).then(async (Users)=> {
      if (email===Users.email && hashed_password){
          const token = generateAccessToken(Users.email,Users.role);
          res.send(JSON.stringify({status: "Logged in", jwt:token, role:Users.role}));
      }else {
          return res.status(400).send("Invalid password");
      }
  }).catch((err)=> {
      res.status(500).json({error: err.message})
  })
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Delete an existing user by ID
const deleteUser = async (req, res) => {
  const isAdmin = checkAdmin(req, res);
  if(isAdmin){
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}};

module.exports = {
  loginUser,
  getAllUsers,
  getUserById,
  deleteUser,
 register,
 changeUserRole
};
