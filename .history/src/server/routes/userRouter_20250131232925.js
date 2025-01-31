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
import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";
import addressModel from "../models/addressModel.js";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
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
      
      res.status(500).json({
        status: "fail",
        message: "Internal server error",
      });
    }
  });  
 userRouter
  .route("/api/v1/regenerate-token")
  .post(upload.none(), regenerateToken);

  userRouter.post('/api/v1/get-products/:category',verifyUserToken, async (req, res, next) => {
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
        const userId = req.user._id;
       
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
                $lookup: {
                    from: 'watchlists',
                    let: { productId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$product', '$$productId'] },
                                        { $eq: ['$user', new mongoose.Types.ObjectId(userId)] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'userWatchlist'
                }
            },
            // Count total watchlist entries for this product
            {
                $lookup: {
                    from: 'watchlists',
                    let: { productId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$product', '$$productId'] }
                            }
                        },
                        {
                            $count: 'total'
                        }
                    ],
                    as: 'watchlistCount'
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
                isInWatchlist: { $gt: [{ $size: '$userWatchlist' }, 0] },
                watchlistCount: {
                    $ifNull: [{ $arrayElemAt: ['$watchlistCount.total', 0] }, 0]
                }
                
            }
        });

       

        // Check total documents before aggregation
        const totalDocs = await productModel.countDocuments();


        // Execute the aggregation pipeline
        const products = await productModel.aggregate(pipeline);
   
       
        if (products.length === 0) {
            
            // Execute a simpler query to see if any products exist
            const sampleProduct = await productModel.findOne({ status: "available" });
           
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

     

        const [totalCount] = await productModel.aggregate(countPipeline);
       

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
userRouter.route("/api/v1/check-user").get(async (req, res) => {
  const { email } = req.query;

  try {
    const user = await userModel.findOne({ email }); 
    res.status(200).json({ exists: !!user });
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})
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
userRouter.route("/api/v1/get-product/:id").get(verifyUserToken, async (req, res) => {
    try {
      const productId = req.params.id;
      const userId = req.user._id;
      console.log("p",productId)
      let product = await productModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(productId)
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
          $lookup: {
            from: "users",
            localField: "seller.userId",
            foreignField: "_id",
            as: "sellerAccount"
          },
        },
        // Add lookup for current user's watchlist status
        {
          $lookup: {
            from: 'watchlists',
            let: { productId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$product', '$$productId'] },
                      { $eq: ['$user', new mongoose.Types.ObjectId(userId)] }
                    ]
                  }
                }
              }
            ],
            as: 'userWatchlist'
          }
        },
        // Add lookup for total watchlist count
        {
          $lookup: {
            from: 'watchlists',
            let: { productId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$product', '$$productId'] }
                }
              },
              {
                $count: 'total'
              }
            ],
            as: 'watchlistCount'
          }
        },
        {
          $project: {
            sellerAccount: 1,
            title: 1,
            description: 1,
            resalePrice: 1,
            originalPrice: 1,
            currency: 1,
            images: 1,
            status: 1,
            yearsOfUse: 1,
            createdAt: 1,
            category: 1,
            subCategory: 1,
            seller: 1,
            isInWatchlist: { $gt: [{ $size: '$userWatchlist' }, 0] },
            watchlistCount: {
              $ifNull: [{ $arrayElemAt: ['$watchlistCount.total', 0] }, 0]
            }
          }
        }
      ]);
  
      product = product[0];
      
      if (!product) {
        return res.status(404).json({
          status: "fail",
          message: "Product not found"
        });
      }
  
      res.status(200).json({
        status: "success",
        data: {
          product
        }
      });
    } catch (error) {
      console.error("Error in get-product:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error"
      });
    }
  });
userRouter.post("/api/v1/watchlist/toggle", verifyUserToken, async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        // Check if product exists in watchlist
        const existingEntry = await watchListModel.findOne({ product: productId, user: userId });
        
        if (existingEntry) {
            // Remove from watchlist
            await watchListModel.findOneAndDelete({ product: productId, user: userId });
            return res.status(200).json({ 
                message: "Product removed from watchlist",
                action: "removed"
            });
        } else {
            // Add to watchlist
            const newWatchlistItem = new watchListModel({ product: productId, user: userId });
            await newWatchlistItem.save();
            return res.status(201).json({ 
                message: "Product added to watchlist",
                action: "added"
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});;


userRouter.delete("/api/v1/watchlist/:productId", verifyUserToken, async (req, res) => {
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

userRouter.get('/api/v1/watchlist', verifyUserToken, async (req, res) => {
    try{
    const user = req.user
    if(!user){
        return res.status(404).json({
            status:"fail",
            message:"User not found"
        })
    }
    const watchlist = await watchListModel.aggregate([
        {
            $match:{
                user:user._id
            }
        },
        {
            $lookup:{
                from:"products",
                localField:"product",
                foreignField:"_id",
                as:"product"
             }
        },
         {
            $unwind:"$product"
         } ,
        {
            $lookup:{
                from:"users",
                localField:"product.sellerId",
                foreignField:"_id",
                as:"product.seller"
            }
        },
        {
            $lookup:{
                from:"sellers",
                localField:"product.seller._id",
                foreignField:"userId",
                as:"product.sellerAccount"
            }
        },
        {   
            $project:{
                product:1,
                seller:1,
                title:1
            }
        }
    ])
    return res.status(200).json({
        status:"success",
        data:{
            watchlist
        }
    })
    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message });
    }
})
userRouter.post('/api/v1/search-products', verifyUserToken, async (req, res, next) => {
  try {
    const { query } = req.body;
    const userId = req.user._id;

    const searchQuery = {
      status: "available",
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { subCategory: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } }
      ]
    };

    const pipeline = [
      {
        $match: searchQuery
      },
      {
        $lookup: {
          from: 'sellers',
          localField: 'sellerId',
          foreignField: 'userId',
          as: 'seller'
        }
      },
      { $unwind: '$seller' },
      {
        $lookup: {
          from: 'users',
          localField: 'seller.userId',
          foreignField: '_id',
          as: 'sellerAccount'
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
      { $unwind: '$categoryInfo' },
      {
        $lookup: {
          from: 'watchlists',
          let: { productId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$product', '$$productId'] },
                    { $eq: ['$user', new mongoose.Types.ObjectId(userId)] }
                  ]
                }
              }
            }
          ],
          as: 'userWatchlist'
        }
      },
      {
        $lookup: {
          from: 'watchlists',
          let: { productId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$product', '$$productId'] }
              }
            },
            {
              $count: 'total'
            }
          ],
          as: 'watchlistCount'
        }
      },
      {
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
          title: 1,
          description: 1,
          currency: 1,
          yearsOfUse: 1,
          isInWatchlist: { $gt: [{ $size: '$userWatchlist' }, 0] },
          watchlistCount: {
            $ifNull: [{ $arrayElemAt: ['$watchlistCount.total', 0] }, 0]
          }
        }
      }
    ];

    const products = await productModel.aggregate(pipeline);

    res.json({
      success: true,
      products,
      total: products.length
    });

  } catch (error) {
    console.error("Error in search-products:", error);
    next(error);
  }
});
userRouter.get('/api/v1/get-address/:userId', verifyUserToken, async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId)
    const address = await addressModel.findOne({ userId });
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.json({ data: address });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
userRouter.post('/api/v1/create-payment-intent', verifyUserToken, async (req, res) => {
  const { productId, address, userId } = req.body;

  try {
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.resalePrice * 100 + 1000, // Adding shipping cost
      currency: 'usd',
      metadata: { productId, userId, address },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
userRouter.post('/api/v1/create-transaction', verifyUserToken, async (req, res) => {
  const { productId, buyerId, sellerId, price, shippingCharge, totalCost, deliveryAddress, stripePaymentIntentId, stripeChargeId } = req.body;

  try {
    const transaction = new transactionModel({
      buyerId,
      sellerId,
      productId,
      price,
      shippingCharge,
      totalCost,
      deliveryAddress,
      stripePaymentIntentId,
      stripeChargeId,
      status: 'completed',
    });

    await transaction.save();
    res.status(201).json({ message: 'Transaction created successfully', transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
userRouter.get('/api/v1/get-transactions', verifyUserToken, async (req, res) => {
  try {
    const transactions = await transactionModel.find({ buyerId: req.user._id }).populate('productId');
    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default userRouter;
