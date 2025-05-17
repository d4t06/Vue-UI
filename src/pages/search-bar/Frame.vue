<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";

const Variant = cva("border-[2px] p-3 border-b-[6px] rounded-[14px]", {
	variants: {
		colors: {
			primary: "bg-white border-[#e1e1e1]",
			second: "bg-[#cee9b6] border-[#4a826f]",
			third: "bg-white border-[#4a826f]",
			clear: "",
		},
	},
	defaultVariants: {
		colors: "primary",
	},
});

type TypeProps = VariantProps<typeof Variant>;

type Props = {
	onClick?: () => void;
	colors?: TypeProps["colors"];
	className?: string;
};

const props = defineProps<Props>();
</script>

<template>
	<div :class="`${Variant({ colors: props.colors, className: props.className })} `">
		<slot />
	</div>
</template>
