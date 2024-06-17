import { FC } from "react";

export function MarketingCard({ title, items }: {
	title: string
	items: {
		Icon: FC<{ className?: string }>
		text: string
	}[]
}) {
	return (
		<div className='bg-white/[.02] border border-secondary p-[1.25rem] rounded-[1.25rem] flex flex-col gap-4'>
			<div className='text-white font-bold text-xl'>
				{title}
			</div>

			<div className='flex flex-col gap-2'>
				{items.map(({ Icon, text }) => (
					<div key={text} className='flex gap-[0.375rem] text-black-40 font-semibold'>
						<Icon className='w-[1.25rem] h-[1.25rem]'/>
						<span className='text-[15px] font-[500]'>{text}</span>
					</div>
				))}
			</div>
		</div>
	)
}
