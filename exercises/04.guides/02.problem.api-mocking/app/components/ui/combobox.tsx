import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '#app/components/ui/command'

export function Combobox({
	id,
	name,
	placeholder,
	className,
	items,
	value,
	onChange,
}: Omit<React.ComponentProps<typeof CommandInput>, 'value'> & {
	items: Array<{ label: string; value: string }>
	value: string
	onChange: (nextValue: string) => void
}) {
	return (
		<Command className={className}>
			<CommandInput
				id={id}
				name={name}
				placeholder={placeholder}
				className="h-9"
				value={value}
			/>
			<CommandList>
				<CommandEmpty>No framework found.</CommandEmpty>
				<CommandGroup>
					{items.map((item) => (
						<CommandItem
							key={item.value}
							value={item.value}
							onSelect={(nextValue) => {
								onChange?.(nextValue === value ? '' : nextValue)
							}}
						>
							{item.label}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	)
}
