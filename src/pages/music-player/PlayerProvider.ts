import { computed, inject, provide, ref } from "vue";

const usePlayer = () => {
	const currentIndex = ref<number | null>(null);
	const songs = ref<Song[]>([]);
	const firstTimeSongLoaded = ref(true); // for update song current time
	const tab = ref<Tab>("playing");

	const audioEleRef = ref<HTMLAudioElement>();

	const currentSong = computed(() =>
		currentIndex.value !== null ? songs.value[currentIndex.value] : null,
	);

	return {
		currentIndex,
		songs,
		currentSong,
		audioEleRef,
		firstTimeSongLoaded,
		tab,
	};
};

export default function PlayerProvider() {
	const state = usePlayer();

	provide("player-provider", state);
	return state;
}

export function injectPlayer() {
	const state = inject<ReturnType<typeof usePlayer>>("player-provider")!;
	if (!state) throw new Error("Player not provided");

	return state;
}
