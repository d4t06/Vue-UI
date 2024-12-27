<script setup lang="ts">
import { ref, toRefs } from "vue";
import { RouterLink } from "vue-router";
import { routeList } from "../router/index";
import Button from "./Button.vue";
import {
  AtSymbolIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/vue/16/solid";
import { injectTheme } from "../providers/ThemeProvider";

const themeStore = injectTheme();
const { isDark } = toRefs(themeStore);

const expand = ref(false);

const classes = {
  container:
    "transition-[width] max-h-[100vh] relative flex-shrink-0 w-[50px] sm:w-[70px]",
  containerExpand: "!w-[180px]",
  head: "h-[60px] flex items-center justify-center text-xl",
  logoText: "text-[22px] font-[500] whitespace-nowrap tracking-[-1px]",
  logoImage: "max-w-[50px] p-[4px]",
  item: "flex whitespace-nowrap space-x-[6px] items-center justify-center p-[10px] hover:text-[#cd1818] hover:bg-[#f8f8f8]",
  itemActive: "text-[#cd1818] bg-gray-600",
  icon: "w-6 flex-shrink-0",
};
</script>

<template>
  <div
    :class="`${classes.container} ${expand ? classes.containerExpand : ''} ${isDark ? 'bg-gray-700 text-white' : 'bg-slate-50 text-[#242424]'}`"
  >
    <div :class="classes.head">
      <span class="text-[#cd1818]"> {{ expand ? "Vue" : "V" }} </span>
      UI
    </div>
    <div>
      <RouterLink
        v-for="r in routeList"
        key="{index}"
        :class="`${classes.item} ${expand ? '!justify-start' : ''}`"
        :to="r.path"
      >
        <AtSymbolIcon :class="classes.icon" />
        <span v-if="expand">{{ r.title }}</span>
      </RouterLink>
    </div>
    <div class="absolute bottom-[20px] right-0 translate-x-[50%] z-[10]">
      <Button
        border="clear"
        :onClick="() => (expand = !expand)"
        class-name="p-1"
        size="clear"
      >
        <ChevronLeftIcon v-if="expand" class="w-[24px]" />
        <ChevronRightIcon v-else class="w-[24px]" />
      </Button>
    </div>
  </div>
</template>
