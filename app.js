require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.server_port;
const goodsRouter = require('./routes/products.router');
const connect = require("./schemas"); 
connect();

app.use(express.json());

app.use("/api", [goodsRouter]);

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
  });