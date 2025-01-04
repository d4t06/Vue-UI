import { watchEffect } from "vue";
import { injectPlayer } from "./PlayerProvider";

export default function useSongListEvent() {
  const { tab, songs, currentIndex, firstTimeSongLoaded } = injectPlayer();

  const scroll = (el: Element) => {
    el.scrollIntoView({
      behavior: "instant",
      block: "center",
    });
  };

  const handleWindowClick: EventListener = (e) => {
    const $ = document.querySelector.bind(document);

    const buttons = [$(".queue-btn")];
    const dashboard = $(".dashboard");
    const target = e.target as Node;

    if (
      !dashboard ||
      dashboard.contains(target) ||
      !!buttons.find((btn) => btn?.contains(target))
    )
      return;

    tab.value = "playing";
  };

  watchEffect(() => {
    if (tab.value !== "queue") {
      document.removeEventListener("click", handleWindowClick);
    }

    const activeSongEle = document.querySelector(".active-song-item");
    if (activeSongEle) scroll(activeSongEle);

    document.addEventListener("click", handleWindowClick);
  });

  return { songs, currentIndex, firstTimeSongLoaded };
}
