'use client';

import { Children, HTMLAttributes, cloneElement, createContext, isValidElement, useContext, useMemo } from "react";
import { invariant } from "~/shared/lib/asserts";
import { cn } from "~/shared/lib/cn";

type TableConfig = { width: string }[];

interface RootProps extends HTMLAttributes<HTMLDivElement> {
	config: TableConfig
}

interface ContextProps {
	config: TableConfig
}

const context = createContext<ContextProps | null>(null);

function useTableContext() {
	const value = useContext(context);
	invariant(value, 'Usage of useTableContext outside context');
	return value;
}

export function Root({ config, className, children, ...props }: RootProps) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const contextValue = useMemo(() => ({ config }), config.map(c => c.width));

	return (
		<context.Provider value={contextValue}>
			<div {...props} className={cn('flex flex-col gap-[1.5rem]', className)}>
				{children}
			</div>
		</context.Provider>
	);
}

export function Head({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
	const { config } = useTableContext();

	return (
		<div
			{...props}
			className={cn('flex w-full rounded-[1rem] border border-secondary py-[0.625rem] text-black-60', className)}
		>
			{Children.map(children, (child, index) => (
				isValidElement<HTMLElement>(child) && (
					cloneElement(child, {
						...child.props,
						style: {
							...child.props.style,
							maxWidth: config[index].width
						},
						className: cn(
							'flex-grow px-[1rem] w-full',
							child.props.className
						)
					})
				)
			))}
		</div>
	);
}

export function Body({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			{...props}
			className={cn('flex flex-col w-full', className)}
		/>
	);
}

export function RowFullSpan({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			{...props}
			className={cn('flex w-full items-center rounded-[1rem] py-[0.5rem] text-black-40 odd:bg-white/[.04] h-[3.375rem]', className)}
		/>
	);
}

export function Row({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
	const { config } = useTableContext();

	return (
		<RowFullSpan
			{...props} className={className}
		>
			{Children.map(children, (child, index) => (
				isValidElement<HTMLElement>(child) && (
					cloneElement(child, {
						...child.props,
						style: {
							...child.props.style,
							maxWidth: config[index].width
						},
						className: cn(
							'flex-grow px-[1rem] w-full truncate',
							child.props.className,
						)
					})
				)
			))}
		</RowFullSpan>
	);
}