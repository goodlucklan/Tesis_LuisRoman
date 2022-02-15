
const getProducts = async (req, res) => {
    try {
        res.status(200).send({
            codRes: "00",
            message: "Funciona"
        })
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    getProducts
}