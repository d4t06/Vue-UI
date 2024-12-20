<script setup lang="ts">
import PopupProvider from "./usePopup";

type Props = {
  appendTo?: "parent" | "portal";
};

const props = withDefaults(defineProps<Props>(), {
  appendTo: "portal",
});

PopupProvider(props);
</script>

<template>
  <div v-if="props.appendTo === 'parent'" class="relative">
    <slot />
  </div>

  <template v-else>
    <slot />
  </template>
</template>
