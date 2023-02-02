const express = require('express');
const { getAllBooks, getSingleBookById,getAllIssuedBooks,addNewBook, updateBookById } = require('../controller/book-controller');
const { books } = require("../data/book.json")
const {users} = require("../data/user.json")
const {userModel , bookModel} = require("../models");
const { route } = require('./users');
const router = express.Router();

// for route GET : ("/books")--------> To get all books
// router.get("/", (req,res)=>
// {
//   res.status(200).json({
//     success : true,
//     data : books
//   })
// })
router.get("/",getAllBooks)

// for route GET : ("/books/:id") ------------> To get the book by their id

// router.get("/:id", (req, res)=>
// {
//     const {id}= req.params;
//     const book = books.find((each) => each.id === id)
//     if(!book)
//     {
//         res.status(404).json({
//             success : false,
//             message : "Please enter the valid book id"
//         })
//     }
//     res.status(200).json({
//         success : true,
//         message : book
//     })
// })
router.get("/:id",getSingleBookById)

// for route POST : ("/books") ------------> To add books in the list 

// router.post("/", (req, res)=>
// {
//     const {id}= req.body;
//     const book = books.find((each) => each.id === id)
//     if(book)
//     {
//         res.status(404).json({
//             success : false,
//             message : "Please enter the valid book id"
//         })
//     }
//     const {name , author , price, publisher} = req.body;
//     books.push({
//         id,
//         name,
//         price,
//         author,
//         publisher
//     })
//     res.status(200).json({
//         success : true,
//         data : books
//     })
// })
router.post("/",addNewBook)


// for route PUT : ("/books/id")-----------> To update book details by their id

// router.put("/:id", (req, res)=>
// {
//     const {id}= req.params;
//     const {body}= req.body;
//     const book = books.find((each) => each.id === id)
//     if(!book)
//     {
//         res.status(404).json({
//             success : false,
//             message : "Please enter the valid book id"
//         })
//     }
//     // const updateddata= books.map((each)=>
//     // {
//     //     if(each.id === id)
//     //     {
//     //         return {
//     //             ...each,
//     //             ...body
//     //         }
//     //     }
//     //     return each;
//     // })

//     const {name , author , price, publisher} = req.body;
//     book.name = name,
//     book.author= author,
//     book.price = price,
//     book.publisher = publisher 
//     res.status(200).json({
//         success: true,
//         data : books
//     })
// })
router.put("/:id", updateBookById);

// for route DELETE : ("/books/id") --------------> Delete the book by their id

router.delete("/:id", (req,res)=>
{
    const {id}= req.params;
    const book = books.find((each) => each.id === id)
    if(!book)
    {
        res.status(404).json({
            success : false,
            message : "Please enter the valid book id"
        })
    }
    const index = books.indexOf(book);
    books.splice(index,1)
    {
        res.status(200).json({
            success : true,
            data : books
        })
    }
})

// for rout GET : ("/books/issued/byuser")---------------> To get all issued book
//  router.get("/issued/byuser", (req,res)=>
// {
//     const issuedbook= users.filter((each)=> 
//     {
//         if(each.issuedBook)
//         {
//             return each
//         }
//     });
//     const userwithbook =[];

//     issuedbook.forEach((each)=>
//     {
//         const book = books.find((index)=> index.id === each.issuedBook)

//         book.issuedUser = each.name;
//         book.issuedDate = each.issuedDate;
//         book.returnDate = each.returnDate
//         userwithbook.push(book)
//     })
//     res.status(200).json({
//         success : true,
//         data : userwithbook
//     })

// })
router.get("/issued/byuser", getAllIssuedBooks)

// for route GET : ("/books/issued/fine")----------------> To get all books with fine

router.get("/issued/fine", (req, res)=>
{
    const userwithfine = users.filter((each)=> {
        if (each.issuedBook)
        {
            return each
        }
    })
    const bookwithfine =[];
    userwithfine.forEach((each)=>
    {
        const d = new Date(each.returnDate)
        // const day = d.getDate();
        // const month = d.getMonth();
        // const year = d.getFullYear();

        const currenDate = new Date ()
        // const currentDat = currenDate.getDate();
        // const currentMonth= currenDate.getMonth();
        // const currentYear = currenDate.getFullYear();
        if(d < currenDate)
        {
            const book = books.find((index)=> index.id === each.issuedBook)
            book.issuedUser =each.name;
            book.fineStatus = "U will be charged with fines " 
            bookwithfine.push(book)
        }
    })
    res.status(200).json({
        success : true,
        message : bookwithfine
    })
})

module.exports = router;