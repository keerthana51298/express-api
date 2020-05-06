const express = require('express')
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express()
const port = 3000
let products =[{
    "id":"101",
    "name":"chocolate",
    "manu":"cadbury",
    "manu_date":"2014-12-14",
    "exp_date":"2015-11-15",
    "Barcode":472,
},
{
    "id":"102",
    "name":"chips",
    "manu":"lays",
    "manu_date":"2015-12-20",
    "exp_date":"2016-11-25",
    "Barcode":473,
},
{
    "id":"103",
    "name":"juice",
    "manu":"orange",
    "manu_date":"2017-12-24",
    "exp_date":"2018-11-30",
    "Barcode":474,
}];
app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.get('/product',(req,res)=>{
 res.json(products);
});
app.post('/product',(req,res)=>{
    const product = req.body;
    console.log(product);
    products.push(product);
    res.send('product is added to the database');
});
app.get('/product/:id',(req,res)=>{
    const id=req.params.id;

    for(let product of products){
        if (product.id===id){
            res.json(product);
            return ;
        }
    }
    res.status(404).send('product not found');
});
app.put('/product/:id',(req,res)=>{
    const id = req.params.id;
    const newproduct = req.body;
    for(let i=0;i<products.length;i++){
        let product=products[i]
        if(product.id===id){
            products[i]=newproduct;
        }
    }
});
app.delete('/product/:id',(req,res)=>{
    const id = req.params.id;
    products=products.filter(i=>{
        if(i.id !== id){
            return true;
        }
        return false;
    });
    res.send('product is deleted');
});
app.listen(port,()=>
 console.log(`Hello world listening on port${port}!`));
