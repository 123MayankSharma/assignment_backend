const mongoose=require('mongoose')


const CategorySchema=new mongoose.Schema({
  title:{
     type:String,
     require:true,
     min:3
  },
  desc:{
     type:String,
     require:true,
     min:3
  }
},{timestamps:true});

module.exports=mongoose.model("Category",CategorySchema)


