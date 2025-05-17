<script setup lang="ts">
import { ref } from "vue";
import Button from "../../components/Button.vue";
import Modal, { type ModalRef } from "./Modal.vue";

const modalRef = ref<ModalRef | null>(null);




</script>

<template>
	<Button @click="console.log(modalRef)"> Open Modal </Button>

	<Modal ref="modalRef">
		<div class="w-[500px]">Modal content</div>
	</Modal>
</template>
