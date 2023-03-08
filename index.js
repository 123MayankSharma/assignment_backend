const express=require("express")
const cors = require("cors")
const app=express()
const dotenv = require("dotenv");
const mongoose = require("mongoose")


dotenv.config();
app.use(cors)
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

app.get("/history",(req,res)=>{
	console.log("request received")
	res.json({"Page":"History"})
})


app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
