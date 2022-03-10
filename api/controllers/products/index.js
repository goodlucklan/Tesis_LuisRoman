const mongodb = require("../../database/index");

const getProducts = async (req, res) => {
  try {
    const resultado = await mongodb.GET_ALL({}, "Products");
    if (resultado.codRes === "00") {
      console.log(resultado);
      res.status(200).send({
        codRes: "00",
        message: resultado.result,
      });
    }
  } catch (err) {
    res.status(200).send({
      codRes: "99",
      response: "error al consultar",
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, qty, state } = req.body;
    if (!(name && qty && state)) {
      res.status(400).send("All input is required");
    }
    let query = {
      name: name,
    };
    const oldProduct = await mongodb.GET_ONE(query, "Products");
    if (oldProduct.codRes == "00") {
      return res
        .status(409)
        .send("Product Already Exist. Please Insert Another");
    }
    const product = await mongodb.INSERT_ONE(
      {
        name,
        qty,
        state,
      },
      "Products"
    );
    console.log(product);
    res.status(200).send({
      codRes: "00",
      response: "Product created succesfull",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProducts,
  addProduct,
};
