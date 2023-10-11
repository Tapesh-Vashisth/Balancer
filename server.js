const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("hello from test");
})

app.listen(3000, () => {
    console.log("test listening on port 3000")
})