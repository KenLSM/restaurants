import express from "express";

const app = express();


app.use("/", (req, res) => {
    return res.send("hello world");
})

app.listen(8081);
console.log('App start!');