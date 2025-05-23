<script setup lang="ts">
// import { XMarkIcon } from "@heroicons/vue/16/solid";
// import Button from "../../components/Button.vue";
import useImageModal from "./useImageModal";

type Props = {
  src: string;
  closeModal?: () => void;
};

const props = defineProps<Props>();

const {
  imageRef,
  isDrag,
  isZoomAble,
  handleMouseDown,
  handleMouseMove,
  handleTouchStart,
  handleTouchMove,
  handleMouseUp,
  handleTouchEnd,
  handleWheel,
} = useImageModal();
</script>

<template>
  <img
    @wheel="handleWheel"
    @mousedown="handleMouseDown"
    @touchstart="handleTouchStart"
    @mousemove="handleMouseMove"
    @touchmove="handleTouchMove"
    @mouseup="handleMouseUp"
    @touchend="handleTouchEnd"
    :draggable="false"
    ref="imageRef"
    :class="`${
      isZoomAble ? 'cursor-zoom-in' : isDrag ? 'cursor-grabbing' : 'cursor-grab'
    } select-none touch-none max-w-[95vw] origin-top-left h-auto sm:max-h-[80vh] sm:max-w-[80vw]`"
    :src="props.src"
  />
</template>
