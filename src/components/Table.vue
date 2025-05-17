<script setup lang="ts">
type Props = {
	className?: string;
	colList: string[];
};

const props = defineProps<Props>();
</script>

<template>
	<div class="rounded-md overflow-hidden">
		<table
			:class="`w-full [&_td]:text-sm hover:[&_tr]:bg-black/5 [&_tbody_tr]:border-t [&_tr]:border-black/5 [&_th]:text-sm [&_th]:text-left [&_td]:p-2 [&_th]:p-2 ${props.className}`"
		>
			<thead>
				<tr>
					<th v-for="col in props.colList">{{ col }}</th>
				</tr>
			</thead>
			<tbody>
				<slot />
			</tbody>
		</table>
	</div>
</template>
