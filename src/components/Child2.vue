<script setup lang="ts">
import { Ref } from 'vue';

type Props = {
   value: Ref<number>;
      product: Product
};

const { value } = defineProps<Props>();
</script>
<template>
<p>Child 2</p>

<button :onClick="() => (value = value + 1)">+</button>
   <button :onClick="() => (value = value - 1)">-</button>

</template>