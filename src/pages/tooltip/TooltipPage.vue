<script setup lang="ts">
import Popup from "../popup/Popup.vue";
import PopupTrigger from "../popup/PopupTrigger.vue";
import PopupContent from "../popup/PopupContent.vue";
import PopupWrapper from "../popup/PopupWrapper.vue";
import Tooltip from "./Tooltip.vue";
import Button from "../../components/Button.vue";

import { Cog6ToothIcon } from "@heroicons/vue/24/outline";
</script>
<template>
	<div class="flex flex-col space-y-5">
		<Popup>
			<Tooltip>
				<PopupTrigger> Portal popup + Tooltip </PopupTrigger>
			</Tooltip>

			<PopupContent>
				<PopupWrapper>
					<button><Cog6ToothIcon class="w-5" /> <span>Setting</span></button>
					<button><Cog6ToothIcon class="w-5" /> <span>Edit</span></button>
				</PopupWrapper>
			</PopupContent>
		</Popup>

		<Popup append-to="parent">
			<Tooltip>
				<PopupTrigger> Parent popup + Tooltip </PopupTrigger>
			</Tooltip>

			<PopupContent>
				<PopupWrapper>
					<button><Cog6ToothIcon class="w-5" /> <span>Setting</span></button>
					<button><Cog6ToothIcon class="w-5" /> <span>Edit</span></button>
				</PopupWrapper>
			</PopupContent>
		</Popup>

		<Tooltip>
			<Button>This is button</Button>
		</Tooltip>
	</div>
</template>
