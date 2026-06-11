export default {
  document: {
    title: 'Pay per document',
    preparing: 'Preparing checkout…',
    waiting: 'Waiting for payment confirmation…',
    paddleDesc: 'Pay {price} with Paddle to process and download this document.',
    demoDesc: 'Pay {price} to process and download this document. Payment does not include future conversions.',
    reopenPaddle: 'Reopen Paddle checkout',
    pay: 'Pay {price}',
    proNotice: 'You have a Pro plan — you should not see this modal.',
    errors: {
      incomplete: 'Incomplete Paddle checkout.',
      createFailed: 'Could not create document checkout.',
      initFailed: 'Could not start document payment.',
      completeFailed: 'Could not complete payment.',
    },
  },
  pro: {
    title: 'Pro subscription',
    perMonth: '{price} / month',
    preparing: 'Preparing checkout…',
    waiting: 'Waiting for payment confirmation…',
    paddleDesc: 'Secure payment with Paddle. Your plan stays FREE until payment is confirmed.',
    demoDesc: 'Your plan stays FREE until you confirm payment. Unlimited conversions and downloads once Pro is active.',
    reopenPaddle: 'Reopen Paddle checkout',
    pay: 'Pay {price} and activate Pro',
    confirming: 'Confirming payment…',
    errors: {
      incomplete: 'Incomplete Paddle checkout.',
      intentFailed: 'Could not create payment intent.',
      initFailed: 'Could not start Pro checkout.',
      confirmFailed: 'Could not confirm Pro payment.',
      notStarted: 'Checkout not started. Close and try again.',
      paymentsDisabled:
        'Payments are not configured on the server. Contact the administrator or configure Paddle in .env.',
    },
  },
  subscription: {
    expires: 'Expires:',
  },
};
