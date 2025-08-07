const express = require("express")
const app = express();

app.get("/", (req, res) => {
    res.send("Hello from My Home page")
})

app.get("/about",(req,res)=>{
    res.send(`This is my about page`)
})


app.listen(8001, () => {
    console.log(`Server Started:`);
})