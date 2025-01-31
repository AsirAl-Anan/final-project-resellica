import userModel from "../models/userModel"
const userDataFetchController =async(req,res)=>{
 const userId = req.user._id
 const user = await userModel.aggregate([
    {
        $match: { _id: new mo }
    }
 ])
}

export default userDataFetchController