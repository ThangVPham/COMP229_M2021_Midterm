//Author: Thang Pham
//ID: 300940831
//WebApp Name: Book Store
//---------------------------------------------

// modules required for routing
import express from 'express';
const router = express.Router();
export default router;

// define the book model
import book from '../Models/books';

/* GET books list page. READ */
router.get('/', (req, res, next) => 
{
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        page: 'books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

     res.render('books/details', { title: 'Add', page: 'details', books: ''});
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    let newBook = new book
    ({
      "Title": req.body.Title,
      "Description": req.body.Description,
      "Price": req.body.Price,
      "Author": req.body.Author,
      "Genre": req.body.Genre,
    });

    book.create(newBook, (err)=>{
      if(err)
      {
        console.error(err);
        res.end(err);
      }
      
      res.redirect('/books');
    });

});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {

    let id = req.params.id;
    book.findById(id, {}, {}, (err, bookItemToEdit) => 
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        // show the edit view
        res.render('books/details', { title: 'Edit', page: 'details', books: bookItemToEdit});
    });
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {


     let id = req.params.id;

     // instantiate a new Book Item
     let updatedBookItem = new book
     ({
      "_id": id,
       "Title": req.body.Title,
      "Description": req.body.Description,
      "Price": req.body.Price,
      "Author": req.body.Author,
      "Genre": req.body.Genre,
     });
   
     book.updateOne({_id: id}, updatedBookItem, {}, (err) =>{
       if(err)
       {
         console.error(err);
         res.end(err);
       }
   
       res.redirect('/books');
     });
});

// GET - process the delete by book id
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;

  book.remove({_id: id}, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }
    res.redirect('/books');
  });
});

