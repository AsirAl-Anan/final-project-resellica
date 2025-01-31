
import mongoose, {Schema} from "mongoose";

const watchlistSchema = new Schema({
 
  
},
{timestamps: true} )
  const watchListModel = mongoose.model('watchlist', watchlistSchema)
  export default watchListModel