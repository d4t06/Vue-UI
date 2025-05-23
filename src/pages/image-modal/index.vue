<script setup lang="ts">
import { ref, watchEffect } from "vue";
import Modal, { ModalRef } from "../modal/Modal.vue";
import ImageModal from "./ImageModal.vue";

const modalRef = ref<ModalRef>();
const modalSrc = ref("");

const IMAGES = [
  "https://res.cloudinary.com/dalg3ayqh/image/upload/v1747405694/mobile-wars/wbtncxbwfpbtxlgdcqda.jpg",
  "https://res.cloudinary.com/dalg3ayqh/image/upload/v1727936688/mobile-wars/pl1nuzxw2yfplt9juhgw.jpg",
];

const handleOpenImageModal = (e: Event) => {
  const imageEle = e.target as HTMLImageElement;

  const body =
    typeof document !== "undefined" && document.querySelector("body");

  if (body && imageEle) {
    body.style.overflow = "hidden";
    modalSrc.value = imageEle.src;
    modalRef.value?.open();
  }
};

watchEffect(
  () => {
    const images =
      typeof document !== "undefined"
        ? document.querySelectorAll<HTMLImageElement>("img")
        : [];

    if (images)
      images.forEach((image) => {
        image.addEventListener("click", handleOpenImageModal);
      });

    return () => {
      if (images)
        images.forEach((image) => {
          image.removeEventListener("click", handleOpenImageModal);
        });
    };
  },
  {
    flush: "post",
  },
);
</script>

<template>
  <img v-for="src in IMAGES" class="w-[400px]" :src="src" />

  <Modal :wrapper="false" ref="modalRef">
    <ImageModal :closeModal="modalRef?.close" :src="modalSrc" />
  </Modal>
</template>
