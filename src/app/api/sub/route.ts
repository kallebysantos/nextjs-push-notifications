import WebPush from 'web-push'


WebPush.setVapidDetails(
  process.env.VERCEL_URL ?? '',
  process.env.PUBLIC_NOTIFICATION_KEY ?? '',
  process.env.PRIVATE_NOTIFICATION_KEY ?? ''
)


export async function GET() {
  return new Response(process.env.PUBLIC_NOTIFICATION_KEY ?? '')
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