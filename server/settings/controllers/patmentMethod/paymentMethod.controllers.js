// Payment Method Post.
const PaymentMethodPost = async (req, res) => {
  try {
    res.send("Aqui todos las rutas");
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = PaymentMethodPost;
