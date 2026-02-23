<template>
  <div :class="['screen', 'profile-page', { active: active }]">
    <div class="profile-hero">
      <div class="profile-avatar">🎭</div>
      <div class="profile-name">Lord Ganja</div>
      <div class="profile-role">Ancient Hunter · Level 420</div>
      <button class="btn-edit-profile">Edit Profile</button>
    </div>
    <div class="profile-stats">
      <div class="profile-stat">
        <div class="profile-stat-val">146</div>
        <div class="profile-stat-label">Achievements</div>
      </div>
      <div class="profile-stat">
        <div class="profile-stat-val">731</div>
        <div class="profile-stat-label">Games Played</div>
      </div>
      <div class="profile-stat">
        <div class="profile-stat-val">365</div>
        <div class="profile-stat-label">Days Active</div>
      </div>
    </div>
    <div class="achievements-card">
      <div class="achievements-title">Achievements</div>
      <div class="achievement-badge">⚔️ Slayer of Thousands</div>
      <div class="achievement-badge">👑 Ancient Lord</div>
      <div class="achievement-badge">🔥 Master of Darkness</div>
    </div>
    <div class="section-card">
      <div class="inv-header">
        <div class="inv-title">Inventory</div>
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
  inventory: string[];
}>();
</script>
