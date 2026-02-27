<template>
  <div class="map-viewer">
    <div class="map-viewer-preview" :style="previewStyle">
      <div v-if="!mapUrl" class="map-viewer-placeholder">
        No map found. Place community-map.png in the public folder.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

// Map image path - place your map image in public/community-map.png
const MAP_PATH = '/community-map.png';

const mapUrl = ref<string>('');

const previewStyle = computed(() =>
  mapUrl.value
    ? {
        backgroundImage: `url(${mapUrl.value})`,
      }
    : {},
);

onMounted(() => {
  mapUrl.value = MAP_PATH;
});
</script>

<style>
.map-viewer {
  border-radius: 12px;
  border: 1px solid var(--red-border);
  background: #0d0410;
  padding: 10px;
}

.map-viewer-preview {
  height: 220px;
  border-radius: 10px;
  border: 1px solid #2b0b0b;
  background-color: #100606;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.map-viewer-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #7a4040;
  padding: 12px;
  font-size: 13px;
}
</style>
