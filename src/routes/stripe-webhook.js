// src/routes/stripe-webhook.js
const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const env = require('../utils/env');
const stripe = new Stripe(env.STRIPE_SECRET_KEY);

router.post('/webhooks/stripe', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 建议维护“处理过的 event id”防重（也可靠业务幂等键）
  switch (event.type) {
    case 'checkout.session.completed':
      // TODO: 标记订阅已创建/客户关联
      break;
    case 'invoice.paid':
      // TODO: 标记付费成功、更新周期
      break;
    case 'customer.subscription.deleted':
      // TODO: 降级/取消
      break;
    default:
      // ignore
  }
  res.json({ received: true });
});

module.exports = router;
