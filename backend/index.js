//Configuración del servidor
const express = require("express");
const serverlessHttp = require("serverless-http");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectBD } = require("./config/connectDb.js");
const usersRoutes = require("./routes/User.routes.js");

//Write the request
const app = express();

//configurando leer JSON
app.use(express.json());

const port = process.env.PORT || 4000;

//Configurando dotenv
dotenv.config(); // busca un archivo .env

//Conectando nuestra BBDD
connectBD();

//Configurar CORS
// WhiteList
const whitelist = [process.env.FRONT_END_URL, process.env.FRONT_END_URL_LOCALHOST];
const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

//Routing
app.use("/api/user", usersRoutes);

// Exporta el servidor de Express como una función serverless
module.exports.handler = serverlessHttp(app);
