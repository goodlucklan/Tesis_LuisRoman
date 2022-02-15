const mongodb = require("../../database/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require('moment');

const obtenerUsuario = async (req, res) => {
    try {
        const query = {
            name: "Luis"
        }
        const resultado = await mongodb.GET_ONE(query, "Users");
        console.log("resultado", resultado)
        res.status(200).send({
            codRes: "00",
            message: "Funciona"
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            codRes: "99",
            message: "Aca hay error"
        })
    }
}

const crearUsuario = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }
        let query = {
            email: email
        }
        const oldUser = await mongodb.GET_ONE(query, "Users")

        if (oldUser.codRes == "00") {
            return res.status(409).send("User Already Exist. Please Login");
        }
        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await mongodb.INSERT_ONE({
            first_name,
            last_name,
            email,
            encryptedPassword
        }, "Users");
        console.log(user);
        const token = jwt.sign({ user_id: email }, process.env.TOKEN_KEY, { expiresIn: '2h' })
        res.status(201).send({
            codRes: "00",
            token: token
        })
    } catch (error) {
        console.log(error);
    }
}

const funciona = async (req, res) => {
    let fecha = '1981-12-11T00:00:00.000Z';
    res.status(200).send({
        codRes: "00",
        fecha: moment(fecha).format("YYYY-MM-DD")
    })
}

const LoginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const query = {
            email: email
        }
        const user = await mongodb.GET_ONE(query, "Users");
        console.log("User", user);
        if (user && (await bcrypt.compare(password, user.encryptedPassword))) {
            // Create token
            const token = jwt.sign(
                { user_id: email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            // save user token
            user.token = token;
            // user
            return res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    obtenerUsuario,
    crearUsuario,
    funciona,
    LoginUsuario
}