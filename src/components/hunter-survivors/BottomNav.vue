<template>
  <div v-if="show" class="bottom-nav">
    <button :class="['nav-btn', { active: activeScreen === 'main' }]" @click="$emit('navigate', 'main')">
      🏠 <span class="nav-label">Home</span>
    </button>
    <button :class="['nav-btn', { active: activeScreen === 'stats' }]" @click="$emit('navigate', 'stats')">
      💧 <span class="nav-label">Stats</span>
    </button>
    <button :class="['nav-btn', { active: activeScreen === 'trades' }]" @click="$emit('navigate', 'trades')">
      🛒 <span class="nav-label">Shop</span>
    </button>
    <button :class="['nav-btn', { active: activeScreen === 'chat' }]" @click="$emit('navigate', 'chat')">
      💬 <span class="nav-label">Chat</span>
    </button>
    <button :class="['nav-btn', { active: activeScreen === 'profile' }]" @click="$emit('navigate', 'profile')">
      👤 <span class="nav-label">Profile</span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean;
  activeScreen: string;
}>();

defineEmits<{
  (e: 'navigate', target: string): void;
}>();
</script>
