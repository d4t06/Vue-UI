<script setup lang="ts">
import { watch } from "vue";
import Button, { type ButtonProps } from "../../components/Button.vue";
import { injectPopup } from "./usePopup";

type Props = ButtonProps;

const {
   triggerRef,
   toggle,
   state: { isMounted, isOpen },
} = injectPopup();

const props = defineProps<Props>();

watch(
   [isMounted],
   () => {
      if (!isMounted.value) {
         setTimeout(() => {
            isOpen.value = false;
         }, 400);
      }
   },
   {}
);
watch(
   [isOpen],
   () => {
      if (isOpen.value) {
         setTimeout(() => {
            isMounted.value = true;
         }, 100);
      }
   },
   {}
);
</script>

<template>
   <Button v-bind="props" :onClick="toggle" ref="triggerRef">
      <slot />
   </Button>
</template>
