<script setup lang="ts">
import { RouterView } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
   <div class="flex fixed top-0 bottom-0 w-full">
      <Sidebar />
      <div
         class="w-full flex text-white relative flex-col items-center justify-center"
      >
         <RouterView />
      </div>
   </div>
</template>

<style scoped></style>
