import { SocialTask } from "~/pages/quests/ui/SocialTask";

export function SocialTasks() {
	return (
		<div className='grid grid-cols-2 gap-x-[2.5rem] gap-y-3 max-md:grid-cols-1'>
			{/* TODO make map */}
			<SocialTask
				points={2000}
				title='Follow on X'
				description='Stay updated with the latest Sella trends and news!'
				complete
			/>
			<SocialTask
				points={500}
				title='Like Medium Post'
				description='Show Sella articles some love with claps!'
			/>
			<SocialTask
				points={1500}
				title='Add 🟡 Sella to username'
				description="Show support by adding 'Sella' to your username!"
			/>
			<SocialTask
				points={500}
				title='Upvote on Reddit'
				description="Think Sella’s cool? Give it an upvote on Reddit!"
			/>
			<SocialTask
				points={1500}
				title='Retweet on X'
				description='Spread the word! Share Sella with your network!'
			/>
			<SocialTask
				points={1000}
				title='Refer 1 friend'
				description='Refer a friend and share the joy!'
			/>
			<SocialTask
				points={750}
				title='Like on X'
				description='Love Sella? Hit like and let everyone know!'
			/>
			<SocialTask
				points={5000}
				title='Refer 5 friends'
				description='More friends, more fun!'
				disabled
			/>
			<SocialTask
				points={2500}
				title='Comment on X'
				description='Leave a comment and join the conversation!'
			/>
			<SocialTask
				points={15000}
				title='Refer 10 friends'
				description='Become a super referrer!'
				disabled
			/>
			<SocialTask
				points={500}
				title='Follow on Telegram'
				description='Join our Telegram Community for exclusive updates!'
			/>
			<SocialTask
				points={500}
				title='Create your first Store'
				description='Start your entrepreneurial journey!'
			/>
		</div>
	)
}
