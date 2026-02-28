<template>
  <div :class="['screen', 'notif-page', { active: active }]">
    <div class="page-header notif-header">
      <IonButton fill="clear" class="notif-back-btn" type="button" @click="$emit('back')" title="Back to Main">✕</IonButton>
      <div>
        <div class="page-header-title">Notifications</div>
        <div class="page-header-sub">Whispers are arriving to you</div>
      </div>
      <IonButton fill="clear" class="notif-header-action" @click="$emit('markAllRead')">Mark All Read</IonButton>
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
import { IonButton } from '@ionic/vue';

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
  min-height: 32px;
  --border-radius: 50%;
  --border-width: 0;
  --background: transparent;
  --background-hover: transparent;
  --color: #d24b4b;
  --color-hover: #ff6a6a;
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 1;
  text-transform: none;
  margin: 0;
}

.notif-back-btn:hover {
  transform: scale(1.1);
}

.notif-header-action {
  --background: transparent;
  --background-hover: transparent;
  --border-width: 0;
  --color: var(--text-red);
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
  cursor: pointer;
  font-size: 13px;
  text-transform: none;
  margin: 0;
  min-height: 0;
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
