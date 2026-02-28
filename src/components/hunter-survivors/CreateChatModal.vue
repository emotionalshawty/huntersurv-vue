<template>
  <div class="create-chat-overlay" @click.self="emit('close')">
    <div class="create-chat-panel">
      <div class="panel-header">
        <div class="panel-title">Add Hunter Brothers</div>
        <IonButton class="close-btn" fill="clear" @click="emit('close')">✕</IonButton>
      </div>

      <div class="search-wrap">
        <InputText v-model="searchQuery" type="text" placeholder="Search Username..." />
      </div>

      <div class="suggested-title">Suggested Hunters</div>

      <div class="hunters-grid">
        <button
          v-for="hunter in filteredHunters"
          :key="hunter.name"
          type="button"
          class="hunter-card"
          @click="emit('select-hunter', hunter.name)"
        >
          <div class="hunter-top">
            <img :src="getAvatarUrl(hunter.name)" :alt="hunter.name" class="hunter-avatar" />
            <div class="hunter-info">
              <div class="hunter-name">{{ hunter.name }}</div>
              <div class="hunter-role">{{ hunter.role }}</div>
            </div>
          </div>
          <div class="hunter-meta">
            <div class="hunter-level">Level {{ hunter.level }}</div>
            <div :class="['hunter-status', hunter.statusClass]">{{ hunter.status }}</div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { IonButton } from '@ionic/vue';
import InputText from 'primevue/inputtext';

defineProps<{
  getAvatarUrl: (name: string) => string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'select-hunter', name: string): void;
}>();

const searchQuery = ref('');

const hunters = [
  { name: 'Lord Ganja', role: 'Ancient Hunter', level: 420, status: 'Online', statusClass: 'online' },
  { name: 'Ordinator', role: 'Mythic Guardian', level: 333, status: 'In Battle', statusClass: 'battle' },
  { name: 'Hevnoraak', role: 'Renown Hunter', level: 79, status: 'Offline', statusClass: 'offline' },
  { name: 'Astarion', role: 'Legendary Vampire', level: 420, status: 'Online - Browsing Inventory', statusClass: 'online' },
];

const filteredHunters = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) {
    return hunters;
  }
  return hunters.filter((hunter) => hunter.name.toLowerCase().includes(query));
});
</script>

<style scoped>
.create-chat-overlay {
  position: absolute;
  inset: 0;
  z-index: 25;
  background: rgba(0, 0, 0, 0.66);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: max(10px, env(safe-area-inset-top)) 10px max(10px, env(safe-area-inset-bottom));
}

.create-chat-panel {
  width: min(430px, 100%);
  max-height: min(92vh, 760px);
  overflow-y: auto;
  border-radius: 10px;
  border: 1px solid #5c0bb5;
  background: linear-gradient(180deg, #24003e, #13001f 55%, #180227);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.45), inset 0 0 0 1px rgba(155, 74, 255, 0.12);
  padding: 12px 14px 10px;
}

.create-chat-panel::-webkit-scrollbar {
  display: none;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.panel-title {
  font-family: var(--font-title, serif);
  font-size: 17px;
  color: #ceb8e8;
  line-height: 1;
}

.close-btn {
  --background: transparent;
  --background-hover: transparent;
  --color: #a773cf;
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
  font-size: 14px;
  cursor: pointer;
  line-height: 1;
  text-transform: none;
  margin: 0;
}

.search-wrap {
  padding: 0 16px;
  margin-bottom: 6px;
}

.search-wrap input {
  width: 100%;
  height: 36px;
  border-radius: 6px;
  border: 1px solid #8d141f;
  background: #090308;
  font-family: var(--font-title, serif);
  text-align: center;
  font-size: 14px;
  color: #d24848;
  outline: none;
}

.search-wrap input::placeholder {
  color: #7f1118;
}

.suggested-title {
  font-family: var(--font-title, serif);
  color: #cbb5e4;
  font-size: 14px;
  margin-bottom: 8px;
  padding-left: 4px;
}

.hunters-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.hunter-card {
  border: 1px solid #8d1c2e;
  border-radius: 12px;
  background: linear-gradient(160deg, #460311, #240017);
  padding: 8px;
  text-align: left;
  cursor: pointer;
}

.hunter-top {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 42px;
}

.hunter-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #8f4b0f;
  object-fit: cover;
  background: #22060d;
}

.hunter-name {
  font-family: var(--font-title, serif);
  color: #f2dad3;
  font-size: 14px;
  line-height: 1;
}

.hunter-role {
  margin-top: 4px;
  font-family: var(--font-title, serif);
  color: #cb5f5e;
  font-size: 10px;
  line-height: 1;
}

.hunter-meta {
  margin-top: 8px;
  border-radius: 6px;
  background: #1a0111;
  padding: 5px 7px;
}

.hunter-level {
  font-family: var(--font-title, serif);
  color: #e35f5f;
  font-size: 10px;
  line-height: 1;
}

.hunter-status {
  margin-top: 4px;
  font-size: 8px;
  line-height: 1;
  font-family: var(--font-title, serif);
}

.hunter-status.online {
  color: #2ecf6f;
}

.hunter-status.battle {
  color: #e06040;
}

.hunter-status.offline {
  color: #8a5f5f;
}

@media (max-width: 430px) {
  .create-chat-overlay {
    padding-left: 6px;
    padding-right: 6px;
  }

  .create-chat-panel {
    max-height: 95vh;
    padding: 10px 10px 9px;
  }

  .search-wrap {
    padding: 0 10px;
  }

  .hunters-grid {
    gap: 6px;
  }

  .hunter-card {
    padding: 7px;
  }
}
</style>
