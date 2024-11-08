import { Skeleton, Stack } from "@mantine/core";

function SideNavSkeleton() {
	return (
		<Stack style={{ flexGrow: 1 }}>
			<Skeleton
				height={30}
				radius="md"
				mb="sm"
			/>
			<Skeleton
				height={30}
				radius="md"
				mb="sm"
			/>
			<Skeleton
				height={30}
				radius="md"
				mb="sm"
			/>
			<Skeleton
				height={30}
				radius="md"
				mb="sm"
			/>
			<Skeleton
				height={30}
				radius="md"
				mb="sm"
			/>
		</Stack>
	);
}

export default SideNavSkeleton;
