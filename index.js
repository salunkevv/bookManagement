//importing db
const dotenv = require("dotenv")

//importing dbconnection file
const dbconnection = require("./databaseConnection");

//importing index file from module folder
const {userModal , bookModal} = require("./models")

//configure the db
dotenv.config();

const express = require('express')
const  bookdata = require("./data/book.json")
const app = express()
dbconnection();
const port = 3000
app.use(express.json())


//importing the routes
const userRouter = require("./routes/users")
const bookRouter = require("./routes/books")

app.use("/users", userRouter)
app.use("/books", bookRouter)






app.listen(port, ()=>
{
  console.log(`we are running in port ${port}`);
})