<template>
  <div :class="['screen', 'notif-page', { active: active }]">
    <div class="page-header notif-header">
      <button class="notif-back-btn" type="button" @click="$emit('back')" title="Back to Main">✕</button>
      <div>
        <div class="page-header-title">Notifications</div>
        <div class="page-header-sub">Whispers are arriving to you</div>
      </div>
      <button class="notif-header-action" @click="$emit('markAllRead')">Mark All Read</button>
    </div>
    <div class="notif-item" v-for="n in notifications" :key="n.title">
      <div class="notif-item-title">{{ n.title }}</div>
      <div class="notif-item-sub">{{ n.sub }}</div>
      <div class="notif-item-time">{{ n.time }}</div>
      <div v-if="n.unread" class="notif-unread"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  active: boolean;
  notifications: Array<{ title: string; sub: string; time: string; unread: boolean }>;
}>();

defineEmits<{
  (e: 'back'): void;
  (e: 'markAllRead'): void;
}>();
</script>

<style>
.notif-page {
  overflow-y: auto;
  padding-bottom: 60px;
}

.notif-page::-webkit-scrollbar {
  display: none;
}

.notif-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
}

.notif-back-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: #d24b4b;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease, color 0.2s ease;
  flex-shrink: 0;
  padding: 0;
  line-height: 1;
}

.notif-back-btn:hover {
  color: #ff6a6a;
  transform: scale(1.1);
}

.notif-header-action {
  background: none;
  border: none;
  color: var(--text-red);
  cursor: pointer;
  font-size: 13px;
}

.notif-item {
  padding: 14px 20px;
  border-bottom: 1px solid #0f0808;
  position: relative;
  cursor: pointer;
  transition: background 0.15s;
}

.notif-item:hover {
  background: rgba(81, 17, 30, 0.1);
}

.notif-item-title {
  font-size: 16px;
  color: white;
}

.notif-item-sub {
  font-size: 13px;
  color: #888;
  margin-top: 3px;
}

.notif-item-time {
  font-size: 12px;
  color: #555;
  margin-top: 4px;
}

.notif-unread {
  width: 8px;
  height: 8px;
  background: var(--red);
  border-radius: 50%;
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>
