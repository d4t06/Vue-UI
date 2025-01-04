<script lang="ts" setup>
import usePlayer from "./usePlayer";
import useGetSongs from "./useGetSongs";
import {
	ArrowPathIcon,
	QueueListIcon,
	PlayIcon,
	PauseIcon,
	ForwardIcon,
	BackwardIcon,
	ExclamationCircleIcon,
} from "@heroicons/vue/24/outline";
import { formatTime, checkDisable } from "../../utils/appHelper";
import { injectPlayer } from "./PlayerProvider";
import Button from "../../components/Button.vue";
import SongList from "./SongList.vue";

const { audioEleRef } = injectPlayer();

const { isFetching } = useGetSongs();

const {
	handlePlayPause,
	handleSeek,
	handleNext,
	handlePrevious,
	status,
	currentSong,
	songs,
	processLineRef,
	currentTimeTextRef,
	processLineHolderRef,
	tab,
} = usePlayer({ audioEle: audioEleRef.value! });

const toggleTab = () => {
	tab.value === "playing" ? (tab.value = "queue") : (tab.value = "playing");
};

const handleShowHide = (active: boolean) => {
	if (active) return "opacity-100 h-auto";
	else return "opacity-0 pointer-events-none h-0";
};

const classes = {
	timeLineRef: `relative group h-full sm:h-1 hover:h-full  w-full rounded-full bg-[#fff]/30 before:content-[''] before:w-[100%] before:h-[16px] before:absolute before:top-[50%] before:translate-y-[-50%]`,
	timeLineHolderRef:
		"absolute pointer-events-none h-6 w-3 rounded-sm bg-amber-900 border-[2px] border-amber-200 top-1/2 -translate-y-1/2 -translate-x-1/2",
	toggleButton: "queue-btn px-2",
};
</script>
<template>
	<template v-if="isFetching">
		<ArrowPathIcon class="w-6 animate-spin" />
	</template>

	<template v-else>
		<div class="dashboard w-[400px] max-w-[calc(100vw-80px)]">
			<div
				class="p-3 bg-amber-800 text-amber-100 rounded-[16px] border-[4px] border-amber-900 border-b-[8px]"
			>
				<div :class="handleShowHide(tab === 'playing' || tab === 'lyric')">
					<!-- <SongInfoAndLyric /> -->
					<div className="text-center cursor-pointer">
						<p className="font-bold text-2xl line-clamp-1">
							{{ currentSong?.name || "..." }}
						</p>
						<p className="text-sm font-medium line-clamp-1">
							{{ currentSong?.singer || "..." }}
						</p>
					</div>

					<div
						:class="`${
							!currentSong ? 'disabled' : ''
						} h-[6px] mt-5 mb-2 flex items-center`"
					>
						<div
							@click="handleSeek"
							ref="processLineRef"
							:class="classes.timeLineRef"
						>
							<div
								ref="processLineHolderRef"
								:class="classes.timeLineHolderRef"
							></div>
						</div>
					</div>

					<div class="flex justify-between items-center h-[30px]">
						<div ref="currentTimeTextRef">0:00</div>
						<div>{{ formatTime(currentSong?.duration || 0) }}</div>
					</div>

					<div
						:class="`flex my-2 justify-center items-center space-x-3 ${checkDisable(
							!songs.length,
						)}`"
					>
						<Button colors="four" :onClick="handlePrevious">
							<BackwardIcon class="w-8" />
						</Button>

						<Button colors="four" :onClick="handlePlayPause">
							<PauseIcon v-if="status === 'playing'" class="w-10" />
							<PlayIcon v-else-if="status === 'paused'" class="w-10" />
							<ArrowPathIcon
								v-else-if="status === 'waiting'"
								class="w-10 animate-spin"
							/>

							<ExclamationCircleIcon v-else class="w-10" />
						</Button>

						<Button colors="four" :onClick="handleNext">
							<ForwardIcon class="w-8" />
						</Button>
					</div>
				</div>

				<div :class="handleShowHide(tab === 'queue')">
					<SongList />
				</div>
			</div>
		</div>

		<div class="absolute h-10 bottom-8 right-8 flex space-x-2">
			<Button
				:onClick="toggleTab"
				size="clear"
				colors="four"
				:class="classes.toggleButton"
			>
				<QueueListIcon class="w-6" />
			</Button>
		</div>
	</template>
</template>
