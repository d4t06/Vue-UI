<script lang="ts" setup>
type Props = {
	className: string;
	position: string;
	content: string;
	finalOpen: boolean;
};

const props = defineProps<Props>();

const classes = {
	container: `bg-slate-700 text-white`,
};
</script>

<template>
	<slot />
	<div
		v-if="props.finalOpen"
		:class="`${classes.container} absolute whitespace-nowrap -translate-x-1/2 left-1/2 rounded-md ${props.position} ${props.className}`"
	>
		{{ props.content }}
	</div>
</template>
