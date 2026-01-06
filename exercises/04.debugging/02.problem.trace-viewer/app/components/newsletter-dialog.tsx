import { useState } from 'react'
import { Field } from './forms'
import { Button } from './ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from './ui/dialog'

export function NewsletterDialog() {
	const [isOpen, setOpen] = useState(true)

	return (
		<Dialog modal={true} open={isOpen} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Subscribe to newsletter</DialogTitle>
					<DialogDescription>
						<p>Join our newsletter to receive updates and unique offers.</p>
						<Field
							className="mt-4"
							labelProps={{ children: 'Your name' }}
							inputProps={{
								name: 'email',
								placeholder: 'Kody',
								required: true,
							}}
						/>
						<Field
							labelProps={{ children: 'Your email' }}
							inputProps={{
								name: 'email',
								type: 'email',
								placeholder: 'kody@epicweb.dev',
								required: true,
							}}
						/>
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button
						type="button"
						variant="secondary"
						onClick={() => setOpen(false)}
					>
						Close
					</Button>
					<Button type="submit">Subscribe</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
