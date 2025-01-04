<script setup lang="ts">
import { ref, toRefs, watchEffect, computed } from "vue";
import TooltipChild from "./TooltipChild.vue";
import { injectParitalPopup } from "../popup/PopupProvider";

type Props = {
	className?: string;
	position?: string;
	wrap?: boolean;
	content: string;
};

const props = withDefaults(defineProps<Props>(), {
	className: "px-2 py-1 text-sm font-[600]",
	position: "bottom-[calc(100%+8px)]",
	content: "This is tooltip content",
	wrap: true,
});

const { className, content, wrap, position } = toRefs(props);

const popupProps = injectParitalPopup();

const open = ref(false);

const triggerRef = ref<HTMLElement>();

const finalOpen = computed(() =>
	!!popupProps ? !popupProps.state.isOpen.value && open.value : open.value,
);

const handleMouseEnter = () => {
	if ("ontouchstart" in document.documentElement) return;
	open.value = true;
};

const handleMouseLeave = () => {
	open.value = false;
};

watchEffect(() => {
	console.log(popupProps && popupProps.triggerRef.value?.inner);

	const targetElement = !!popupProps
		? popupProps.triggerRef?.value?.inner
		: triggerRef.value;

	if (targetElement) {
		targetElement.addEventListener("mouseenter", handleMouseEnter);
		targetElement.addEventListener("mouseleave", handleMouseLeave);
	}
});
</script>
<template>
	<template v-if="popupProps ? popupProps?.appendTo === 'portal' : wrap">
		<div class="relative">
			<TooltipChild
				:finalOpen="finalOpen"
				:className="className"
				:content="content"
				:position="position"
			>
				<template v-if="!!popupProps">
					<slot />
				</template>

				<div v-else ref="triggerRef">
					<slot />
				</div>
			</TooltipChild>
		</div>
	</template>

	<TooltipChild
		v-else
		:finalOpen="finalOpen"
		:className="className"
		:content="content"
		:position="position"
	>
		<template v-if="!!popupProps">
			<slot />
		</template>

		<div v-else ref="triggerRef">
			<slot />
		</div>
	</TooltipChild>
</template>
