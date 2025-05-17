<script setup lang="ts">
import { CheckIcon, XMarkIcon } from "@heroicons/vue/16/solid";
import { watchEffect, ref, toRefs } from "vue";
import { type Toast } from "./toastProvider";

type Props = {
  toast: Toast;
  onClick?: (id: string) => void;
};

const props = defineProps<Props>();

const isShow = ref(false);

const { onClick, toast } = toRefs(props);

const close = () => (isShow.value = false);

defineExpose({ close });

watchEffect(
  () => {
    setTimeout(() => {
      isShow.value = true;
    }, 0);
  },
  {
    flush: "post",
  },
);

const classes = {
  container: `toast-item transition-[transform,opacity] text-white px-3 py-1 space-x-1 rounded-md flex items-center`,
  open: "opacity-[1] translate-x-0",
  init: "opacity-0 translate-x-[40px]",
};
</script>
<template>
  <div
    :data-id="toast.id"
    @click="onClick && onClick(toast.id)"
    :class="` ${classes.container} ${
      isShow ? classes.open : classes.init
    } ${toast.title === 'error' && 'bg-red-500'} ${
      toast.title === 'success' && 'bg-white'
    } `"
  >
    <CheckIcon v-if="toast.title === 'success'" class="w-6" />
    <XMarkIcon v-if="toast.title === 'error'" class="w-6" />
    <p className="font-medium">{{ toast.desc }}</p>
  </div>
</template>
