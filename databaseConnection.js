const mongoose = require("mongoose");

function dbConnection () { 
    const dbUrl = process.env.MONGO_URL;
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    
      const db = mongoose.connection;
    
      db.on("error", console.error.bind("Connection error"));
      db.once("open", function () {
        console.log("Successfully connected to DB....!!");
      });
}

module.exports = dbConnection;