<script setup lang="ts">
import Button from "../../components/Button.vue";


const logger = () => {
	console.log("button click")
}

</script>

<template>
	<Button :onclick="logger">Button</Button>
</template>
