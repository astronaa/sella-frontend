'use client'

import { Button } from "~/shared/ui/kit/button";
import { Icons } from "~/shared/ui/icons";
import { PinInput } from "~/shared/ui/kit/pin-input";
import { VTextControl } from "~/shared/ui/validation-inputs";
import { z } from "zod";
import { Form } from "react-final-form";
import { zodValidate } from "~/shared/lib/zod-final-form";
import { Product, Store } from "~/shared/api/model";
import { StoreCard } from "~/entities/store";
import { ProductCard } from "~/entities/product";
import { Pagination } from "~/shared/ui/kit/pagination";
import { Controls, DotLottiePlayer } from "@dotlottie/react-player";
import { useDialogState } from "~/shared/lib/dialog";
import { RegisterDialog } from "~/features/register";
import { AuthChannelsSetupTwoFaDialog } from "~/features/auth-channels";
import { RegisterFlowDialog } from "~/widgets/register-flow";
import { StoreCreateDialog } from "~/features/store/create";
import { ProductCreateDialog } from "~/features/product/create";
import { RadioGroup, ToggleGroup, Select, Tabs } from "~/shared/ui/kit";
import { ProductManageDialog } from "~/features/product/manage";
import { StoreManageDialog } from "~/features/store/manage";
import { StoreReportFlow } from "~/features/store/report"

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center gap-16 p-24">
			<div className='flex gap-4 max-md:flex-wrap'>
				<Button variant='outline'>
					Buy $SELLA
				</Button>
				<Button variant='solid'>
					Open Storefront
				</Button>
				<Button colorPalette='gray'>
					Open Storefront
				</Button>

				<div className='flex flex-col gap-3'>
					<Button variant='subtle' colorPalette='red'>
						<Icons.ThumbDown /> Negative
					</Button>
					<Button variant='subtle' colorPalette='red' active>
						<Icons.ThumbDown /> Negative
					</Button>
					<Button variant='subtle' colorPalette='green'>
						<Icons.ThumbUp /> Positive
					</Button>
					<Button variant='subtle' colorPalette='green' active>
						<Icons.ThumbUp /> Positive
					</Button>
				</div>

				<div className='flex flex-col gap-4'>
					<div className='flex gap-4 max-md:flex-wrap'>
						{Object.entries(Icons).map(([iconName, Icon]) => (
							<Icon className='text-accent-100' key={iconName} />
						))}
					</div>

					<div className='grid grid-cols-3 gap-4 max-md:grid-cols-1'>
						<RegisterDialogTest />
						<Setup2faDialogTest />
						<StoreCreateDialogTest />
						<StoreManageDialogTest />
						<ProductCreateDialogTest />
						<ProductManageDialogTest />
						<RegisterFlowDialogTest />
						<StoreReportFlow />
					</div>
				</div>
			</div>

			<div className='flex gap-8 max-md:flex-wrap'>
				<RadioGroupTest />

				<div className='flex flex-col gap-3'>
					<PinInput length={4} defaultValue={['2', '3']} />
					<PinInput length={4} error defaultValue={['2']} />
				</div>

				<div className='flex flex-col gap-3'>
					<div className='flex gap-4'>
						<ValidationTest />
						<SelectTest />
					</div>

					<Pagination count={190} pageSize={10} siblingCount={1} defaultPage={1} />

					<TabsTest />
				</div>
			</div>

			<div className='flex gap-3 max-md:flex-wrap'>
				<ToggleGroupTest />
			</div>

			<div className='flex gap-8 items-start max-md:flex-wrap'>
				<StoreCardTest />
				<ProductCardTest />

				<DotLottiePlayer className='size-[15rem]' src='/lottie/chicken.lottie' autoplay>
					<Controls />
				</DotLottiePlayer>
			</div>
		</main>
	);
}

function ToggleGroupTest(props: ToggleGroup.RootProps) {
	const options = [
		{ id: '1', label: 'Spam' },
		{ id: '2', label: 'Nudity' },
		{ id: '3', label: 'Scam' },
		{ id: '4', label: 'Illegal' },
	]

	return (
		<ToggleGroup.Root multiple {...props}>
			{options.map(({ id, label }) => (
				<ToggleGroup.Item key={id} value={id} aria-label={label}>
					{label}
				</ToggleGroup.Item>
			))}
		</ToggleGroup.Root>
	)
}

function RadioGroupTest(props: RadioGroup.RootProps) {
	const options = [
		{ id: '1', label: 'Pay with $SELLA' },
		{ id: '2', label: 'Pay with $USDT' },
		{ id: '3', label: 'Pay with $CLICK', disabled: true },
	]

	return (
		<RadioGroup.Root defaultValue="react" {...props}>
			{options.map((option) => (
				<RadioGroup.Item key={option.id} value={option.id} disabled={option.disabled}>
					<RadioGroup.ItemControl />
					<RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
				</RadioGroup.Item>
			))}
		</RadioGroup.Root>
	)
}

const schema = z.object({
	test: z.string().min(3, 'Min 3 symbols')
})

function ValidationTest() {
	return (
		<Form
			onSubmit={() => { return; }}
			validate={zodValidate(schema)}
		>
			{() => (
				<div className='flex gap-4'>
					<VTextControl.Root name='test'>
						<VTextControl.Label>Input</VTextControl.Label>
						<VTextControl.Input />
						<VTextControl.Description>
							Description
						</VTextControl.Description>
						<VTextControl.ErrorText />
					</VTextControl.Root>
				</div>
			)}
		</Form>
	);
}

const store: Store = {
	id: 1,
	name: 'Store Name',
	shortName: '@storename',
	description: 'Market, Limit, Stop Limit, and Auction Mode orders.',
	isVerified: true,
	previewImage: null,
	rating: {
		likes: 10,
		dislikes: 2,
		reviewsCount: 575
	}
}

function StoreCardTest() {
	return (
		<StoreCard.Root store={store}>
			<StoreCard.ImageDesktop />

			<StoreCard.Content>
				<StoreCard.Title>
					<StoreCard.ImageMobile />
				</StoreCard.Title>
				<StoreCard.Description />
				<StoreCard.Rating />
			</StoreCard.Content>
		</StoreCard.Root>
	);
}

const product: Product = {
	id: 2,
	name: 'Product Name',
	description: 'Market, Limit, Stop Limit, and Auction Mode orders.',
	shortDescription: 'Market, Limit, Stop Limit, and Auction Mode orders.',
	previewImage: null,
	galleryImages: [],
	category: 'Category',
	price: 2.99
}

function ProductCardTest() {
	return (
		<ProductCard.Root product={product}>
			<ProductCard.Image />

			<ProductCard.Content>
				<ProductCard.Title />
				<ProductCard.Description />
				<ProductCard.Price />
			</ProductCard.Content>
		</ProductCard.Root>
	);
}

function RegisterDialogTest() {
	const { isOpen, open, handleOpenChange } = useDialogState();

	return (
		<>
			<Button colorPalette='gray' onClick={open}>
				Register
			</Button>

			<RegisterDialog
				open={isOpen} onOpenChange={handleOpenChange}
			/>
		</>
	);
}

function StoreCreateDialogTest() {
	const { isOpen, open, handleOpenChange } = useDialogState();

	return (
		<>
			<Button colorPalette='gray' onClick={open}>
				Create Store
			</Button>

			<StoreCreateDialog
				open={isOpen} onOpenChange={handleOpenChange}
			/>
		</>
	);
}

function StoreManageDialogTest() {
	const { isOpen, open, handleOpenChange } = useDialogState();

	return (
		<>
			<Button colorPalette='gray' onClick={open}>
				Manage Store
			</Button>

			<StoreManageDialog
				store={store}
				open={isOpen}
				onOpenChange={handleOpenChange}
			/>
		</>
	);
}

function ProductCreateDialogTest() {
	const { isOpen, open, handleOpenChange } = useDialogState();

	return (
		<>
			<Button colorPalette='gray' onClick={open}>
				Create Product
			</Button>

			<ProductCreateDialog
				storeId={1}
				open={isOpen}
				onOpenChange={handleOpenChange}
			/>
		</>
	);
}

function ProductManageDialogTest() {
	const { isOpen, open, handleOpenChange } = useDialogState();

	return (
		<>
			<Button colorPalette='gray' onClick={open}>
				Manage Product
			</Button>

			<ProductManageDialog
				product={product}
				open={isOpen}
				onOpenChange={handleOpenChange}
			/>
		</>
	);
}

function Setup2faDialogTest() {
	const { isOpen, open, handleOpenChange } = useDialogState();

	return (
		<>
			<Button colorPalette='gray' onClick={open}>
				Setup 2fa
			</Button>

			<AuthChannelsSetupTwoFaDialog
				open={isOpen} onOpenChange={handleOpenChange}
				cancelButton={
					<Button className='w-full' colorPalette='gray'>
						Setup Later
					</Button>
				}
			/>
		</>
	);
}

function RegisterFlowDialogTest() {
	const { isOpen, open, handleOpenChange } = useDialogState();

	return (
		<>
			<Button onClick={open}>
				Register Flow
			</Button>

			<RegisterFlowDialog
				open={isOpen}
				onOpenChange={handleOpenChange}
			/>
		</>
	);
}

const SelectTest = () => {
	const items = [
		{ label: 'My Sales', value: 'sales' },
		{ label: 'My Orders', value: 'orders' },
	]

	return (
		<Select.Root
			items={items}
			defaultValue={['sales']}
		>
			<Select.Label>Framework</Select.Label>
			<Select.Control>
				<Select.Trigger asChild>
					<Button colorPalette='gray'>
						<Select.ValueText />
						<Icons.ChevronDown />
					</Button>
				</Select.Trigger>
			</Select.Control>
			<Select.Positioner>
				<Select.Content>
					<Select.ItemGroup id='options'>
						{items.map((item) => (
							<Select.Item key={item.value} item={item}>
								<Select.ItemText>{item.label}</Select.ItemText>
							</Select.Item>
						))}
					</Select.ItemGroup>
				</Select.Content>
			</Select.Positioner>
		</Select.Root>
	)
}

function TabsTest() {
	const options = [
		{ id: 'react', label: 'React' },
		{ id: 'solid', label: 'Solid' },
		{ id: 'vue', label: 'Vue' },
	]

	return (
		<Tabs.Root defaultValue="react">
			<Tabs.List>
				{options.map((option) => (
					<Tabs.Trigger key={option.id} value={option.id}>
						{option.label}
					</Tabs.Trigger>
				))}
				<Tabs.Indicator />
			</Tabs.List>
			<Tabs.Content value="react">Know React? Check out Solid!</Tabs.Content>
			<Tabs.Content value="solid">Know Solid? Check out Svelte!</Tabs.Content>
			<Tabs.Content value="vue">Know Vue? Check out React!</Tabs.Content>
		</Tabs.Root>
	);
}