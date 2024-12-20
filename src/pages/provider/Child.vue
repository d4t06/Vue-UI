<script setup lang="ts">
import Button from "../../components/Button.vue";

import { injectCounter } from "./useCounter";

const { state: {counter} } = injectCounter();
</script>
<template>
   <Button :onClick="() => counter++"> Child {{ counter }} </Button>
</template>
