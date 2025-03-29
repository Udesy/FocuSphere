const express = require("express");
const cors = require("cors")
const app = express();
const PORT = 8000;

app.use(cors());

app.get("/", (req, res) => {
    res.json({message: "This message is recieved from the API call."})
});

app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`)
});