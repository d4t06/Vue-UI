<script setup lang="ts">
import { watch } from "vue";
import { injectPopup } from "./PopupProvider";
import { watchEffect } from "vue";
import PopupContentChild from "./PopupContentChild.vue";

type Props = {
   className?: string;
   animationClassName?: string;
   // appendTo?: "parent" | "portal";
   position?: "left-bottom" | "right-bottom";
   origin?: "bottom right" | "bottom left" | "top right" | "top left";
   spacer?: number;
};

const props = withDefaults(defineProps<Props>(), {});

const {
   contentRef,
   animationRef,
   triggerRef,
   close,
   appendTo,
   state: { isOpen, isMounted },
} = injectPopup();

const handleClickOutside = (e: MouseEvent | TouchEvent) => {
   if (
      !contentRef.value ||
      !triggerRef.value ||
      triggerRef.value?.inner?.contains(e.target as Node) ||
      contentRef.value?.contains(e.target as Node)
   ) {
      return;
   }

   isMounted.value = false;
};

const handleWheel = close;

const setContentPos = () => {
   const triggerEle = triggerRef.value?.inner;
   const contentEle = contentRef.value;
   const animationEle = animationRef.value;

   if (!triggerEle || !contentEle || !animationEle) return;

   const triggerRect = triggerEle.getBoundingClientRect();

   // default is left bottom
   const contentPos = {
      top: triggerRect.top + triggerEle.clientHeight,
      left: triggerRect.left - contentEle.clientWidth,
   };

   const { origin = "top right", position, spacer = 8 } = props;

   // handle other positions
   switch (position) {
      case "right-bottom": {
         contentPos.top = triggerRect.top + triggerEle.clientHeight + spacer;
         contentPos.left = triggerRect.left + triggerEle.clientWidth;
         break;
      }
   }

   const isOverScreenHeight =
      contentPos.top + contentEle.clientHeight > window.innerHeight - 90;
   if (isOverScreenHeight) {
      let newTop = contentPos.top - contentEle.clientHeight - triggerEle.clientHeight;

      if (newTop - 60 < 0) newTop = 60;
      contentPos.top = newTop;
   }

   if (animationEle) {
      let finalOrigin = origin;

      if (isOverScreenHeight) finalOrigin = "bottom right";

      animationEle.style.transformOrigin = finalOrigin;
   }

   contentEle.style.left = `${contentPos.left}px`;
   contentEle.style.top = `${contentPos.top}px`;
};

const classes = {
   unMountedContent: "opacity-0 scale-[.95]",
   mountedContent: "opacity-100 scale-[1]",
};

watch(
   [isOpen],
   () => {
      if (isOpen.value) {
         if (appendTo === "portal") setContentPos();
      }
   },
   {
      flush: "post",
   },
);

watchEffect(() => {
   document.addEventListener("mousedown", handleClickOutside);
   document.addEventListener("touchstart", handleClickOutside);
});

watchEffect(
   () => {
      const mainContainer = document.querySelector(".dash-content");
      if (!mainContainer) return;
      if (isMounted.value) {
         mainContainer.addEventListener("wheel", handleWheel);
      } else {
         mainContainer.removeEventListener("wheel", handleWheel);
      }
   },
   {
      flush: "post",
   },
);
</script>

<template>
   <PopupContentChild>
      <div
         v-if="isOpen"
         ref="contentRef"
         :class="`bg-transparent ${appendTo === 'portal' ? 'fixed z-[99]' : 'absolute'} ${props.className || ''}`"
      >
         <div
            ref="animationRef"
            :class="`bg-transparent transition-[transform,opacity] duration-[.25s] ease-linear ${
               isMounted ? classes.mountedContent : classes.unMountedContent
            }`"
         >
            <slot />
         </div>
      </div>
   </PopupContentChild>
</template>
