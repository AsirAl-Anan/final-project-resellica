import categoryModel from "../../models/categoryModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const createCategory = async (req, res) => {
    const { icon, name, subCategories } = req.body;

    // Check if all required fields are provided
    if (!icon || !name || !subCategories) {
        return res.status(400).json(new ApiError(400, "Please fill all the fields"));
    }

    try {
        // Check if a category with the same name already exists
        const existingCategory = await categoryModel.findOne({ name });

        if (existingCategory) {
            return res.status(409).json(new ApiError(409, "Category with this name already exists"));
        }

        // Create the category if it doesn't already exist
        const category = await categoryModel.create({
            icon,
            name,
            subCategories
        });

        return res.status(200).json(new ApiResponse(200, category, "Category created successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error", error.message));
    }
};

export default createCategory;