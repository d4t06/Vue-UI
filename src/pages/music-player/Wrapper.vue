<script setup lang="ts">
import Dashboard from "./Dashboard.vue"
import PlayerProvider from "./PlayerProvider";

const { audioEleRef, currentSong } = PlayerProvider();
</script>

<template>
	<audio
		ref="audioEleRef"
		:src="currentSong?.song_url || ''"
		class="hidden"
	></audio>
	<Dashboard v-if="audioEleRef" />
</template>
