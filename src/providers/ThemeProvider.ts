import { inject, provide, ref, watchEffect } from "vue";
import { getLocalStorage, setLocalStorage } from "../utils/appHelper";

const useTheme = () => {
  const isDark = ref(false);

  const toggleTheme = () => {
    const newValue = !isDark.value;

    isDark.value = newValue;
    setLocalStorage("is-dark", newValue);
  };

  watchEffect(() => {
       console.log("run here");

    const storage = getLocalStorage();
    isDark.value = storage["is-dark"] || false;
  });

  return { isDark, toggleTheme };
};

export default function ThemeProvider() {
  const state = useTheme();

  provide("theme_provider", state);

  return state;
}

export function injectTheme() {
  const state = inject<ReturnType<typeof useTheme>>("theme_provider")!;
  if (!state) throw new Error("Theme not provided");

  return state;
}
