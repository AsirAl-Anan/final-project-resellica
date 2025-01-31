userRouter.post('/api/v1/stripe-webhook', async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        // Update transaction status in the database
        await transactionModel.findOneAndUpdate(
          { stripePaymentIntentId: paymentIntent.id },
          { status: 'completed' }
        );
        break;
      case 'payment_intent.payment_failed':
        const failedPaymentIntent = event.data.object;
        // Update transaction status in the database
        await transactionModel.findOneAndUpdate(
          { stripePaymentIntentId: failedPaymentIntent.id },
          { status: 'failed' }
        );
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  
    res.json({ received: true });
  });