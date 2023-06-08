import { NotificationList } from "@/components/NotificationList";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>React Push notifications app</h1>

      <NotificationList />
    </main>
  )
}
