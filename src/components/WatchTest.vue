<script setup lang="ts">
import { ref, watch, watchEffect } from "vue";

const input = ref<HTMLInputElement | null>(null);

watch(
   [() => 0],
   () => {
      console.log("watch", input.value);
   }, {
    flush: 'post',
immediate: true
}
);

watchEffect(
   () => {
      console.log("watch effect", input.value);
   },
   { flush: "post" }
);
</script>

<template>
   Watch component

   <input type="text" ref="input" />
</template>
