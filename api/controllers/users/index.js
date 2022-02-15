const mongodb = require("../../database/index")
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
module.exports = {
    obtenerUsuario
}