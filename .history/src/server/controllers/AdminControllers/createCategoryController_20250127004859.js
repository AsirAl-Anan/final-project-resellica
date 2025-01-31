import categoryModel from "../../models/categoryModel.js"
const createCategory =(req,res)=>{
const {user} = req.user 
const {icon,name,subcategories} = req.body 
 if(!icon || !name || subcategories.length){
    return res.status(400).json({message:"Please fill all fields "})
 }

}
export default createCategory