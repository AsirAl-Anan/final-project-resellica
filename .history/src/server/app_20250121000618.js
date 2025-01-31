import express, { urlencoded } from "express";

import { registrationController } from "./controllers/registrationController.js";
dbConnect()
const app = express()
export default app   // express and app initialization

import cors from "cors"
import cookieParser from "cookie-parser";

app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:8000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
  }));
  

app.use('/register', registrationController)
app.listen(8000,()=>{
    console.log("Server is running on port 8000");
})