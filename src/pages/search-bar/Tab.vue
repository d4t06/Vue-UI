<script setup lang="ts">
import { toRefs } from "vue";

type Props = {
  tabs: string[];
  className?: string;
  tab: string;
  setTab: (tab: string) => void;
};

const props = defineProps<Props>();

const { tab, setTab, tabs, className } = toRefs(props);

const classes = {
  inActiveTab: ` hover:bg-black/05`,
  activeTab: `bg-[#cd1818] text-white`,
};
</script>

<template>
  <div :class="`bg-black/5 p-1.5 w-fit space-x-1 rounded-full ${className || ''}`">
    <button
      v-for="_tab in tabs"
      size="clear"
      @click="
        (event) => {
          setTab(_tab);
          (event.target as HTMLButtonElement).blur();
        }
      "
      :class="`rounded-full py-1 px-4 ${tab === _tab ? classes.activeTab : classes.inActiveTab}`"
    >
      {{ _tab }}
    </button>
  </div>
</template>
