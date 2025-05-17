<script lang="ts" setup>
import { ref, watchEffect, Teleport } from 'vue';

type Props = {
  className?: string;
  childClassName?: string;
  persisted?: boolean;
};

export type ModalRef = {
  open: () => void;
  close: () => void;
};

const props = defineProps<Props>();

const isOpen = ref(false);
const isMounted = ref(false);

const open = () => {
  isOpen.value = true;
};

const close = () => {
  isMounted.value = false;
};

watchEffect(() => {
  if (!isMounted.value) {
    setTimeout(() => {
      isOpen.value = false;
    }, 200);
  }
});

watchEffect(() => {
  if (isOpen.value) {
    setTimeout(() => {
      isMounted.value = true;
    }, 0);
  }
});

const handleOverlayClick = (e: MouseEvent) => {
  if (props.persisted) return;
  e.stopPropagation();

  close();
};

defineExpose({ close, open });

const classes = {
  unMountedContent: "opacity-0 scale-[.9]",
  mountedContent: "opacity-100 scale-[1]",
  unMountedLayer: "opacity-0",
  mountedLayer: "opacity-100",
};

console.log("modal render");
</script>

<template>
  <Teleport v-if="isOpen" to="#portal">
    <div
      :class="`fixed transition-opacity ease-linear duration-200 inset-0 bg-black/60 z-[99] 
                              ${isMounted ? classes.mountedLayer : classes.unMountedLayer}
                           `"
      @click="handleOverlayClick"
    ></div>
    <div
      :class="`fixed transition-[opacity,transform] ease-linear duration-200 ${
        props.className || 'z-[99]'
      } top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
      
      ${isMounted ? classes.mountedContent : classes.unMountedContent}
`"
    >
      <div :class="`${props.childClassName || ' py-3 px-4'} rounded-lg bg-amber-100`">
        <slot />
      </div>
    </div>
  </Teleport>
</template>
