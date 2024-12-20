<script setup lang="ts">
import CounterProvider from "./useCounter";
import Button from "../../components/Button.vue";
import Child from "./Child.vue";

const {
  state: { counter },
} = CounterProvider();
</script>
<template>
  <div>
    <Button :onClick="() => counter++">{{ counter }}</Button>
    <Child />
  </div>
</template>
