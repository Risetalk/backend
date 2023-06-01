const { stripe } = require("../..");
const User = require("../../../../database/models/user.model");

// Post Payment Method.
const postPaymentMethod = async (req, res) => {
  // Desctructure the payment method and user id from the request.
  const { paymentMethod } = req.body;
  const { user_id } = req.query;

  try {
    // Get the customer id from the user
    const user = await User.findOne({ where: { user_id } });

    // Validate that the user exists
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    // Attach the payment method to the customer with new Promise.
    const attachPaymentMethod = stripe.paymentMethods.attach(
      paymentMethod.id,
      { customer: user.customer_id },
      (error, paymentMethod) => {
        if (error) {
          return reject({
            status: 400,
            message: error.message,
          });
        }
        resolve(paymentMethod);
      }
    );

    // Validate that the payment method was attached to the customer.
    if (!attachPaymentMethod) {
      return res.status(400).json({
        status: 400,
        message: "Payment method not attached to customer",
      });
    }

    // Return the payment method attached to the customer.
    return res.status(200).json({
      status: 200,
      message: "Payment method attached to customer",
      paymentMethod: await attachPaymentMethod,
    });
    
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

module.exports = postPaymentMethod;
