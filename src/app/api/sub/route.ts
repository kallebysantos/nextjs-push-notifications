import WebPush from 'web-push'

// Should be stored as Env secrets
const VAPIDKeys = {
  publicKey: 'BPoHB2L2w5JRVL5ZCCKfdvqsN0l0htvXA6wrrLMOp0BG37tLBfQFxZ1iFCXJrCyYE6MMZzyqCSMgYxtGaITXgQU',
  privateKey: 'ozzhzPBPy7QRjB9ti7_VbZSfoCucC3G5OVlKpR09QhM'
}

WebPush.setVapidDetails('http://localhost:3000', VAPIDKeys.publicKey, VAPIDKeys.privateKey)


export async function GET() {
  return new Response(VAPIDKeys.publicKey)
}

export type SubscribePayload = {
  subscription: PushSubscription
}

export async function POST(req: Request) {
  const payload: SubscribePayload = await req.json()

  // Should store subscription with related user
  console.log('New user has subscribed!', payload)

  return new Response('Subscribed', { status: 201 })
}