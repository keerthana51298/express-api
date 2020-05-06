const express = require('express')
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express()
const port = 3000
let books =[{
    "isbn":"9781593275846",
    "title":"Eloquent JavaScript,Second Edition",
    "author":"Marijn Haverbeke",
    "publish_date":"2014-12-14",
    "publisher":"No Starch press",
    "numOfPages":472,
},
{
    "isbn":"97814493231818",
    "title":"Learning JavaScript Design Pattern",
    "author":"Addy Osmani",
    "publish_date":"2012-07-01",
    "publisher":"O'Reilly Media",
    "numOfPages":254,
},
{
    "isbn":"123",
    "title":"Eloquent JavaScript,First Edition",
    "author":"Marijn Haverbekesd",
    "publish_date":"2014-11-18",
    "publisher":" Starch press",
    "numOfPages":475,

}];
app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.get('/book',(req,res)=>{
 res.json(books);
});
app.post('/book',(req,res)=>{
    const book = req.body;
    console.log(book);
    books.push(book);
    res.send('Book is added to the database');
});
app.get('/book/:isbn',(req,res)=>{
    const isbn=req.params.isbn;

    for(let book of books){
        if (book.isbn===isbn){
            res.json(book);
            return ;
        }
    }
    res.status(404).send('Book not found');
});
app.put('/book/:isbn',(req,res)=>{
    const isbn = req.params.isbn;
    const newBook = req.body;
    for(let i=0;i<books.length;i++){
        let book=books[i]
        if(book.isbn===isbn){
            books[i]=newBook;
        }
    }
});
app.delete('/book/:isbn',(req,res)=>{
    const isbn = req.params.isbn;
    books=books.filter(i=>{
        if(i.isbn !== isbn){
            return true;
        }
        return false;
    });
    res.send('Book is deleted');
});
app.listen(port,()=>
 console.log(`Hello world listening on port${port}!`));
