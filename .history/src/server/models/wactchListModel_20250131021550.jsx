
import mongoose, {Schema} from "mongoose";

const watchlistSchema = new Schema({
 product:{
   type: mongoose.Schema.Types.ObjectId,
   ref: 'product',
   required: true
 },
 user:{
    
  }
  
},
{timestamps: true} )
  const watchListModel = mongoose.model('watchlist', watchlistSchema)
  export default watchListModel