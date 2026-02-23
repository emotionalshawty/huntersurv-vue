<template>
  <div :class="['screen', 'chat-page', { active: active }]">
    <div class="page-header">
      <div class="page-header-title">Hunter's Whispers</div>
      <div class="page-header-sub">Interact with other damned</div>
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
    <div class="chat-action-btns">
      <button class="btn-chat-action">ADD FRIENDS</button>
      <button class="btn-chat-action">CREATE CHAT</button>
    </div>
    <div v-for="c in chats" :key="c.name" class="chat-entry">
      <div class="chat-avatar">{{ c.icon }}</div>
      <span v-if="c.unread" class="unread-dot"></span>
      <div class="chat-meta">
        <div class="chat-name">{{ c.name }}</div>
        <div class="chat-preview">{{ c.preview }}</div>
      </div>
      <div class="chat-time">{{ c.time }}</div>
      <div v-if="c.badge" class="chat-badge">{{ c.badge }}</div>
    </div>
    <div class="map-title">Community Map</div>
    <div class="map-preview">
      <div class="map-grid"></div>
      <div class="map-label">🗺 Tamriel</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  active: boolean;
  chatTab: string;
  chats: Array<{
    name: string;
    preview: string;
    time: string;
    badge: number;
    unread: boolean;
    icon: string;
  }>;
}>();

const emit = defineEmits<{
  (e: 'update:chatTab', value: string): void;
}>();
</script>
