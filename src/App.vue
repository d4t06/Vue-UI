<script setup lang="ts">
import { toRefs } from "vue";
import { RouterView } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
import ThemeProvider from "./providers/ThemeProvider";
import ToggleThemeBtn from "./components/ToggleThemeBtn.vue";

const themeStore = ThemeProvider();
const { isDark } = toRefs(themeStore);
</script>

<template>
  <div
    :class="`flex fixed inset-0 bottom-0 w-full ${isDark ? 'bg-[#242424] text-white' : ''}`"
  >
    <Sidebar />
    <div
      class="w-full flex relative flex-col items-center justify-center"
    >
      <RouterView />
    </div>

    <ToggleThemeBtn />
  </div>
</template>

<style scoped></style>
