const express = require("express");
const app = express();
const fs = require("fs");
const data = require("./MOCK_DATA.json");
const port = 8000;

fs.writeFile("./log.txt", "Basic log", () => {});

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

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id)
    const user = data.find((user) => user.id === id)
  return res.json(user);
});


app.post("/api/users",(req, res)=>{
    return res.json({status: "pending"})

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
