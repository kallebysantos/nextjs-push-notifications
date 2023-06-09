import React from 'react'
import { Notification } from './NotificationList'

type NotificationProps = {
  value: Notification
}

export function Notification(
  { value: { content, timestamp } }
    : NotificationProps) {
  const displayTime = timestamp.toLocaleString('pt-BR', {
    timeZone: 'UTC'
  })

  return (
    <div className='w-full flex flex-col bg-white text-gray-900 rounded px-4 py-2'>
      <p className='font-bold text-base'>{content}</p>
      <small className='font-light text-xs'>{displayTime}</small>
    </div>
  )
}