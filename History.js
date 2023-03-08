const mongoose=require('mongoose')


const HistorySchema=new mongoose.Schema({
  category_id:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
  },
  title:{
     type:String,
     require:true,
     min:3
  },
  url:{
     type:String,
     require:true,
  },
  watched_at:{
      type:Date,
      require:true
}
},{timestamps:true});

module.exports=mongoose.model("History",HistorySchema)


