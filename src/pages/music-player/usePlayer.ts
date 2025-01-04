import {
  getLocalStorage,
  setLocalStorage,
  formatTime,
} from "../../utils/appHelper";
import useAudioControl from "./useAudioControl";
import { injectPlayer } from "./PlayerProvider";
import { computed, ref, watch, watchEffect } from "vue";

type Props = {
  audioEle: HTMLAudioElement;
};

export default function usePlayer({ audioEle }: Props) {
  const { currentIndex, songs, currentSong, firstTimeSongLoaded, tab } =
    injectPlayer();

  const isPlayedAllSong = ref(false); // for handle song end

  const currentTimeTextRef = ref<HTMLDivElement>();
  const processLineRef = ref<HTMLDivElement>();
  const processLineHolderRef = ref<HTMLDivElement>();

  const { pause, status } = useAudioControl({ audioEle });

  const memoStorage = computed(() => getLocalStorage());

  // need update time to decide update audio time of not
  const play = async (props: { updateTime?: boolean } | undefined = {}) => {
    try {
      if (firstTimeSongLoaded.value) {
        firstTimeSongLoaded.value = false;

        if (props.updateTime) {
          const storage = getLocalStorage();

          const currentTime = storage["current_time"] || 0;
          audioEle.currentTime = currentTime;
        }
      }

      await audioEle.play();
    } catch (error) {}
  };

  const handlePlayPause = () => {
    if (currentIndex.value === null && songs.value.length) {
      const randomIndex = Math.round(Math.random() * songs.value.length - 1);

      return (currentIndex.value = randomIndex);
    }

    status.value === "playing"
      ? pause()
      : status.value === "paused" && play({ updateTime: true });
  };

  const updateTimeProgressEle = (time: number) => {
    const timeLine = processLineRef.value;
    const timeLineHolder = processLineHolderRef.value;
    const currentTimeEle = currentTimeTextRef.value;
    if (timeLineHolder && timeLine) {
      if (time === 0) {
        timeLine.style.background = "rgba(255,255,255,.3)";
        timeLineHolder.style.left = `0%`;
      } else {
        const ratio = time / (audioEle.duration / 100);
        timeLine.style.background = `linear-gradient(to right, #fde68a ${ratio}%, rgba(255,255,255,.3) ${ratio}%, rgba(255,255,255,.3) 100%)`;
        timeLineHolder.style.left = `${ratio}%`;
      }
    }
    if (currentTimeEle) currentTimeEle.innerText = formatTime(time) || "0:00";
  };

  const handleSeek = function (e: MouseEvent) {
    const node = e.target as HTMLElement;
    if (processLineRef.value) {
      const clientRect = node.getBoundingClientRect();
      const length = e.clientX - clientRect.left;
      const lengthRatio = length / processLineRef.value.clientWidth;
      const newSeekTime = lengthRatio * audioEle.duration;
      audioEle.currentTime = newSeekTime;
      updateTimeProgressEle(newSeekTime);
    }
  };

  const handleNext = () => {
    if (currentIndex.value === null) return;

    let newIndex = currentIndex.value + 1;

    if (newIndex > songs.value.length - 1) newIndex = 0;

    currentIndex.value = newIndex;
  };

  const handlePrevious = () => {
    if (currentIndex.value === null) return;

    let newIndex = currentIndex.value - 1;
    if (newIndex < 0) newIndex = songs.value.length - 1;

    currentIndex.value = newIndex;
  };

  const handleTimeUpdate = () => {
    if (!audioEle) return;
    const currentTime = audioEle?.currentTime;

    /** because playing event only fire onnce
     * there for we need to set playing status after time update
     * but only set playing status if song is paused
     */
    if (status.value === "waiting") status.value = "playing";

    updateTimeProgressEle(currentTime);

    if (Math.round(currentTime) % 3 === 0)
      setLocalStorage("current_time", Math.round(currentTime));
  };

  const handleEnded = () => {
    const storage = getLocalStorage();

    const timer = storage["timer"];

    if (!!timer && timer !== 1) return handleNext();

    if (timer === 1 || currentIndex.value === songs.value.length - 1)
      isPlayedAllSong.value = true;

    handleNext();
  };

  const handleLoadStart = () => {
    if (currentIndex.value !== null) status.value = "waiting";
  };

  const handleLoaded = () => {
    if (isPlayedAllSong.value) {
      isPlayedAllSong.value = false;
      return (status.value = "paused");
    }

    if (currentSong.value) {
      setLocalStorage("current", currentSong.value.id);
    }

    if (firstTimeSongLoaded.value) {
      status.value = "paused";

      const currentTime = memoStorage.value["current_time"] || 0;
      updateTimeProgressEle(currentTime);
      return;
    }

    play();
  };

  // get  localStorage
  watch(
    [songs],
    () => {
      if (!songs.value.length) return;

      const currentId = memoStorage.value["current"] || null;
      if (currentId) {
        const index = songs.value.findIndex((s) => s.id === currentId);
        if (index !== -1) currentIndex.value = index;
      } else firstTimeSongLoaded.value = false;
    },
    { immediate: true },
  );

  // add events listener
  watchEffect(() => {
    audioEle.addEventListener("timeupdate", handleTimeUpdate);
    audioEle.addEventListener("ended", handleEnded);
    audioEle.addEventListener("loadedmetadata", handleLoaded);
    audioEle.addEventListener("loadstart", handleLoadStart);

    return () => {
      audioEle.removeEventListener("timeupdate", handleTimeUpdate);
      audioEle.removeEventListener("ended", handleEnded);
      audioEle.removeEventListener("loadedmetadata", handleLoaded);
      audioEle.removeEventListener("loadstart", handleLoadStart);
    };
  });

  // reset for new song
  watch([currentIndex], () => {
    updateTimeProgressEle(0);
  });

  return {
    handleSeek,
    handlePlayPause,
    handleNext,
    handlePrevious,
    play,
    pause,
    status,
    currentTimeTextRef,
    processLineRef,
    processLineHolderRef,
    currentSong,
    songs,
    tab,
  };
}
