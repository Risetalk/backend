//External units
const Stripe = require('stripe');
const Course = require('../../../../database/models/course.model');
const User = require('../../../../database/models/user.model');
const { SECRET_KEY_PAYMENT } = process.env;
const stripe = new Stripe(SECRET_KEY_PAYMENT);

// Post payment Intent
const postPaymentIntent = async (req, res) => {

  //I receive the purchase ID, amount and description.
  const { user_id ,  courses , amount, description , paymentMethod , currency } = req.body;

  try {

    // Get user data.
    const user = await User.findById(user_id);

    // Verify if user exists.
    if (!user)
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });

    // Get Courses by id.
    const coursesFound = await Course.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: courses,
        },
      },
    });

    // Verify if the courses exists.
    if (!coursesFound)
      return res.status(404).json({
        status: 404,
        message: "Courses not found",
      });

    // Verificar si la suma de el precio de los cursos es igual al monto.
    const total = coursesFound.reduce((acc, course) => acc + course.price, 0);

    if (total !== amount)
      return res.status(400).json({
        status: 400,
        message: "The amount is truqued 😡",
      });
      
    // Create the payment intent.
    const paymentIntent = await stripe.paymentIntents.create({

      customer: user.customer_id,
      amount: amount * 100,
      currency,
      description,
      payment_method: paymentMethod,
      confirmation_method: "manual",

    });

    // Return the payment intent.
    return res.status(200).json({
      status: 200,
      message: "Payment intent created",
      data: paymentIntent,
    });
 
  } catch (error) {

    // Return the error.
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });

  }


};

module.exports = postPaymentIntent;
