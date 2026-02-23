<template>
  <div :class="['screen', 'main-screen', { active: active }]">
    <div class="topbar">
      <div class="user-info">
        <div class="avatar">🎭</div>
        <div>
          <div class="user-name">Lord Ganja</div>
          <div class="user-level">Level 420</div>
        </div>
      </div>
      <div class="topbar-icons">
        <button class="icon-btn" @click="$emit('navigate', 'notifications')">
          🔔
          <span class="notif-dot"></span>
        </button>
        <button class="icon-btn" @click="$emit('navigate', 'settings')">⚙️</button>
      </div>
    </div>
    <div class="currency-bar">
      <div class="currency-pill coins">Coins: 2,847</div>
      <div class="currency-pill moon">🌒 279</div>
      <div class="currency-pill fire">🔥 53</div>
    </div>

    <div class="event-card">
      <div class="event-title">🔥 Blood moon rising</div>
      <div class="event-desc">The blood moon is approaching. Get double coins for the next 24 hours.</div>
      <button class="btn-join-event">JOIN EVENT</button>
    </div>

    <div class="section-card">
      <div class="section-title">Daily Challenges</div>
      <div v-for="c in challenges" :key="c.text" class="challenge-item">
        <div class="challenge-text">{{ c.text }}</div>
        <div class="challenge-bar-bg">
          <div class="challenge-bar-fill" :style="{ width: c.progress + '%' }"></div>
        </div>
      </div>
    </div>

    <div class="section-card">
      <div class="inv-header">
        <div class="inv-title">Inventory</div>
        <div class="inv-link" @click="$emit('navigate', 'profile')">Full Inventory →</div>
      </div>
      <div class="inv-grid">
        <div v-for="item in inventory" :key="item" class="inv-slot">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  active: boolean;
  challenges: Array<{ text: string; progress: number }>;
  inventory: string[];
}>();

defineEmits<{
  (e: 'navigate', target: string): void;
}>();
</script>
