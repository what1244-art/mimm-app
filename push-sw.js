// 웹 푸시 핸들러 — workbox 생성 SW에 importScripts로 포함됨 (063 푸시 도입, 2026-08-21)
self.addEventListener('push', e => {
  let d = {}
  try { d = e.data ? e.data.json() : {} } catch { d = { title: 'MIMM', body: e.data && e.data.text() } }
  e.waitUntil(self.registration.showNotification(d.title || 'MIMM 연습실', {
    body: d.body || '',
    icon: './icon-192.png',
    badge: './icon-192.png',
    tag: d.tag || undefined,
    data: { url: d.url || './' },
  }))
})

self.addEventListener('notificationclick', e => {
  e.notification.close()
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(ws => {
    for (const w of ws) if ('focus' in w) return w.focus()
    return clients.openWindow(e.notification.data?.url || './')
  }))
})
