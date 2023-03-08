const mongoose=require('mongoose')


const CardSchema=new mongoose.Schema({
  title:{
    type:String,
    require:true,
  },
  category_id:{
     type:mongoose.Schema.Types.ObjectId,
     require:true,
  },
  url:{
     type:String,
     require:true,
  },

},{timestamps:true});

module.exports=mongoose.model("Cards",CardSchema)


