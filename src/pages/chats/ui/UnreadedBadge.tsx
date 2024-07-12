export function UnreadedBadge({ count }: { count: number }) {
	return (
		<span
			className="flex items-center justify-center w-[1.5rem] h-[1.5rem] 
				min-w-[1.5rem] min-h-[1.5rem] rounded-full bg-red-100 text-white font-inter"
		>
			{count}
		</span>
	);
}