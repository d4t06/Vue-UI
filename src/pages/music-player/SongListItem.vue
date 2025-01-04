<script setup lang="ts">
import { formatTime } from "../../utils/appHelper";

type Props = {
	song: Song;
	index: number;
	active: boolean;
	setCurrentSong: () => void;
};

const props = defineProps<Props>();
const handleSetSong = () => {
	if (!props.active) {
		props.setCurrentSong();
	}
};

const classes = {
	container:
		"flex w-full font-medium justify-between items-center rounded-md p-2",
};

const getActiveClass = () => {
	if (props.active) return "bg-amber-100 text-amber-800";
	return "cursor-pointer text-amber-100 hover:bg-amber-700";
};
</script>

<template>
	<div
		@click="handleSetSong"
		:class="`${classes.container} ${getActiveClass()}`"
	>
		<div class="">
			<h5 class="">{{ props.song.name }}</h5>
			<p class="text-sm">{{ props.song.singer }}</p>
		</div>
		<span class="">{{ formatTime(props.song.duration) }}</span>
	</div>
</template>
