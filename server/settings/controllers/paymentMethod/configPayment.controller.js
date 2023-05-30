require("dotenv").config();


const configPayment = (req, res) => {
    try {
        //Answer with the public key
        res.status(200).send({
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        });
    } catch (error) {
        res.status(404).json({ error: "Public key not found"});
    }

}

module.exports = configPayment;