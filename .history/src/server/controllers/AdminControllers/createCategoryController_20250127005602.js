import categoryModel from "../../models/categoryModel.js"
import ApiError from "../../utils/ApiError.js"
import ApiResponse from "../../utils/ApiResponse.js"
const createCategory =async (req,res)=>{
const {user} = req.user 

const {icon,name,subcategories} = req.body 
 if(!icon || !name || !subcategories){
    return res.status(400).json(new ApiError(400, "Please fill all the fields"))
 }
 const category =await categoryModel.create({
    icon,
    name,
    subcategories
 }) 
 return res.status(200).json(new ApiResponse(400, category))
}
export default createCategory