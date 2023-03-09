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

  //for getting all categories
app.get("/",async(req,res)=>{
  try{
  const allCategories=await Categories.find({});
  res.status(200).json(allCategories)
  }catch(err){
    res.status(500).json(err)
  }

})

//for getting all history
app.get("/history",async (req,res)=>{
	try{
      const prev_cards=await history.find({})
      res.status(200).json(prev_cards)
      console.log(prev_cards)
  }catch(err){
    res.status(500).json(err)
  }
})

//for adding new category
app.post("/newCategory",async (req,res)=>{
  const newCategory=new Categories(req.body)

  try{
    const StoredCategory=await newCategory.save()
    res.status(200).json(StoredCategory)
  }catch(err){
    res.status(500).json(err)
  }
})

//for adding new card in a category
app.post("/newCard",async (req,res)=>{
  const newCard=new Cards(req.body)

  try{
    const storedCard=await newCard.save()
    res.status(200).json(storedCard)
  }catch(err){
    res.status(500).json(err)
  }
})

//for getting all existing cards in a category
app.post("/categoryCards",async(req,res)=>{
  const obj={"category_id":req.body.category_id}
  try{
    const categoryCards=await Cards.find(obj)
    res.status(200).json(categoryCards)
  }catch(err){
    res.status(500).send(err)
  }
})

//for adding cards to history
app.post("/addToHistory",async(req,res)=>{
  const lastCard=new history(req.body)
    try{
      const storedCard=await lastCard.save()
      res.status(200).json(storedCard())
    }catch(err){
      res.status(500).send(err)
    }
})

//endpoint for deleting cards
app.post("/deleteCards",async(req,res)=>{
    try{
      const deletedCards=await Cards.deleteMany({_id:req.body.cards})
      res.status(200)
    }catch(err){
      res.status(500).send(err)
    }

})

app.post("/moveCard",async(req,res)=>{
})





app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
