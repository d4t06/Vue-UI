import { inject, provide, ref } from "vue";

const usePopup = ({ appendTo }: { appendTo?: "parent" | "portal" }) => {
   const isOpen = ref(false);
   const isMounted = ref(false);

   const triggerRef = ref<{ inner: HTMLButtonElement } | null>(null);
   const contentRef = ref<HTMLElement | null>(null);
   const animationRef = ref<HTMLElement | null>(null);

   const close = () => {
      isMounted.value = false;
   };

   const toggle = () => {
      if (isMounted.value) isMounted.value = false;
      if (!isOpen.value) isOpen.value = true;
   };

   return {
      triggerRef,
      contentRef,
      animationRef,
      state: { isMounted, isOpen },
      close,
      toggle,
      appendTo
   };
};

export type ProviderType = ReturnType<typeof usePopup>;

export default function PopupProvider(props: { appendTo?: "parent" | "portal" }) {
   const state = usePopup(props);
   provide("popup_state", state);

   return state;
}

export function injectPopup() {
   const state = inject<ProviderType>("popup_state");
   if (!state) throw new Error("Popup no provided");

   return state;
}
