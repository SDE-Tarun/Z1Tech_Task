const express = require("express")
const axios = require("axios")
const path = require("path")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.static(path.join(__dirname,"client","build")))

app.get("/api/breeds",async(req,res)=>{
  try {
    let r = await axios.get("https://api.thecatapi.com/v1/breeds", {
      headers: {
        "x-api-key": process.env.CAT_API_KEY
      }
    })
    res.json(r.data)
  } catch (err) {
    res.status(500).json({ error: err.toString() })
  }
})

app.get("/api/images",async(req,res)=>{
  try {
    let b = req.query.breedId
    let l = req.query.limit || 9
    let u = `https://api.thecatapi.com/v1/images/search?limit=${l}`
    if(b){ u += `&breed_ids=${b}` }

    let r = await axios.get(u, {
      headers: {
        "x-api-key": process.env.CAT_API_KEY
      }
    })
    res.json(r.data)
  } catch (err) {
    res.status(500).json({ error: err.toString() })
  }
})

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"client","build","index.html"))
})

app.listen(PORT,()=>{
  console.log("Server running on " + PORT)
})
