const express=require("express")
const cors = require("cors")
const app=express()
const dotenv = require("dotenv");
const mongoose = require("mongoose")

const Categories=require("./Categories")
const history = require("./History")
const Cards = require("./Videos")

dotenv.config();
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8000

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
  })
  .then(() => {
    console.log("Mongo DB server Connected!");
  }).catch((err)=>{
    console.log(err);
  })

app.get("/",async(req,res)=>{
  try{
  const allCategories=await Categories.find({});
  res.status(200).json(allCategories)
  console.log(allCategories)
  }catch{
    res.status(500).json(err)
  }

})

app.get("/history",async (req,res)=>{
	try{
      const prev_cards=await history.find({})
      // res.status(200).json(allPins)
      console.log(prev_cards)
  }catch(err){
    res.status(500).json(err)
  }
})

app.post("/newCategory",async (req,res)=>{
  const newCategory=new Categories(req.body)

  try{
    const StoredCategory=await newCategory.save()
    res.status(200).json(StoredCategory)
  }catch(err){
    res.status(500).json(err)
  }
})

app.post("/newCard",async (req,res)=>{
  const newCard=new Cards(req.body)

  try{
    const storedCard=await newCard.save()
    res.status(200).json(storedCard)
  }catch(err){
    res.status(500).json(err)
  }
})







app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
