import categoryModel from "../../models/categoryModel"
const createCategory =(req,res)=>{
const {user} = req.user 
const {icon,name,subcategories} = req.body 
 if(!icon || !name || subcategories)

}
export default createCategory