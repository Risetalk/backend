//External units
const Stripe = require('stripe');
const { SECRET_KEY_PAYMENT } = process.env;
const stripe = new Stripe(SECRET_KEY_PAYMENT);


// Payment Method Post.
const PaymentMethodPost = async (req, res) => {

  //I receive the purchase ID, amount and description.
  const { id, amount, description } = req.body;

  //I verify that the data exists
  if (!id || !amount || !description) return res.status(400).json({ message: "Incomplete data" })

  //Verify that the parameters are valid
  if (typeof (amount) === "string" || id === "" || description === "") return res.status(400).json({ message: "Incorrect parameters" })

  try {
    //I create the payment attempt
    const payment = await stripe.paymentIntents.create({
      //Amount receivable
      amount,
      //The currency to be charged
      currency: "USD",
      //Description of purchase
      description: description,
      //The id of the payment method, comes from the front end.
      payment_method: id,
      //Confirm purchase
      confirm: true
    })

    res.status(200).json({ message: "Successful purchase" });

  } catch (error) {

    res.status(404).json({ message: error.message });
  }


};

module.exports = PaymentMethodPost;
