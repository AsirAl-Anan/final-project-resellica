import { Router } from "express";
import registrationController from "../controllers/UserControllers/registrationController.js";
import verifyUserToken from "../middlewares/verifyUserToken.js";
import loginController from "../controllers/UserControllers/LoginController.js";
import upload from "../middlewares/multer.js";
import logOutController from "../controllers/UserControllers/LogOutController.js";
import userDataFetchController from "../controllers/UserControllers/userDataFetchController.js";
import categoryModel from "../models/categoryModel.js";
import regenerateToken from "../middlewares/regenerateCookies.js";
import productModel from "../models/productModel.js";
import watchListModel from "../models/wactchListModel.js";
import mongoose from "mongoose";

const userRouter = Router();

userRouter
  .route("/api/v1/register")
  .post(upload.none(), registrationController);
userRouter.route('/api/v1/get-user-data').get(verifyUserToken,userDataFetchController.getUserData)
userRouter.route('/api/v1/get-user-data').put(verifyUserToken,userDataFetchController.updateUserData)

// userRouter.route("/api/v1/update").post(
//   upload.fields([
//     { name: "avatar", maxCount: 1 },
//     { name: "coverImage", maxCount: 1 },
//   ]),
 
// );
 userRouter
   .route("/api/v1/login")
   .post(upload.none(),loginController ); 
userRouter
  .route("/api/v1/logout")
  .post(upload.none(), verifyUserToken, logOutController);

  userRouter
  .route("/api/v1/get-categories")
  .get(upload.none(),async (req,res)=>{
    try {
      const categories = await categoryModel.find();
      res.status(200).json({
        status: "success",
        data: {
          categories,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "fail",
        message: "Internal server error",
      });
    }
  });  
 userRouter
  .route("/api/v1/regenerate-token")
  .post(upload.none(), regenerateToken);

  userRouter.post('/api/v1/get-products/:category', async (req, res, next) => {
    try {
        const { category } = req.params;
        const {
            country,
            minPrice,
            maxPrice,
            sortBy,
            sortOrder,
            yearsOfUse,
            page = 1,
            limit = 10,
            subCategory
        } = req.body;

        // Log request parameters
        console.log('Request parameters:', {
            category,
            country,
            minPrice,
            maxPrice,
            sortBy,
            sortOrder,
            yearsOfUse,
            page,
            limit,
            subCategory
        });
        
        // Build match stages for aggregation
        const matchStages = {status:"available"};
        // Only show active products
        // Add category filter if valid
        if (category !== 'all' && mongoose.Types.ObjectId.isValid(category)) {
            matchStages.category = new mongoose.Types.ObjectId(category);
        }
     
        // Add subCategory filter - only if subCategory is provided
        if (subCategory && subCategory.trim()) {
            matchStages.subCategory = subCategory.trim();
        }

        // Add price range filter
        if (minPrice !== undefined || maxPrice !== undefined) {
            matchStages.resalePrice = {};
            if (minPrice !== undefined) matchStages.resalePrice.$gte = minPrice;
            if (maxPrice !== undefined) matchStages.resalePrice.$lte = maxPrice;
        }
       
        // Add years of use filter
        if (yearsOfUse) {
            matchStages.yearsOfUse = yearsOfUse;
        }
 
        console.log('Match stages criteria:', JSON.stringify(matchStages, null, 2));

        // Build sort object
        const sortStage = {};
        if (sortBy) {
            sortStage[sortBy] = sortOrder === 'desc' ? -1 : 1;
        } else {
            sortStage.createdAt = -1; // Default sort by newest
        }

        // Build aggregation pipeline
        const pipeline = [
            {
                $match: matchStages
            },
            {
                $lookup: {
                    from: 'sellers',
                    localField: 'sellerId',
                    foreignField: 'userId',
                    as: 'seller'
                }
            },
            {
                $unwind: '$seller'
            },
            {
                $lookup:{
                    from:"users",
                    localField:"seller.userId",
                    foreignField:"_id",
                    as:"sellerAccount"
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'categoryInfo'
                }
            },
            {
                $unwind: '$categoryInfo'
            }
        ];

        // Add country filter if provided
        if (country) {
            pipeline.push({
                $match: {
                    'seller.country': country
                }
            });
        }

        pipeline.push({ $sort: sortStage });
        pipeline.push(
            { $skip: (page - 1) * limit },
            { $limit: limit }
        );

        // Update project stage to include subCategory
        pipeline.push({
            $project: {
                _id: 1,
                originalPrice: 1,
                resalePrice: 1,
                images: 1,
                status: 1,
                subCategory: 1,
                createdAt: 1,
                seller: {
                    _id: '$seller._id',
                    name: '$seller.name',
                    email: '$seller.email',
                    country: '$seller.country'
                },
                sellerAccount: 1,
                category: {
                    _id: '$categoryInfo._id',
                    name: '$categoryInfo.name',
                    subcategories: '$categoryInfo.subcategories'
                },
                title:1,
                description:1,
                currency:1,
                yearsOfUse:1,
                
            }
        });

        console.log('Full aggregation pipeline:', JSON.stringify(pipeline, null, 2));

        // Check total documents before aggregation
        const totalDocs = await productModel.countDocuments();
        console.log('Total documents in collection:', totalDocs);

        // Execute the aggregation pipeline
        const products = await productModel.aggregate(pipeline);
   
        console.log('Products query result length:', products.length);
        if (products.length === 0) {
            console.log('No products found matching criteria');
            // Execute a simpler query to see if any products exist
            const sampleProduct = await productModel.findOne({ status: "available" });
            console.log('Sample product exists:', sampleProduct ? 'Yes' : 'No');
        }

        // Get total count with the same filters
        const countPipeline = [
            { $match: matchStages },
            { 
                $lookup: {
                    from: 'sellers',
                    localField: 'sellerId',
                    foreignField: '_id',
                    as: 'seller'
                }
            },
            { $unwind: '$seller' }
        ];

        if (country) {
            countPipeline.push({
                $match: {
                    'seller.country': country
                }
            });
        }

        countPipeline.push({
            $count: 'total'
        });

        console.log('Count pipeline:', JSON.stringify(countPipeline, null, 2));

        const [totalCount] = await productModel.aggregate(countPipeline);
        console.log('Total count result:', totalCount);

        const total = totalCount?.total || 0;

        res.json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            total,
            products
        });

    } catch (error) {
        console.error("Error in get-products:", error);
        next(error);
    }
});
userRouter
.route("/api/v1/categories/:id")
.get(upload.none(),async (req,res)=>{
 const categoryId = req.params.id;

 const category = await categoryModel.findById(categoryId);

  if(!category){
    return res.status(404).json({
      status:"fail",
      message:"Category not found"
    })
  }
  res.status(200).json({
    status:"success",
    data:{
      category
    }
  })
});
userRouter.route("/api/v1/get-product/:id").get(upload.none(),async (req,res)=>{
  const productId = req.params.id;
  let product = await productModel.aggregate([
    {
        $match: {
            _id:new mongoose.Types.ObjectId(productId)
         },
        
    },
    {
        $lookup: {
            from: 'sellers',
            localField: 'sellerId',
            foreignField: 'userId',
            as: 'seller'
         }
     },
     {
        $lookup:{
            from:"users",
            localField:"seller.userId",
            foreignField:"_id",
            as:"sellerAccount"
     },
     
    },
    {
        $project:{
            sellerAccount:1,
            title:1,
            description:1,
            resalePrice:1,
            originalPrice:1,
            currency:1,
            images:1,
            status:1,
            yearsOfUse:1,
            createdAt:1,
            category:1,
            subCategory:1,
            seller:1
        }
     }
  ]);
   product = product[0];
    if(!product){
        return res.status(404).json({
        status:"fail",
        message:"Product not found"
        })
    }
    res.status(200).json({
        status:"success",
        data:{
        product
        }
    })

}
)
userRouter.post("/watchlist", verifyUserToken, async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        // Check if product already exists in watchlist
        const existingEntry = await watchListModel.findOne({ product: productId, user: userId });
        if (existingEntry) {
            return res.status(400).json({ message: "Product already in watchlist" });
        }

        const newWatchlistItem = new watchListModel({ product: productId, user: userId });
        await newWatchlistItem.save();

        res.status(201).json({ message: "Product added to watchlist", watchlist: newWatchlistItem });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Remove product from watchlist
userRouter.delete("/watchlist/:productId", verifyUserToken, async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const deletedItem = await watchListModel.findOneAndDelete({ product: productId, user: userId });
        if (!deletedItem) {
            return res.status(404).json({ message: "Product not found in watchlist" });
        }

        res.status(200).json({ message: "Product removed from watchlist" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});



export default userRouter;
