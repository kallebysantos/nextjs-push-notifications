'use client'

import React, { useState } from "react"
import { Notification } from "./Notification"

export type Notification = {
  content: string
  timestamp: Date
}

export function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  return !!notifications.length ? (
    <ul className="w-full flex flex-col gap-2">
      {
        notifications.map((notificationValue) => (
          <li>
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