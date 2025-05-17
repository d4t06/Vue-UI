<script setup lang="ts">
import ToastItem from "./ToastItem.vue";
import { ref, watch } from "vue";
import { useToastContext } from "./toastProvider";

const { toasts } = useToastContext();

const removing = ref("");

const removeToast = (id: string) => {
  const toastItem = document.querySelector<HTMLDivElement>(
    `.toast-item[data-id="${id}"`,
  );

  if (toastItem) {
    toastItem.classList.remove("translate-x-0", "opacity-[1]");

    toastItem.style.transform = "translate(40px,0)";
    toastItem.style.opacity = "0";

    setTimeout(() => {
      const newToasts = toasts.value.filter((t) => t.id !== id);
      toasts.value = newToasts;
    }, 150);
  }
};

watch(
  () => removing.value,
  () => {
    if (removing.value) {
      removeToast(removing.value);
    }
  },
  {},
);

watch(
  () => toasts.value.length,
  () => {
    if (!toasts.value.length) return;

    const id = toasts.value[toasts.value.length - 1].id;
    setTimeout(() => {
      removing.value = id;
    }, 3000);
  },
  {},
);

const classes = {
  wrapper: "fixed z-[9999] bottom-[30px] right-[60px]",
  container: "flex space-y-[10px] flex-col",
};
</script>

<template>
  <div :class="classes.wrapper">
    <div :class="classes.container">
      <ToastItem
        v-for="toast in toasts"
        :onClick="removeToast"
        :toast="toast"
      />
    </div>
  </div>
</template>
