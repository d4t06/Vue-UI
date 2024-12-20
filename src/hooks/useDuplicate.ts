import { Ref, computed } from "vue";

type Props = {
   value: Ref<number>;
};

export default function useDuplicate({ value }: Props) {
   const duplicateValue = computed(() => value.value * 2);

   return { duplicateValue };
}
