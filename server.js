const express = require('express');
const cors = require('cors')

require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


const { obtenerUsuario, crearUsuario } = require("./api/controllers/users")

app.set("port", process.env.PORT);
app.set("host", process.env.NODEJS_IP);


app.get("/obtenerData", obtenerUsuario);
app.post("/addUser", crearUsuario);

app.listen(app.get("port"), app.get("host"), () => {
    console.log(`MS on http://${app.get("host")}:${app.get("port")}`);
});