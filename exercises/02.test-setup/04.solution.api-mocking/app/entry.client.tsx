import { startTransition } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { HydratedRouter } from 'react-router/dom'

if (ENV.MODE === 'production' && ENV.SENTRY_DSN) {
	void import('./utils/monitoring.client.tsx').then(({ init }) => init())
}

async function enableMocking() {
	if (ENV.MODE === 'development') {
		const { http, HttpResponse } = await import('msw')
		const { setupWorker } = await import('msw/browser')
		const worker = setupWorker(
			http.get(
				'https://maps.googleapis.com/maps/api/place/findplacefromtext/json',
				() => {
					return HttpResponse.json({
						candidates: [
							{
								place_id: crypto.randomUUID(),
								formatted_address: 'San Francisco',
							},
							{
								place_id: crypto.randomUUID(),
								formatted_address: 'San Jose',
							},
						],
					})
				},
			),
		)
		await worker.start()
	}
}

enableMocking().then(() => {
	startTransition(() => {
		hydrateRoot(document, <HydratedRouter />)
	})
}, console.error)
