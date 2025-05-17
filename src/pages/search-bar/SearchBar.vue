<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import Button from "../../components/Button.vue";
import { ref } from "vue";

type Props = {
  submit: () => void;
  class?: string;
};

const props = defineProps<Props>();

const inner = ref<HTMLInputElement | null>(null);

defineExpose({
  inner,
});

const model = defineModel({ default: "" });
</script>

<template>
  <form @submit.prevent="props.submit" class="flex space-x-2">
    <input
      v-model="model"
      ref="inner"
      placeholder="..."
      class="my-input"
      type="text"
      name=""
    />

    <Button type="submit" size="clear" class="p-2">
      <MagnifyingGlassIcon class="w-6" />
    </Button>
  </form>
</template>
