import express, { urlencoded } from "express";
const app = express()
export default app   // express and app initialization
import userRouter from "./routes/userRouter.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import studioRouter from "./routes/studioRouter.js";
import VideoRouter from "./routes/VideoRouter.js";
import subscriptionRouter from "./routes/subscriptionRouter.js";
import historyRouter from "./routes/historyRouter.js";
import commentRouter from "./routes/commentRouter.js";
import userInfoRouter from "./routes/userInfoRouter.js";
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
  

app.use('/users', userRouter )
app.use('/studio', studioRouter)
app.use('/videos', VideoRouter)
app.use('/subscribe', subscriptionRouter)
app.use('/history', historyRouter)
app.use('/comment', commentRouter)
app.use('/userInfo', userInfoRouter)