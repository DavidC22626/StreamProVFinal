const express = require("express");
const router = express.Router();
const client = require("../config/mercadopago");
const conexion = require("../config/conexion");

router.post("/crear-suscripcion", async (req, res) => {
    try {
        const { email, plan, precio, userId } = req.body;

        const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${client.accessToken}`
            },
            body: JSON.stringify({
                items: [{
                    title: `Suscripción Premium StreamPro - $${precio}/mes`,
                    description: "Plan mensual premium",
                    quantity: 1,
                    unit_price: precio,
                    currency_id: "COP"
                }],
                payer: {
                    email: email
                },
                external_reference: userId ? `user_${userId}` : `user_${Date.now()}`,
                back_urls: {
                    success: "http://localhost:3000/suscripcion-exitosa",
                    pending: "http://localhost:3000/suscripcion-pendiente",
                    failure: "http://localhost:3000/suscripcion-fallida"
                }
            })
        });

        const result = await response.json();

        if (result.error) {
            throw new Error(result.error.message || JSON.stringify(result.error));
        }

        console.log("Resultado MP:", result);

        if (userId) {
            conexion.query(
                "INSERT INTO suscripciones (cod_user, id_mp, cod_plan_scrip, duracion_scrip, estado, fecha_compra_scrip, fecha_inicio) VALUES (?, ?, ?, 30, ?, NOW(), NOW())",
                [userId, result.id, plan === 'premium' ? 1 : 1, "pendiente"],
                (err) => {
                    if (err) console.error("Error guardando suscripción:", err);
                }
            );
        }

        res.json({
            success: true,
            init_point: result.init_point,
            id: result.id
        });
    } catch (error) {
        console.error("Error al crear suscripción:", error);
        res.json({
            success: false,
            message: error.message || "Error al procesar la suscripción"
        });
    }
});

router.post("/webhook", async (req, res) => {
    try {
        const topic = req.query.topic;
        const id = req.query.id;

        console.log("Webhook recibido:", topic, id);

        if (topic === "payment") {
            const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
                headers: {
                    "Authorization": `Bearer ${client.accessToken}`
                }
            });
            const payment = await response.json();

            console.log("Estado pago:", payment.status);

            if (payment.status === "approved") {
                const externalRef = payment.external_reference;
                const userId = externalRef.replace("user_", "");

                conexion.query(
                    "UPDATE suscripciones SET estado = ? WHERE cod_user = ? AND id_mp = ?",
                    ["activa", userId, id],
                    (err, result) => {
                        if (err) {
                            console.error("Error actualizando suscripción:", err);
                        } else {
                            console.log("Suscripción activada para usuario:", userId);
                        }
                    }
                );
            }
        }

        res.status(200).json({ received: true });
    } catch (error) {
        console.error("Error en webhook:", error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/suscripcion-exitosa", (req, res) => {
    res.send("Suscripción activada correctamente. Tu acceso será habilitado en breve.");
});

router.get("/suscripcion-pendiente", (req, res) => {
    res.send("Pago pendiente. Te notificaremos cuando se complete.");
});

router.get("/suscripcion-fallida", (req, res) => {
    res.send("El pago no se pudo completar. Intenta de nuevo.");
});

router.get("/verificar-suscripcion", (req, res) => {
    const userId = req.session.codUser;
    if (!userId) {
        return res.json({ activa: false });
    }

    conexion.query(
        "SELECT estado FROM suscripciones WHERE cod_user = ? ORDER BY cod_scrip DESC LIMIT 1",
        [userId],
        (err, rows) => {
            if (err || rows.length === 0) {
                return res.json({ activa: false });
            }
            res.json({ activa: rows[0].estado === "activa" });
        }
    );
});

module.exports = router;