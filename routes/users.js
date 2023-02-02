const express = require('express')
const { users } = require("../data/user.json")
const {getAllUsers , getUserById, updateUser, createUser, deleteUser, getSubcriptionDetails}= require("../controller/user-controller")
const router = express.Router();
const {userModal , bookModal} = require("../models")


// ********************* for route GET : "/users" ------> To get all users
// router.get("/", (req,res)=>
// {
//   res.status(200).json({
//     success : true,
//     data : users
//   })
// })
router.get("/",getAllUsers)

//*********************** for route GET : "/users/:id"----------> To get user by their id

// router.get("/:id" , (req,res)=>
// {
//   const {id} = req.params;
//   const user = users.find((each)=> each.id === id)
//   if (!user)
//   {
//     return res.status(404).json({
//         success : false,
//         message : "Please enter a valid user id"
//       })  
//   }
//   return res.status(200).json({
//     success : true,
//     data : user
//   })
// })
router.get("/:id ", getUserById)

//*********************** for route POST : "/users" -----------> To add a new user to list

// router.post("/", (req, res)=>
// {
//   const {id} = req.body;
//   const { name , surname , email,subscriptionType,subscriptionDate}= req.body;
//   const user = users.find((each)=> each.id === id)
//   if (user)
//   {
//     return res.status(404).json({
//         success : false,
//         message : "User is already exist"
//       })  
//   }
//   users.push({
//     id,
//     name,
//     surname,
//     email,
//     subscriptionDate,
//     subscriptionType
//   }
//   )
 
//   return res.status(200).json({
//     success : true,
//     data : users
//   })
// })

router.post("/",createUser)

//************************ for route PUT : ("/users/:id") -----------> To update the user by their id

// router.put("/:id", (req, res)=>
// {
//   const {id} = req.params;
//   const {data}= req.body;
//   const user = users.find((each)=> each.id === id)
//   if (!user)
//   {
//     return res.status(404).json({
//         success : false,
//         message : "Please enter a valid user id"
//       })  
//   }
//   const { name , surname , email,subscriptionType,subscriptionDate}= req.body;
//   user.name = name;
//   user.email=email;
//   user.id = id;
//   user.surname= surname;
//   user.subscriptionDate= subscriptionDate;
//   user.subscriptionType =subscriptionType
  
//   // const updateduser = users.map((each)=>
//   // {
//   //   if(each.id === id )
//   //   {
//   //     return {
//   //       ...each,
//   //       ...data
//   //     }
//   //   }else{
//   //   return each;}
//   // });
//   return res.status(200).json({
//     success : true,
//     data : users
//   })
// })

router.put("/id", updateUser)

//************************ for route DELETE : ("users/id")----------> To delete the user by their id

// router.delete("/:id", (req, res)=>
// {
//   const {id} = req.params;
//   const user = users.find((each)=> each.id === id)
//   if (!user)
//   {
//     return res.status(404).json({
//         success : false,
//         message : "Please enter a valid user id"
//       })  
//   }
//   const index = users.indexOf(user)
//   users.splice(index ,1);
//   return res.status(201).json({
//     success : true,
//     message : users
//   })
// })
router.delete("/:id", deleteUser)

// for route GET : ("/users/subscription-deatil/:id")

// router.get("/subscription/detail/:id", (req, res)=>
// {
//   const {id} = req.params;
//   const user = users.find((each)=> each.id === id)
//   if (!user)
//   {
//     return res.status(404).json({
//         success : false,
//         message : "Please enter a valid user id"
//       })  
//   }
//   const getDateInDays = (data=" ")=>
//   {
//     let date;
//     if(data == " ")
//     {
//       date = new Date()
//     }
//     else
//     {
//       date = new Date(data)
//     }
//     let days = Math.floor(date/(1000 * 60 * 60 * 24))
//     return days;
//   }
//   const subscriptionType = (date)=>
//   {
//     if(user.subscriptionType === "Basic")
//     {
//       date = date + 90;
//     } else if(user.subscriptionType === "Standard")
//     {
//       date = date + 180;
//     } else if(user.subscriptionType === "Premiun")
//     {
//       date = date + 365;
//     } 
//     return date ;
//   }
//   let returnDate = getDateInDays(user.returnDate);
//   let currenDate = getDateInDays();
//   let subscriptionDate = getDateInDays(user.subscriptionDate);
//   let subscriptionDays = subscriptionType(subscriptionDate);

//   const data = {
//     ...user,
//     SubscriptionExpires : subscriptionDate < currenDate ,
//     SubscriptionLeftFor : subscriptionDate <= currenDate ? 0 : subscriptionDays - currenDate  
//   }
//   res.status(200).json({
//     success : true ,
//     data : data
//   })
// })
router.get("/subscription/detail/:id",getSubcriptionDetails)


module.exports = router;