import WebPush, { PushSubscription } from 'web-push'
import { kv } from '@vercel/kv';

export type PushNotificationPayload = {
  content: string
}

const currentVercelURL = process.env.VERCEL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.VERCEL_URL

WebPush.setVapidDetails(
  currentVercelURL ?? '',
  process.env.PUBLIC_NOTIFICATION_KEY ?? '',
  process.env.PRIVATE_NOTIFICATION_KEY ?? ''
)

export async function POST(request: Request) {
  const { content }: PushNotificationPayload = await request.json();

  const clients = await kv.llen('clients')

  for (let index = 0; index < clients; index++) {
    const value = await kv.lindex('clients', index)

    console.log(value);

    const subscription: PushSubscription = value

    WebPush.sendNotification(subscription, JSON.stringify({
      content,
      timestamp: new Date()
    }))
  }

  return new Response('Notification Pushed!', { status: 201 })
}