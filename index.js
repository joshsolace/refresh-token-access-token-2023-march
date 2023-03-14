const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const cors = require("cors")
require("dotenv").config();
const fs = require("fs");
const writeStream = fs.createWriteStream("devBlog.csv");

const port = process.env.PORT || 4000;

const app = express();

app.use(cors())

//write headers
writeStream.write(`author, BlogTitle, bloglink, readtime \n`);

axios
  .get("https://www.udemy.com/")
  .then((res) => {
    const $ = cheerio.load(res.data);
    $(".ud-container ud-page-wrapper").each((index, element) => {
      const author = $(element).find(".component-margin").text();
      console.log(author);
    });
  })
  .catch((err) => console.error(err));

//Listen to server
app.listen(port, () => {
  console.log(`Server Established and  running on Port ⚡${port}`);
});
