'use client';

import { Children, PropsWithChildren, ReactNode, cloneElement, isValidElement } from "react";
import { createContextFactory } from "~/shared/lib/create-context-factory";

const create = createContextFactory('slots');

const {
	SlotsProvider,
	useSlotsContext
} = create<ReactNode>();

type RendererType<P> = React.FC<PropsWithChildren<P>>;

interface SlotProps<P> {
	showChildren?: boolean;
	restProps?: P & { defaultChildren: React.ReactNode };
}

type NormalOrFunctionChildren<P> =
	| React.ReactNode
	| ((props: P & { defaultChildren: React.ReactNode }) => React.ReactNode);

interface SlotType<P> {
	(
		props: SlotProps<P> & { children?: NormalOrFunctionChildren<P> }
	): React.ReactElement | null;
	Renderer: RendererType<P>;
}

export function createSlot<P extends object>(): SlotType<P> {
	const Slot: SlotType<P> = (({ children, showChildren, restProps }) => {
		if (!showChildren) {
			return null;
		}
		if (typeof children === 'function' && restProps) {
			return children(restProps);
		}
		return <>{children}</>;
	}) as SlotType<P>;

	const Renderer: RendererType<P> = ({ children, ...restProps }) => {
		const rootChildren = useSlotsContext();

		const slotted = Children.toArray(rootChildren).find(child => {
			return isValidElement(child) && child.type === Slot;
		});

		if (!slotted || !isValidElement(slotted)) {
			return <>{children}</>;
		}
		
		return cloneElement(slotted, ({
			showChildren: true,
			restProps: { ...restProps, defaultChildren: children },
		} as unknown) as SlotProps<P>);
	};

	Slot.Renderer = Renderer;
	return Slot;
}

export { SlotsProvider }