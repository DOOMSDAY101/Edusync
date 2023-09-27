const Route = require('express').Router;
const axios = require("axios").default;
const dotenv = require("dotenv");
dotenv.config();
const route = Route();

const CHAPA_URL = process.env.CHAPA_URL || "https://api.chapa.co/v1/transaction/initialize"
const CHAPA_AUTH = process.env.CHAPA_AUTH 


// req header with chapa secret key
const config = {
    headers: {
        Authorization: `Bearer ${CHAPA_AUTH}`
    }
}

route.post("/pay", async (req, res) => {

    // chapa redirect you to this url when payment is successful
   const CALLBACK_URL = "http://localhost:4000/api/verify-payment/"
   const RETURN_URL = "http://localhost:4000/api/payment-success/"

   // a unique reference given to every transaction
   const TEXT_REF = "tx-sms-" + Date.now()

   // form data
   const data = {
       amount: '2000', 
       currency: 'ETB',
       email: 'ato@ekele.com',
       first_name: 'Ato',
       last_name: 'Ekele',
       tx_ref: TEXT_REF,
       callback_url: CALLBACK_URL + TEXT_REF,
       return_url: RETURN_URL
   }

   // post request to chapa
   await axios.post("https://api.chapa.co/v1/transaction/initialize", data, config)
       .then((response) => {  
        res.redirect(response.data.data.checkout_url)
       })
       .catch((err) => console.log("err"))
}),

// verification endpoint
route.get("/verify-payment/:id", async (req, res) => {

   //verify the transaction 
   await axios.get("https://api.chapa.co/v1/transaction/verify/" + req.params.id, config)
       .then((response) => {
           console.log("Payment was successfully verified")
       }) 
       .catch((err) => console.log("Payment can't be verfied", err))
})

route.get("/payment-success", async (req, res) => {
res.send("Payment received successfully, Thank you!")
})

module.exports = route;