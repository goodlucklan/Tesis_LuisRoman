const express = require('express');
const cors = require('cors')

require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


const { obtenerUsuario, crearUsuario, funciona, LoginUsuario } = require("./api/controllers/users")
const { getProducts, addProduct } = require("./api/controllers/products")
const auth = require("./api/utils/auth")

app.set("port", process.env.PORT);
app.set("host", process.env.NODEJS_IP);


app.get("/obtenerData", obtenerUsuario);
app.post("/addUser", crearUsuario);
app.get("/moment", funciona);
app.post("/loginUser", LoginUsuario);

app.get("/productos", auth, getProducts);
app.post("/addproduct", addProduct);

app.listen(app.get("port"), app.get("host"), () => {
    console.log(`MS on http://${app.get("host")}:${app.get("port")}`);
});