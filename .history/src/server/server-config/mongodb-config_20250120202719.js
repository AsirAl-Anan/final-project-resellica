import mongoose from "mongoose";


const dbConnect = async () => {
    try{
       await mongoose.connect(`${process.env.DATABASE_URI}/${process.env.DATABASE_NAME}`)
    } catch (error){
        console.log(error)
    }
    
}
dbConnect()
export default dbConnect