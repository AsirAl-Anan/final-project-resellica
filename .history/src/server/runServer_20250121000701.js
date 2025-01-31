import dbConnect from "./server-config/mongodb-config.js";
import app from "./app.js";
dbConnect()

app.listen(8000,()=>{
    
})