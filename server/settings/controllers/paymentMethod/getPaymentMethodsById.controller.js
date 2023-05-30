const User = require("../../../../database/models/user.model");

// Get payment methods by id.
const getPaymentMethodsById = async (req, res) => {
  // Destructuring the request
  const { user_id } = req.query;

  try {
    // Get user data.
    const user = await User.findById(user_id);

    // Verify if user exists.
    if (!user)
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });

    // Get payment methods.
    const paymentMethods = await stripe.customers.listPaymentMethods(
      user.customer_id,
      {
        type: "card",
      }
    );

    // Return the payment methods.
    return res.status(200).json({
        status: 200,
        message: "Payment methods found",
        data: paymentMethods.data,
    });

  } catch (error) {

    // Return the error.
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });

  }
};


module.exports = getPaymentMethodsById;