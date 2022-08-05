const { Router } = require('express');
require('dotenv').config();
const router = Router();
const { MP_TOKEN } = process.env;
const mercadopago = require('mercadopago');
const { eBookEmail } = require('../controllers/EmailsControllers');
const { createPayment } = require('../controllers/PaymentsControllers');

mercadopago.configure({
  access_token: MP_TOKEN,
});

router.post('/', (req, res) => {
  try {
    mercadopago.preferences
      .create({
        items: req.body.items,

        back_urls: {
          success: 'http://localhost:3000/checkout/validate',
          failure: 'http://localhost:3000/checkout/validate',
          pending: 'http://localhost:3000/checkout/validate',
        },
      })
      .then((preference) => {
        res.json({ preferenceId: preference.body.id });
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
});
router.post('/create', async (req, res) => {
  const { userID, items } = req.body;
  try {
    const payment = createPayment(req.body);
    try {
      let emails = await eBookEmail(userID, items);
      emails
        ? res.json({ message: 'eBook email sent' })
        : res.status(404).json({ message: 'Cannot send eBook' });
    } catch (err) {
      console.log(err);
      res.status(404).json(err);
    }
    res.send({ message: 'Payment created succesfully' });
  } catch (err) {
    res.status(404).json(err);
  }
});
module.exports = router;
