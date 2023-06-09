import WebPush from 'web-push'

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
  const subscription = {
    endpoint: 'https://wns2-db5p.notify.windows.com/w/?token=BQYAAAClK0NSsME%2f%2ft4Y%2bntHbFRVqsb8x%2fvgzZ6C03Wc4fbHgCj7R3p2w1h2qZleI89GKk03aNJRQJfVa8TStfhCTCgSdAkWd%2fnLjLJd%2bq%2bBuryldDGeqpKjFj%2fpMgwrtWtHflCgUKdtq0HB2WSohC%2fx8KyOJAURiWf90uUgbpz54OIqVmcN7MgnCp8NuiT04I56aMYRK%2fnTpZrmfUueu5DnIO9gI%2fkTSdfQ5Jlq7hv5JyLOD7hJdAHAN%2bk4sdEbMwd2EzpGuZ%2b9fGIsNZ3kqQcn2Z4CgqfIabIl5ec%2fMHXv%2b7vyflTGujognau6%2bMLheKyO7Mo%3d',
    expirationTime: null,
    keys: {
      p256dh: 'BAAIZm4l-0t_sGfYAXgSheNLeU8fAHNLQPY-cYPwv2ou-gXCwY3mmRcFbsMiSyXJnQEPn7kNbUJzhNCU2RDdnGs',
      auth: 'Q58wPM3aWO-mEZvta7wrNg'
    }
  }

  WebPush.sendNotification(subscription, JSON.stringify({
    content,
    timestamp: new Date()
  }))

  return new Response('Notification Pushed!', { status: 201 })
}