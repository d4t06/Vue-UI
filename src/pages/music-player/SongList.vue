<script lang="ts" setup>
import SongListItem from "./SongListItem.vue";
import useSongList from "./useSongList";

const {songs, currentIndex, firstTimeSongLoaded}  = useSongList();

const handleSetCurrentSong = (i: number) => {
	firstTimeSongLoaded.value = false;
	currentIndex.value = i;
};
</script>

<template>
	<div class="max-h-[40vh] overflow-auto no-scrollbar">
		<template v-if="songs.length">
			<SongListItem
				v-for="(s, i) in songs"
				:active="i === currentIndex"
				:index="i"
				:song="s"
				:setCurrentSong="() => handleSetCurrentSong(i)"
			/>
		</template>
		<p v-else>No song jet...</p>
	</div>
</template>
