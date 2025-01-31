import mongoose from "mongoose";


const dbConnect = async () => {
    try{
       await mongoose.connect(`${process.env.DATABASE_URI}/videotube`)
    } catch (error){
        console.log(error)
    }
    
}
export default dbConnect