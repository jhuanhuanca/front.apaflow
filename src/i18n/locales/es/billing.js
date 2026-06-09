export default {
  document: {
    title: 'Pago por documento',
    preparing: 'Preparando checkout…',
    waiting: 'Esperando confirmación del pago…',
    paddleDesc: 'Paga {price} con Paddle para procesar y descargar este documento.',
    demoDesc: 'Paga {price} para procesar y descargar este documento. El pago no incluye conversiones futuras.',
    reopenPaddle: 'Reabrir checkout Paddle',
    pay: 'Pagar {price}',
    proNotice: 'Tienes plan Pro — no deberías ver este modal.',
    errors: {
      incomplete: 'Checkout Paddle incompleto.',
      createFailed: 'No se pudo crear el checkout del documento.',
      initFailed: 'No se pudo iniciar el pago del documento.',
      completeFailed: 'No se pudo completar el pago.',
    },
  },
  pro: {
    title: 'Suscripción Pro',
    perMonth: '{price} / mes',
    preparing: 'Preparando checkout…',
    waiting: 'Esperando confirmación del pago…',
    paddleDesc: 'Pago seguro con Paddle. Tu plan seguirá siendo FREE hasta confirmar el pago.',
    demoDesc: 'Tu plan seguirá siendo FREE hasta que confirmes el pago. Conversiones y descargas ilimitadas al activar Pro.',
    reopenPaddle: 'Reabrir checkout Paddle',
    pay: 'Pagar {price} y activar Pro',
    confirming: 'Confirmando pago…',
    errors: {
      incomplete: 'Checkout Paddle incompleto.',
      intentFailed: 'No se pudo crear la intención de pago.',
      initFailed: 'No se pudo iniciar el checkout Pro.',
      confirmFailed: 'No se pudo confirmar el pago Pro.',
      notStarted: 'Checkout no iniciado. Cierra y vuelve a intentarlo.',
    },
  },
  subscription: {
    expires: 'Vence:',
  },
};
