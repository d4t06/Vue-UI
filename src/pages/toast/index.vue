<script setup lang="ts">
import ToastContainer from "./ToastContainer.vue";
import toastProvider from "./toastProvider";
import Button from "../../components/Button.vue";

const { showToast } = toastProvider();
</script>

<template>
	<Button :onclick="() => showToast(false)">Show toast</Button>

	<ToastContainer />
</template>
