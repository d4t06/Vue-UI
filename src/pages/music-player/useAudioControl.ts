import { ref, watchEffect } from "vue";

type Props = {
   audioEle: HTMLAudioElement;
};

type Status = "playing" | "paused" | "waiting" | "error";

export default function useAudioControl({ audioEle }: Props) {
   const status = ref<Status>("paused");
   const isClickPlay = ref(false);

   const play = async () => {
      try {
         await audioEle?.play();
         isClickPlay.value = true;
      } catch (error) {}
   };

   const pause = () => {
      audioEle?.pause();
   };

   const handlePlayPause = () => {
      status.value === "playing" ? pause() : status.value === "paused" && play();
   };

   const handlePlay = () => {
      status.value = "playing";
   };

   const handlePaused = () => {
      status.value = "paused";
   };

   const handleWaiting = () => {
      status.value = "waiting";
   };

   const handleError = () => {
      console.log("check", audioEle.currentSrc);

      if (!audioEle.currentSrc) return (status.value = "paused");
      status.value = "error";
   };

   const seek = (time: number) => {
      audioEle.currentTime = time;
   };

   const forward = (second: number) => {
      audioEle.currentTime = audioEle.currentTime + second;
   };
   const backward = (second: number) => {
      audioEle.currentTime = audioEle.currentTime - second;
   };

   // add events listener
   watchEffect(() => {
      audioEle.addEventListener("error", handleError);
      audioEle.addEventListener("pause", handlePaused);
      audioEle.addEventListener("play", handlePlay);
      audioEle.addEventListener("waiting", handleWaiting);

      return () => {
         audioEle.removeEventListener("error", handleError);
         audioEle.removeEventListener("pause", handlePaused);
         audioEle.removeEventListener("play", handlePlay);
         audioEle.removeEventListener("waiting", handleWaiting);
      };
   });

   return {
      play,
      pause,
      seek,
      handlePlayPause,
      forward,
      backward,
      isClickPlay,
      status,
   };
}
