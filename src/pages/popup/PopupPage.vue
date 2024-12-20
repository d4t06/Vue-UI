<script setup lang="ts">
import Popup from "./Popup.vue";
import PopupTrigger from "./PopupTrigger.vue";
import PopupContent from "./PopupContent.vue";
import PopupWrapper from "./PopupWrapper.vue";
import { Cog6ToothIcon } from "@heroicons/vue/16/solid";
</script>

<template>
  <div class="flex space-x-5">
    <Popup>
      <PopupTrigger> Click me </PopupTrigger>

      <PopupContent>
        <PopupWrapper>
          <button><Cog6ToothIcon class="w-5" /> <span>Setting</span></button>
          <button><Cog6ToothIcon class="w-5" /> <span>Edit</span></button>
        </PopupWrapper>
      </PopupContent>
    </Popup>

    <Popup>
      <PopupTrigger> Click me </PopupTrigger>

      <PopupContent position="right-bottom" origin="top left">
        <div class="bg-white text-black">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </div>
      </PopupContent>
    </Popup>
  </div>
</template>
