<script setup lang="ts">
type Props = {
	className?: string;
};

const props = withDefaults(defineProps<Props>(), { className: "" });
</script>

<template>
	<div :class="props.className">
		<img class="mx-auto" src="/search-empty.png" alt="" />
		<p class="text-center">No result found, ¯\_(ツ)_/¯</p>
	</div>
</template>
