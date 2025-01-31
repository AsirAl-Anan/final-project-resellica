import dbConnect from "./server-config/mongodb-config.js";
import app from "./app.js";
dbConnect()

app.listen(8000,()=>{
    console.log("server is running on port 8000")
})