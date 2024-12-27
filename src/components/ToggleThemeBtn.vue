<script setup lang="ts">
import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";
import {toRefs} from 'vue'

import { injectTheme } from "../providers/ThemeProvider";

const themeStore = injectTheme();
const {isDark} = toRefs(themeStore)
</script>

<template>
	<button @click="themeStore.toggleTheme" class="fixed top-4 right-4 z-[99]">
		<MoonIcon v-if="isDark" class="w-6" />
		<SunIcon v-else class="w-6" />
	</button>
</template>
