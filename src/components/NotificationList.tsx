'use client'

import React, { useEffect, useState } from "react"
import { Notification } from "./Notification"

export type Notification = {
  content: string
  timestamp: Date
}

window.Notification.requestPermission()
  .then((permission) => {
    if (permission !== "granted") return;
  })

const worker = navigator.serviceWorker

if (window.Notification.permission) {
  worker
    .register('/workers/notification-sw.js')
    .then(async worker => {
      let subscription = await worker.pushManager.getSubscription()

      if (!subscription) {
        const publicKey = await fetch('/api/sub')
          .then(res => res.text())

        console.log(publicKey)

        subscription = await worker.pushManager.subscribe({
          applicationServerKey: publicKey,
          userVisibleOnly: true
        })
      }

      await fetch('/api/sub', {
        method: 'POST',
        body: JSON.stringify({ subscription })
      })
    })
}

export function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    if (worker) {
      worker.addEventListener('message', ({ data }) => {
        const notification: Notification = JSON.parse(data.msg)

        setNotifications(old => [...old, notification])
      });
    }
  }, [worker])

  return !!notifications.length ? (
    <ul className="w-full flex flex-col gap-2">
      {
        notifications.map((notificationValue, i) => (
          <li key={i}>
            <Notification value={notificationValue} />
          </li>
        ))
      }
    </ul>
  ) :
    (
      <div>
        <p>You don't have any notification</p>
      </div>
    )
}