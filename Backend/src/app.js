
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["https://code-review-rose.vercel.app"],
  methods: ["GET","POST"]
}));

app.get("/", (req,res) => res.send("Hello World"));
app.post("/ai/get-review", (req,res) => {
  const { code, language } = req.body;
  res.send(`Received ${language} code:\n\n${code}\n\n⚡ This is your review!`);
});

module.exports = app; 
