const mongodb = require("../../database/index");

const getProducts = async (req, res) => {
  try {
    const resultado = await mongodb.GET_ALL({}, "Products");
    console.log(resultado);
    res.status(200).send({
      codRes: "00",
      message: resultado,
    });
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  getProducts,
};
