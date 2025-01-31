import dbConnect from "./server-config/mongodb-config.js";
import 'dotenv/config'; // For ES Modules (modern JavaScript projects)
import {app} from "./app.js";
await dbConnect().then(()=>console.log("mongodb connected")).catch((e)=>console.log(e))


app.listen(8000,()=>{
    console.log("server is running on port 8000")
})