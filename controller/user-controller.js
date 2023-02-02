const {userModel , bookModel} = require("../models")


//export. function name means we are creating and exporting function from these line.
exports.getAllUsers = async (req,res)=>
{
    const users = await userModel.find();
    res.status(200).json({
    success : true,
    data : users
  })
};

exports.getUserById = async (req,res)=>
{
  const {id} = req.params;
  const user = await userModel.findById(id);
  if (!user)
  {
    return res.status(404).json({
        success : false,
        message : "Please enter a valid user id"
      })  
  }
  return res.status(200).json({
    success : true,
    data : user
  })
};

exports.updateUser = async(req, res)=>
{
  const { id } = req.params;
  const { data } = req.body;

  const updatedUserData = await userModel.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        ...data,
      },
    },
    {
      new: true,
    }
  );

  return res.status(200).json({
    success: true,
    data: updatedUserData,
  });
}

exports.createUser =  async (req, res) => {
  const { name, surname, email, subscriptionType, subscriptionDate } = req.body;
  const newUser = await userModel.create({
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });

  return res.status(201).json({
    success: true,
    data: newUser,
  });
};

exports.deleteUser = (req, res)=>
{
  const {id} = req.params;
  const user = userModel.findByIdAndDelete(id);
  if (!user)
  {
    return res.status(404).json({
        success : false,
        message : "Please enter a valid user id"
      })  
  }
  return res.status(201).json({
    success : true,
    message : "Successfully Deleted"
  })
}

exports.getSubcriptionDetails = async (req, res) => {
  const { id } = req.params;

  const user = await userModel.findById(id);

  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      // current data
      date = new Date();
    } else {
      // getting date on basics of variable
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if (user.subscriptionType === "Basic") {
      date = date + 90;
    } else if (user.subscriptionType === "Standard") {
      date = date + 180;
    } else if (user.subscriptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };
  // subscription calc here
  // Jan 1, 1970
  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  const data = {
    ...user,
    subscriptionExpired: subscriptionExpiration < currentDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : subscriptionExpiration - currentDate,
    fine:
      returnDate < currentDate
        ? subscriptionExpiration <= currentDate
          ? 200
          : 100
        : 0,
  };
  return res.status(200).json({ success: true, data });
};