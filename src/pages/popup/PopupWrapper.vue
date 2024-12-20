<script setup lang="ts">
type Props = {
   className?: string;
};
const props = withDefaults(defineProps<Props>(), {
   className: "",
});

const classes = {
   menuItem:
      "*:px-3 *:py-1 *:flex *:items-center  *:space-x-1 hover:[&>*:not(div.absolute)]:bg-[#f4f6f8] hover:[&>*]:text-[#cd1818]",
};
</script>   

<template>
   <div
      :class="`relative overflow-hidden rounded-lg py-3 text-[#333] bg-[#fff] flex flex-col shadow-[2px_2px_10px_0_rgba(0,0,0,.15)] ${classes.menuItem} ${props.className}`"
   >
      <slot />
   </div>
</template>
