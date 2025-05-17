<script lang="ts" setup>
import { cva, VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, ref } from "vue";

const classes = {
  push: 'active:translate-y-[2px] active:before:shadow-none before:z-[-1]  before:absolute before:content-[""]  before:inset-0 ',
  active: "translate-y-[2px] before:shadow-none text-[#cd1818] font-[500]",
};

const ButtonVariant = cva(
  "inline-flex justify-center items-center disabled:opacity-[.6] disabled:pointer-events-none relative  z-0",
  {
    variants: {
      variant: {
        primary: classes.push,
        clear: "",
      },
      size: {
        primary: "px-[20px] py-[4px]",
        full: "w-full py-[4px]",
        clear: "",
      },
      rounded: {
        primary: "before:rounded-[8px] rounded-[8px]",
        lg: "before:rounded-[12px] rounded-[12px]",
        max: "before:rounded-[99px] rounded-[99px]",
        clear: "",
      },
      colors: {
        primary:
          "before:bg-[#cd1818] before:border-[#a00000] text-[#fff] before:shadow-[0_2px_0_#a00000]",
        secondary:
          "before:bg-[#f6f6f6] before:border-[#e1e1e1] text-[#333] before:shadow-[0_2px_0_#e1e1e1]",
        third:
          "before:bg-[#fff] before:border-[#cd1818] text-[#333] before:shadow-[0_2px_0_#cd1818]",
        four: "text-amber-100 before:bg-amber-800 before:border-[#78350f] before:shadow-[0_2px_0_#78350f]",

        clear: "",
      },
      hover: {
        brightness: "hover:brightness-[.90]",
        scale: "transition-transform hover:scale-[1.05]",
        clear: "",
      },
      border: {
        primary: "before:border-[2px]",
        thin: "before:border-[1px] before:border-b-[2px]",
        clear: "before:border-b-[2px]",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "primary",
      rounded: "primary",
      colors: "primary",
      hover: "clear",
      border: "primary",
    },
  },
);

type TypeProps = VariantProps<typeof ButtonVariant>;

export type ButtonProps = {
  onClick?: () => void;
  href?: string;
  active?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  variant?: TypeProps["variant"];
  colors?: TypeProps["colors"];
  size?: TypeProps["size"];
  rounded?: TypeProps["rounded"];
  hover?: TypeProps["hover"];
  border?: TypeProps["border"];
  rest?: Partial<ButtonHTMLAttributes>;
};

const {
  href,
  onClick,
  variant,
  colors,
  size,
  className,
  disabled = false,
  loading = false,
  border,
  hover,
  rounded,
  ...rest
} = defineProps<ButtonProps>();

const inner = ref<HTMLElement | null>(null);

defineExpose({
  inner,
});
</script>

<template>
  <button
    ref="inner"
    v-bind="rest"
    @click="onClick"
    :disabled="loading || disabled"
    :class="`${ButtonVariant({
      variant,
      size,
      rounded,
      colors,
      hover,
      border,
      className,
    })} ${active ? classes.active + ' ' + active : ''}`"
  >
    <slot />
  </button>
</template>
