const {userModel , bookModel} = require("../models")
const IssuedBook = require("../dtos/book-dto");

exports.getAllBooks= async (req,res)=>
{
    const books= await bookModel.find();
    res.status(200).json({
        success : true,
        data : books
    })
}

exports.getSingleBookById =async (req, res)=>
{
    const {id}= req.params;
    const book = await bookModel.findById(id);
    if(!book)
    {
        res.status(404).json({
            success : false,
            message : "Please enter the valid book id"
        })
    }
    res.status(200).json({
        success : true,
        message : book
    })
}

exports.getAllIssuedBooks = async (req,res)=>
{
    const users = await bookModel.find({
        issuedBook: { $exists: true },
      }).populate("issuedBook");
    
      const issuedBooks = users.map((each) => new IssuedBook(each));
    
      if (issuedBooks.length === 0)
        return res
          .status(404)
          .json({ success: false, message: "No booke has been issued" });
    
      return res.status(200).json({ success: true, data: issuedBooks });

}

exports.addNewBook = async (req, res)=>
{
    const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No Data Was Provided",
    });
  }

  await bookModel.create(data);

  const allBooks = await bookModel.find();

  return res.status(200).json({
    success: true,
    data: allBooks,
  });
}

exports.updateBookById = async (req, res)=>{
    {
        const { id } = req.params;
        const { data } = req.body;

         const updatedBook = await bookModel.findOneAndUpdate({ _id: id }, data, {
             new: true,
         });
  return res.status(200).json({
    success: true,
    data: updatedBook,
  });
}
}