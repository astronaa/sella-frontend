'use client';

import { ComponentProps, HTMLAttributes, useMemo } from "react";
import { SystemMessageProvider, useSystemMessageStrictContext } from "./context";
import { useCallbackRef } from "~/shared/lib/use-callback-ref";
import { systemMessageTypes } from "./types";
import { ChatSystemMessageTypes } from "~/shared/api/client";
import { cn } from "~/shared/lib/cn";
import { DividerWithElement } from "~/shared/ui/kit/divider";
import { dayJs } from "~/shared/lib/dayjs";

export interface RootProps extends HTMLAttributes<HTMLDivElement> {
	message: {
		systemType: ChatSystemMessageTypes | null
		systemData: Record<string, string>,
		createdAt: string
	}
}

export function Root({ message, className, children, ...props }: RootProps) {
	const { systemData, systemType, createdAt } = message;

	const getSystemData = useCallbackRef(() => systemData);

	const value = useMemo(() => {
		if (!systemType)
			return null;
		
		const attrs = systemMessageTypes.get(systemType);
		if (!attrs)
			return null;

		return { ...attrs, createdAt, getSystemData }
	}, [systemType, createdAt, getSystemData])

	if (!value)
		return null;

	return (
		<SystemMessageProvider value={value}>
			<div
				{...props}
				className={cn('flex flex-col items-center gap-[0.75rem] w-full max-w-[40.625rem]', value.className, className)}
			>
				{children}
			</div>
		</SystemMessageProvider>
	)
}

export type IconProps = HTMLAttributes<HTMLDivElement>;

export function Icon({ className, ...props }: IconProps) {
	const { Icon } = useSystemMessageStrictContext();

	return (
		<div
			{...props}
			className={cn('flex items-center justify-center size-[2rem] rounded-full bg-current', className)}
		>
			<Icon className='size-[62.5%] text-black' />
		</div>
	)
}

export type ContentProps = HTMLAttributes<HTMLDivElement>;

export function Content({ className, ...props }: ContentProps) {
	return (
		<div
			{...props}
			className={cn('flex flex-col items-center w-full gap-[0.5rem] text-center', className)}
		/>
	)
}

export type TitleProps = HTMLAttributes<HTMLHeadingElement>

export function Title({ className, ...props }: TitleProps) {
	const { title } = useSystemMessageStrictContext();

	if (!title)
		return null;

	return (
		<h5
			{...props}
			className={cn('font-semibold', className)}
		>
			{title}
		</h5>
	)
}

export type DescriptionProps = HTMLAttributes<HTMLHeadingElement>

export function Description(props: DescriptionProps) {
	const { description } = useSystemMessageStrictContext();

	return (
		<p {...props}>
			{description}
		</p>
	)
}

export function Meta() {
	const { Meta, getSystemData } = useSystemMessageStrictContext();
	if (!Meta)
		return null;

	return <Meta data={getSystemData()} />
}

export type TimeProps = ComponentProps<typeof DividerWithElement>

export function Time({ className, ...props }: TimeProps) {
	const { createdAt } = useSystemMessageStrictContext();

	return (
		<DividerWithElement
			{...props}
			className={cn('w-full max-w-[28.75rem] text-black-60', className)}
		>
			{dayJs(createdAt).format("HH:mm")}
		</DividerWithElement>
	);
}

export type ComposedProps = RootProps;

export function Composed(props: RootProps) {
	return (
		<Root {...props}>
			<Icon />
			<Content>
				<Title />
				<Description />
				<Meta />
			</Content>
			<Time />
		</Root>
	);
}