<template>
  <div class="chat-rooms-root">
    <div class="page-header">
      <div class="page-header-title">Hunter's whispers</div>
      <div class="page-header-sub">{{ chatTab === 'Trades' ? 'Create your own listing' : 'Interact with other damned' }}</div>
    </div>

    <div class="chat-tabs">
      <div
        :class="['chat-tab', { active: chatTab === 'Chats' }]"
        @click="emit('update:chatTab', 'Chats')"
      >
        Chats
      </div>
      <div
        :class="['chat-tab', { active: chatTab === 'Trades' }]"
        @click="emit('update:chatTab', 'Trades')"
      >
        Trades
      </div>
    </div>

    <div v-if="chatTab === 'Chats'" class="chat-list-container">
      <div class="chat-list">
        <div
          v-for="(chat, index) in chats"
          :key="index"
          class="chat-item"
          @click="emit('select-chat', chat)"
        >
          <div class="chat-avatar-wrapper">
            <img :src="getAvatarUrl(chat.name)" class="chat-avatar" />
            <div v-if="chat.unread" class="online-dot"></div>
          </div>
          <div class="chat-info">
            <div class="chat-name">{{ chat.name }}</div>
            <div class="chat-preview">{{ chat.preview }}</div>
          </div>
          <div class="chat-meta">
            <div class="chat-time">{{ chat.time }}</div>
            <div v-if="chat.badge" class="chat-badge">{{ chat.badge }}</div>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <button class="action-btn">ADD FRIENDS</button>
        <button class="action-btn" @click="openCreateChatModal">CREATE CHAT</button>
      </div>

      <div class="map-section">
        <div class="map-title">Community Map</div>
        <div class="map-container" ref="mapContainer" @wheel.prevent="onMapWheel">
          <div
            ref="mapPanLayer"
            class="map-pan-layer"
            :class="{ dragging: isDraggingMap }"
            :style="{ transform: `translate(${mapPan.x}px, ${mapPan.y}px) scale(${currentMapScale})` }"
            @pointerdown="startMapDrag"
            @pointermove="onMapDrag"
            @pointerup="endMapDrag"
            @pointercancel="endMapDrag"
          >
            <img src="/community-map.png" alt="Map" class="map-image" @error="handleImageError" />
            <div class="map-fallback" v-if="mapError">
              <div class="map-grid">
                <div class="map-marker red-square" style="top: 30%; left: 70%;"></div>
                <div class="map-marker red-square" style="top: 50%; left: 55%;"></div>
                <div class="map-marker red-triangle" style="top: 85%; left: 45%;"></div>
                <div class="map-marker red-triangle" style="top: 85%; left: 85%;"></div>
              </div>
            </div>
          </div>

          <div class="map-zoom-controls">
            <button type="button" class="zoom-btn" @click="zoomOutMap">−</button>
            <button type="button" class="zoom-btn" @click="zoomInMap">+</button>
          </div>
        </div>
      </div>
    </div>

    <ChatTradesView v-else />

    <CreateChatModal
      v-if="showCreateChatModal"
      :get-avatar-url="props.getAvatarUrl"
      @close="closeCreateChatModal"
      @select-hunter="selectSuggestedHunter"
    />
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import ChatTradesView from './ChatTradesView.vue';
import CreateChatModal from './CreateChatModal.vue';

type ChatEntry = {
  name: string;
  preview: string;
  time: string;
  badge: number;
  unread: boolean;
  icon: string;
};

const props = defineProps<{
  chatTab: string;
  chats: ChatEntry[];
  getAvatarUrl: (name: string) => string;
}>();

const emit = defineEmits<{
  (e: 'update:chatTab', value: string): void;
  (e: 'select-chat', chat: ChatEntry): void;
}>();

const mapError = ref(false);
const showCreateChatModal = ref(false);
const mapContainer = ref<HTMLElement | null>(null);
const mapPanLayer = ref<HTMLElement | null>(null);
const mapPan = ref({ x: 0, y: 0 });
const mapDragStartPointer = ref({ x: 0, y: 0 });
const mapDragStartPan = ref({ x: 0, y: 0 });
const isDraggingMap = ref(false);
const MAP_BASE_SCALE = 1.7;
const MIN_MAP_ZOOM = 0.7;
const MAX_MAP_ZOOM = 2.4;
const mapZoom = ref(1);
const currentMapScale = ref(MAP_BASE_SCALE * mapZoom.value);

const handleImageError = () => {
  mapError.value = true;
};

const getScaledMapSize = (zoom: number) => {
  const container = mapContainer.value;
  if (!container) {
    return { width: 0, height: 0 };
  }
  const scale = MAP_BASE_SCALE * zoom;
  return {
    width: container.clientWidth * scale,
    height: container.clientHeight * scale,
  };
};

const clampMapPan = (x: number, y: number, zoom = mapZoom.value) => {
  const container = mapContainer.value;
  if (!container) {
    return { x, y };
  }

  const { width, height } = getScaledMapSize(zoom);
  const minX = container.clientWidth - width;
  const minY = container.clientHeight - height;

  return {
    x: Math.max(minX, Math.min(0, x)),
    y: Math.max(minY, Math.min(0, y)),
  };
};

const centerMapPan = () => {
  nextTick(() => {
    const container = mapContainer.value;
    if (!container) {
      return;
    }

    const { width, height } = getScaledMapSize(mapZoom.value);
    const centeredX = (container.clientWidth - width) / 2;
    const centeredY = (container.clientHeight - height) / 2;
    mapPan.value = clampMapPan(centeredX, centeredY);
    currentMapScale.value = MAP_BASE_SCALE * mapZoom.value;
  });
};

const applyMapZoom = (nextZoom: number, focalX?: number, focalY?: number) => {
  const container = mapContainer.value;
  if (!container) {
    return;
  }

  const clampedZoom = Math.max(MIN_MAP_ZOOM, Math.min(MAX_MAP_ZOOM, nextZoom));
  if (clampedZoom === mapZoom.value) {
    return;
  }

  const oldScale = MAP_BASE_SCALE * mapZoom.value;
  const newScale = MAP_BASE_SCALE * clampedZoom;
  const anchorX = focalX ?? container.clientWidth / 2;
  const anchorY = focalY ?? container.clientHeight / 2;

  const contentX = (anchorX - mapPan.value.x) / oldScale;
  const contentY = (anchorY - mapPan.value.y) / oldScale;

  const nextPanX = anchorX - (contentX * newScale);
  const nextPanY = anchorY - (contentY * newScale);

  mapZoom.value = clampedZoom;
  currentMapScale.value = newScale;
  mapPan.value = clampMapPan(nextPanX, nextPanY, clampedZoom);
};

const zoomInMap = () => {
  applyMapZoom(mapZoom.value + 0.15);
};

const zoomOutMap = () => {
  applyMapZoom(mapZoom.value - 0.15);
};

const onMapWheel = (event: WheelEvent) => {
  const container = mapContainer.value;
  if (!container) {
    return;
  }

  const rect = container.getBoundingClientRect();
  const focalX = event.clientX - rect.left;
  const focalY = event.clientY - rect.top;
  const direction = event.deltaY > 0 ? -0.12 : 0.12;
  applyMapZoom(mapZoom.value + direction, focalX, focalY);
};

const startMapDrag = (event: PointerEvent) => {
  if (!mapPanLayer.value) {
    return;
  }
  isDraggingMap.value = true;
  mapDragStartPointer.value = { x: event.clientX, y: event.clientY };
  mapDragStartPan.value = { ...mapPan.value };
  mapPanLayer.value.setPointerCapture(event.pointerId);
};

const onMapDrag = (event: PointerEvent) => {
  if (!isDraggingMap.value) {
    return;
  }

  const deltaX = event.clientX - mapDragStartPointer.value.x;
  const deltaY = event.clientY - mapDragStartPointer.value.y;
  mapPan.value = clampMapPan(
    mapDragStartPan.value.x + deltaX,
    mapDragStartPan.value.y + deltaY,
  );
};

const endMapDrag = (event: PointerEvent) => {
  if (!mapPanLayer.value) {
    return;
  }
  isDraggingMap.value = false;
  if (mapPanLayer.value.hasPointerCapture(event.pointerId)) {
    mapPanLayer.value.releasePointerCapture(event.pointerId);
  }
};

const openCreateChatModal = () => {
  showCreateChatModal.value = true;
};

const closeCreateChatModal = () => {
  showCreateChatModal.value = false;
};

const selectSuggestedHunter = (name: string) => {
  emit('select-chat', {
    name,
    preview: 'Newly connected through Hunter Brothers',
    time: 'now',
    badge: 0,
    unread: false,
    icon: '💬',
  });
  showCreateChatModal.value = false;
};

onMounted(() => {
  centerMapPan();
  window.addEventListener('resize', centerMapPan);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', centerMapPan);
});
</script>

<style scoped>
.chat-rooms-root {
  position: relative;
  min-height: 100%;
}

.page-header {
  padding: 39px 24px 0;
  border-bottom: 1px solid #1a0808;
  padding-bottom: 16px;
}

.page-header-title {
  font-family: var(--font-title, serif);
  font-size: 26px;
  color: #ff2a2a;
}

.page-header-sub {
  font-size: 14px;
  color: #8a2b2b;
  margin-top: 4px;
}

.chat-tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #1a0808;
  padding: 0 40px;
  flex-shrink: 0;
}

.chat-tab {
  font-size: 26px;
  color: #8a2b2b;
  padding: 8px 0 7px;
  margin-right: 0;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: color 0.2s;
}

.chat-tab.active {
  color: #ff2a2a;
}

.chat-list-container {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.chat-list {
  display: flex;
  flex-direction: column;
}

.chat-item {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  border-bottom: 1px solid #1a0808;
  cursor: pointer;
  transition: background 0.2s;
}

.chat-item:hover {
  background: rgba(255, 42, 42, 0.05);
}

.chat-avatar-wrapper {
  position: relative;
  margin-right: 16px;
}

.chat-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #3a0a0a;
  object-fit: cover;
  background: #1a0505;
}

.online-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: #ff2a2a;
  border-radius: 50%;
  border: 2px solid #050101;
}

.chat-info {
  flex: 1;
  min-width: 0;
}

.chat-name {
  font-family: var(--font-title, serif);
  font-size: 18px;
  color: #e0c0c0;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-preview {
  font-size: 13px;
  color: #8a2b2b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 12px;
}

.chat-time {
  font-size: 12px;
  color: #8a2b2b;
  margin-bottom: 6px;
}

.chat-badge {
  background: #ff2a2a;
  color: white;
  font-size: 11px;
  font-weight: bold;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-buttons {
  display: flex;
  gap: 16px;
  padding: 24px;
}

.action-btn {
  flex: 1;
  background: #a01a1a;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px 0;
  font-size: 16px;
  font-family: var(--font-title, serif);
  cursor: pointer;
  transition: background 0.2s;
}

.action-btn:hover {
  background: #c02a2a;
}

.map-section {
  padding: 0 24px 24px;
}

.map-title {
  font-family: var(--font-title, serif);
  font-size: 20px;
  color: white;
  margin-bottom: 12px;
}

.map-container {
  width: 100%;
  height: 200px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  background: #8cb4c4;
}

.map-pan-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  cursor: grab;
  touch-action: none;
  user-select: none;
  transform-origin: top left;
  will-change: transform;
}

.map-pan-layer.dragging {
  cursor: grabbing;
}

.map-zoom-controls {
  position: absolute;
  right: 8px;
  bottom: 8px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.zoom-btn {
  width: 28px;
  height: 28px;
  border: 1px solid #771111;
  border-radius: 6px;
  background: rgba(8, 2, 2, 0.86);
  color: #ea4a4a;
  font-family: var(--font-title, serif);
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}

.map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.map-fallback {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #d4c4a8;
}

.map-grid {
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  position: relative;
}

.map-marker {
  position: absolute;
  transform: translate(-50%, -50%);
}

.red-square {
  width: 12px;
  height: 12px;
  background: #ff2a2a;
  border: 1px solid white;
}

.red-triangle {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 14px solid #ff2a2a;
}

.red-triangle::after {
  content: '';
  position: absolute;
  top: 2px;
  left: -6px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 10px solid transparent;
  border-bottom-color: rgba(255, 255, 255, 0.5);
}
</style>
