<script setup lang="ts">
import { injectPopup } from "./PopupProvider";

const { appendTo } = injectPopup();
</script>

<template>
	<Teleport v-if="appendTo === 'portal'" to="#portal">
		<slot />
	</Teleport>

	<template v-else>
		<slot />
	</template>
</template>
