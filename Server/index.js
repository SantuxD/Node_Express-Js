const express = require("express");
const app = express();
const fs = require("fs");
const data = require("./MOCK_DATA.json");
const port = 8000;

app.use(express.urlencoded({ extended: false }))

fs.writeFile("./log.txt", "Basic log", () => { });

app.get("/api/users", (req, res) => {
  return res.json(data);
});

app.get("/users", (req, res) => {
  const html = `
    <ul>
       ${data
      .map((user) => `<li>${user.first_name} ${user.last_name} </li>`)
      .join("")}
    
    </ul>
    
    `;
  res.send(html);
});

//Dynamic routing 
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id)
  const user = data.find((user) => user.id === id)

  return res.json(user);
});


app.post("/api/users", (req, res) => {
  const body = req.body;
  data.push({ ...body, id: data.length + 1 })
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(data), (err, result) => {
    return res.json({ status: "success", data, id: data.length })
  })

})

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id)
  const user = data.findIndex((user) => user.id === id)
  const body = req.body;
  // if (user === -1) {
  //   return res.status(404).json({ status: "User not found" })
  // }
  data.pop({...body , id: data.length -1})
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(data), (err, result) => {
    return res.json({ Status: "Successful delete", id: data.length })


  })


})


// GET,PATCH, DELETE req for this path - "/api/users/:id"

//  app
//    .route("/api/users/:id")
//    .get((req, res) =>{
//          const id = Number(req.params.id)
//     const user = data.find((user) => user.id === id)
//   return res.json(user);
//    })
//    .patch((req,res)=>{
//     return res.json({status:"pending"})
//    })
//    .delete((req,res)=>{
//     return res.json({status:"pending"})
//    })













app.listen(port, () => {
  console.log(`Server Started in: ${port}`);
});
