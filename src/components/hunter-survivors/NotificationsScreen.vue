<template>
  <div :class="['screen', 'notif-page', { active: active }]">
    <div class="page-header notif-header">
      <div>
        <div class="page-header-title">Notifications</div>
        <div class="page-header-sub">Whispers are arriving to you</div>
      </div>
      <button class="notif-header-action" @click="$emit('back')">Mark All Read</button>
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
}>();
</script>
