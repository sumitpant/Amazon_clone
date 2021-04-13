const SECRET_KEY='sk_test_51IfSoESBe8g8j7vzzRjEIPnO6ae90pTQk8GqFLozsHVYGwNyS312HSKe3A20xFJIiQVQjFIinbVe5tUNWwzJUNfV006PrN4Q8k'
const functions = require("firebase-functions");
const express=require("express");
const cors=require("cors")
const stripe=require("stripe")(SECRET_KEY);


//App Config
const app=express();
//Middlewares
app.use(cors({origin:true}));
app.use(express.json());




//API routes
app.get('/',(req,res)=>{
    res.status(200).send("hello World")
})
//http://localhost:3000/payments/create?total=2999 
app.post('/payments/create',async(req,res)=>{
    const total=req.query.total;
    console.log('Payment Request recieved',total);
    try{
    const paymentIntent=await stripe.paymentIntents.create({
        amount:total,
        currency:'inr'
    });
        return res.status(201).send({
             
             clientSecret:paymentIntent.client_secret
         });
        }
        catch(e){
            console.log(e.message)
            return res.send(e.message);
        }
})

//Listen

exports.api=functions.https.onRequest(app);

//http://localhost:5001/clone-5d82c/us-central1/api






