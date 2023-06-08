self.addEventListener('push', (event) => {
  const pushContent = event.data?.text() ?? ''

  console.log(event)

  event.waitUntil(
    (async () => {
      const clients = await self.clients.matchAll({
        includeUncontrolled: true,
      })

      console.log(clients)

      // Display notification if we don't get an active client.
      if (!clients || !clients.length) {
        self.registration.showNotification('Notifier', {
          body: pushContent
        })

        return
      }

      // Send a message to the client.
      clients[0].postMessage({
        msg: pushContent,
      });
    })()
  )
})