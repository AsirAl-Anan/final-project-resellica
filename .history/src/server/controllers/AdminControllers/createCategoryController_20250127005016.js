import categoryModel from "../../models/categoryModel.js"
import ApiError from "../../utils/ApiError.js"
const createCategory =(req,res)=>{
const {user} = req.user 
const {icon,name,subcategories} = req.body 
 if(!icon || !name || subcategories.length){
    return res.status(400).json(new ApiError(400, "Please fill all the fields"))
 }
 const category = categoryModel.create({
    icon,
    name,
    sub
 }) 

}
export default createCategory