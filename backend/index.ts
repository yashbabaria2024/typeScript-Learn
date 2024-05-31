import express from 'express'
import { Request,Response } from 'express'
const app = express()
import cors from 'cors';
app.use(cors());
app.use(express.json());

app.get("/app",(req:Request,res:Response)=>{
  res.send("hello") 
})

app.post("/app",(req:Request,res:Response)=>{
    // req.body
    console.log(req.body);
    
})

app.listen(8000,()=>{console.log("localhost:8000");
})