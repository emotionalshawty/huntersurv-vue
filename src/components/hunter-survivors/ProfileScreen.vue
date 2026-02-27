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

<style>
.profile-page {
  overflow-y: auto;
  padding-bottom: 60px;
}

.profile-page::-webkit-scrollbar {
  display: none;
}

.profile-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px 20px;
}

.profile-avatar {
  width: 99px;
  height: 99px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b0000, #3d0000);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  border: 3px solid var(--red);
  margin-bottom: 12px;
  box-shadow: 0 0 30px rgba(196, 13, 13, 0.4);
}

.profile-name {
  font-family: var(--font-title);
  font-size: 22px;
  color: white;
}

.profile-role {
  font-size: 14px;
  color: #888;
  margin-top: 4px;
}

.btn-edit-profile {
  margin-top: 12px;
  border: 1px solid var(--red-border);
  border-radius: 20px;
  background: transparent;
  color: white;
  font-family: var(--font-body);
  font-size: 14px;
  padding: 6px 22px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-edit-profile:hover {
  background: rgba(196, 13, 13, 0.2);
}

.profile-stats {
  display: flex;
  border-top: 1px solid #1a0808;
  border-bottom: 1px solid #1a0808;
}

.profile-stat {
  flex: 1;
  text-align: center;
  padding: 14px 0;
  border-right: 1px solid #1a0808;
}

.profile-stat:last-child {
  border-right: none;
}

.profile-stat-val {
  font-family: var(--font-caps);
  font-size: 26px;
  color: var(--text-red);
}

.profile-stat-label {
  font-size: 11px;
  color: #666;
  margin-top: 3px;
}

.achievements-card {
  margin: 16px 20px;
  border: 1px solid #270708;
  border-radius: 10px;
  padding: 14px 16px;
}

.achievements-title {
  font-size: 20px;
  color: white;
  margin-bottom: 10px;
}

.achievement-badge {
  background: #0e0a0a;
  border: 1px solid #1a0808;
  border-radius: 6px;
  padding: 8px 14px;
  margin-bottom: 6px;
  font-size: 14px;
  color: #ccc;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-card {
  margin: 0 20px 16px;
  border-radius: 12px;
  border: 1px solid #270708;
  padding: 14px 16px;
}

.inv-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.inv-title {
  font-size: 22px;
  color: white;
}

.inv-grid {
  display: grid;
  grid-template-columns: repeat(5, 60px);
  gap: 6px;
}

.inv-slot {
  width: 60px;
  height: 60px;
  border: 1px solid #830202;
  border-radius: 4px;
  background: radial-gradient(circle, rgba(94, 7, 7, 0.185) 0%, rgba(189, 15, 15, 0.37) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}

.inv-slot:hover {
  border-color: var(--red);
  background: rgba(189, 15, 15, 0.4);
}
</style>
