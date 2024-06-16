import { cn } from "~/shared/lib/cn";

export function SocialTask({
	                           title,
	                           description,
	                           disabled,
}: {
	title: string
	description: string
	disabled?: boolean
}) {
	return (
		<div className='border border-secondary p-[1rem] rounded-[1.25rem] flex gap-4'>
			<div className='flex flex-col gap-1'>
				<div
					className={cn('text-white font-bold', {
						'text-black-60': disabled
					})}
				>
					{title}
				</div>
				<div className='text-black-40'>{description}</div>
			</div>

		</div>
	)
}
