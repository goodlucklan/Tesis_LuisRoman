const testIp = async (req, res) => {
  try {
    const ip = req.ip;
    res.status(200).send(ip);
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  testIp,
};
