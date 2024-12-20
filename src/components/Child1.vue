<script setup lang="ts">
import { computed } from 'vue';

type Props = {
   value: number;
};

const { value } = defineProps<Props>();

const getValue = computed(() => console.log(value))





</script>
<template>
   <p>child {{ value }}</p>
   <button :onClick="() => console.log(value)">child get value inline</button>
   <button :onClick="() => getValue">child get value callback</button>
</template>
