<script setup lang="ts">
import PopupProvider from "./PopupProvider";
import { provide } from "vue";

type Props = {
  appendTo?: "parent" | "portal";
};

const props = withDefaults(defineProps<Props>(), {
  appendTo: "portal",
});

const { triggerRef, state } = PopupProvider(props);

provide("popup-prop", { triggerRef, state });
</script>

<template>
  <div v-if="props.appendTo === 'parent'" class="relative">
    <slot />
  </div>

  <template v-else>
    <slot />
  </template>
</template>
