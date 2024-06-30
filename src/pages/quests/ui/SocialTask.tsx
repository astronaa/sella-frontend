import { cn } from "~/shared/lib/cn";
import { PointsButton } from "~/pages/quests/ui/PointsButton";
import { Icons } from "~/shared/ui/icons";

export function SocialTask({
	                           title,
	                           description,
	                           disabled,
	                           complete,
	points
}: {
	title: string
	description: string
	disabled?: boolean
	complete?: boolean
	points: number
}) {
	return (
		<div className='border border-secondary p-[1rem] rounded-[1.25rem] flex justify-between items-center gap-4'>
			<div className='flex flex-col gap-1'>
				<div
					className={cn('flex items-center gap-1 text-white font-bold', {
						'text-black-60': disabled
					})}
				>
					{disabled && <Icons.Lock/>}
					{title}
				</div>
				<div className='text-black-40'>{description}</div>
			</div>
			{complete
				? (
					<div
						className='flex items-center text-accent-100 border border-secondary rounded-[0.75rem] px-[1rem] h-[2.375rem]'
					>
						COMPLETE
					</div>
				) : (
					<PointsButton disabled={disabled} points={points}/>
				)
			}
		</div>
	)
}
