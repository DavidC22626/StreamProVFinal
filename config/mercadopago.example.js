const { MercadoPagoConfig } = require("mercadopago");

const client = new MercadoPagoConfig({
    accessToken: "TU_ACCESS_TOKEN"
});

module.exports = client;
