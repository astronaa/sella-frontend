import { VTagsInput as BaseVTagsInput, VTagsInputProps } from "~/shared/ui/validation-inputs";
import { useGetAll } from "../api/queries";
import { Skeleton } from "~/shared/ui/kit/skeleton";

export function VTagsInput(props: Omit<VTagsInputProps, 'items'>) {
	const { data: categories, isLoading } = useGetAll();
	const items = categories?.map(c => ({ label: c.name, value: c.name }));

	return (
		<Skeleton loading={isLoading}>
			<BaseVTagsInput
				{...props}
				items={items ?? []}
			/>
		</Skeleton>
	);
}