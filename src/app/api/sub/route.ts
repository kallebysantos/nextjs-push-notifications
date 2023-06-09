import WebPush from 'web-push'
import { kv } from '@vercel/kv';

const currentVercelURL = process.env.VERCEL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.VERCEL_URL

WebPush.setVapidDetails(
  currentVercelURL ?? '',
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

  // Store subscription with related user
  const savedRows = await kv.lpush(
    'clients',
    JSON.stringify(payload.subscription)
  )

  if (!savedRows) {
    return new Response('Not Subscribed', { status: 422 })
  }

  console.log('New user has subscribed!', payload)

  return new Response('Subscribed', { status: 201 })
}