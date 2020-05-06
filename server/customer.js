const express = require('express')
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express()
const port = 3000
let customers =[{
    "customer_name":"keerthana",
    "id":"101",
    "customer_number":"9876543210",
    "Location":"kodungaiyur",
    "Address":"xyz...."
},
{
    "customer_name":"Revathy",
    "id":"102",
    "customer_number":"9876548310",
    "Location":"mint",
    "Address":"Abc...."  
},
{
    "customer_name":"Arockia",
    "id":"103",
    "customer_number":"9976522110",
    "Location":"sowcarpet",
    "Address":"Uvw...."
},
{
    "customer_name":"prathu",
    "id":"104",
    "customer_number":"980983210",
    "Location":"maharani",
    "Address":"Ijk...."
},
{
    "customer_name":"sandy",
    "id":"105",
    "customer_number":"98765403948",
    "Location":"Broadway",
    "Address":"Pqr...."
}];
app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.get('/customer',(req,res)=>{
 res.json(customers);
});
app.post('/customer',(req,res)=>{
    const customer = req.body;
    console.log(customer);
    customers.push(customer);
    res.send('customer is added to the database');
});
app.get('/customer/:id',(req,res)=>{
    const id=req.params.id;

    for(let customer of customers){
        if (customer.id===id){
            res.json(customer);
            return ;
        }
    }
    res.status(404).send('customer not found');
});
app.put('/customer/:id',(req,res)=>{
    const id = req.params.id;
    const newCustomer = req.body;
    for(let i=0;i<customers.length;i++){
        let customer=customers[i]
        if(customer.id===id){
            customers[i]=newCustomer;
        }
    }
});
app.delete('/customer/:id',(req,res)=>{
    const id = req.params.id;
    customers=customers.filter(i=>{
        if(i.id !== id){
            return true;
        }
        return false;
    });
    res.send('customer is deleted');
});
app.listen(port,()=>
 console.log(`Hello world listening on port${port}!`));

