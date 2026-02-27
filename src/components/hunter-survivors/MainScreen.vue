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

<style>
.main-screen {
  background: var(--bg);
  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 60px;
}

.main-screen::-webkit-scrollbar {
  display: none;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 35px 18px 0;
  border-bottom: 1px solid #1a0808;
  padding-bottom: 12px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 13px;
}

.avatar {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b0000, #3d0000);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  border: 2px solid var(--red);
  flex-shrink: 0;
}

.user-name {
  font-family: var(--font-title);
  font-size: 20px;
  color: white;
}

.user-level {
  font-size: 16px;
  color: var(--red);
}

.topbar-icons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-btn {
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  font-size: 20px;
  position: relative;
  padding: 4px;
}

.notif-dot {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 7px;
  height: 7px;
  background: var(--red);
  border-radius: 50%;
}

.currency-bar {
  display: flex;
  gap: 6px;
  padding: 10px 18px;
}

.currency-pill {
  border-radius: 4px;
  padding: 3px 10px;
  font-size: 14px;
  font-family: var(--font-body);
}

.currency-pill.coins {
  background: #230404;
  color: var(--text-dim);
}

.currency-pill.moon {
  background: var(--purple);
  color: var(--text-purple);
}

.currency-pill.fire {
  background: #220903;
  color: var(--orange);
}

.event-card {
  margin: 0 20px 16px;
  border-radius: 12px;
  border: 1px solid var(--red-border);
  background: linear-gradient(108deg, #240608, #1e0232);
  padding: 18px 20px;
  position: relative;
  overflow: hidden;
}

.event-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 80% 50%, rgba(196, 13, 13, 0.1), transparent 60%);
  pointer-events: none;
}

.event-title {
  color: #ea7007;
  font-size: 16px;
  margin-bottom: 6px;
}

.event-desc {
  color: var(--text-orange);
  font-size: 13px;
  line-height: 1.4;
  margin-bottom: 12px;
}

.btn-join-event {
  background: #811918;
  border: none;
  border-radius: 6px;
  color: white;
  font-family: var(--font-title);
  font-size: 18px;
  padding: 10px 32px;
  cursor: pointer;
  letter-spacing: 1px;
  display: block;
  margin: 0 auto;
  transition: background 0.2s;
}

.btn-join-event:hover {
  background: #a01e1e;
}

.section-card {
  margin: 0 20px 16px;
  border-radius: 12px;
  border: 1px solid #270708;
  padding: 14px 16px;
}

.section-title {
  font-size: 22px;
  color: var(--text-red);
  margin-bottom: 12px;
}

.challenge-item {
  background: var(--red-card);
  border: 1px solid var(--red-border);
  border-radius: 4px;
  padding: 10px 12px;
  margin-bottom: 8px;
}

.challenge-text {
  color: white;
  font-size: 14px;
  margin-bottom: 6px;
}

.challenge-bar-bg {
  height: 3px;
  background: rgba(81, 17, 30, 0.5);
  border-radius: 2px;
}

.challenge-bar-fill {
  height: 3px;
  background: var(--red);
  border-radius: 2px;
  transition: width 0.5s;
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

.inv-link {
  font-size: 16px;
  color: var(--text-red);
  cursor: pointer;
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
