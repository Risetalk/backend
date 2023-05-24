const Stripe = require('stripe');
const { SECRET_KEY } = process.env;
const stripe = new Stripe(SECRET_KEY);

// Clave secreta COPIENLA EN SU ENV
//"sk_test_51N8lsLDcUyKcM4LIgMa3viR7Rmm2ZkKblnpy4JBI9Es6Kjwo0iVXdUHR7cYq8338A3MYGFG3qVLRWakHp8zkl1OY009IjMzHbg"


//Clave publica (va en el front) NO HAYY DRAMA QUE SE MUESTRE EN EL FRONT
//pk_test_51N8lsLDcUyKcM4LIF5dll7ccQipSzmHbMILHzNn4GgGqgm1WBk8PFI0Bznh171t339AHcKrYZtCubakr5pJMX2kT00lGEXvWQl



// Payment Method Post.
const PaymentMethodPost = async (req, res) => {
  //Recibe el ID de la compra y el monto
  const { id, amount } = req.body;

  try {
    //Aqui se crea el pago
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Curso de React desde Cero",
      payment_method: id,
      //Aqui confirmo de una vez el pago
      confirm: true
    })

    //Retorno los datos del pago
    res.status(200).json(payment);

  } catch (error) {

    res.status(404).json({ message: error.raw.message });
  }
};

module.exports = PaymentMethodPost;
