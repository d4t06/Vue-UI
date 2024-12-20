import { inject, provide, ref } from "vue";

const useCounter = () => {
   const counter = ref(0);

   return { state: { counter } };
};

export default function CounterProvider() {
   const state = useCounter();

   provide("counter_state", state);

   return state;
}

export function injectCounter() {
   const state = inject<{ state: { counter: number } }>("counter_state")!;
   if(!state) throw new Error("Counter not provided")

   return state;
}
