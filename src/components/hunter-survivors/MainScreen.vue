<template>
  <div :class="['screen', 'main-screen', { active: active }]">
    <div class="topbar">
      <div class="user-info">
        <div class="avatar-wrap">
          <div class="avatar">
            <img src="/ganjagod.png" alt="Ganjagod avatar" class="avatar-img" />
          </div>
        </div>
        <div class="user-meta">
          <div class="user-name">Lord Ganja</div>
          <div class="user-level">Level 420</div>
        </div>
      </div>
      <div class="topbar-icons">
        <button class="icon-btn bell-btn" @click="$emit('navigate', 'notifications')" aria-label="Notifications">
          <span class="icon-glyph">🔔</span>
          <span class="notif-dot notif-dot-one"></span>
          <span class="notif-dot notif-dot-two"></span>
        </button>
        <button class="icon-btn" @click="$emit('navigate', 'settings')" aria-label="Settings">
          <span class="icon-glyph">⚙</span>
        </button>
      </div>
    </div>

    <div class="currency-bar">
      <div class="currency-pill coins">Coins: 2,847</div>
      <div class="currency-pill moon">🌖 279</div>
      <div class="currency-pill fire">🔥 53</div>
    </div>

    <div class="event-card">
      <div class="event-title">🔥 Blood moon rising</div>
      <div class="event-desc">The blood moon is approaching. Get double coins for the next 24 hours.</div>
      <button class="btn-join-event">JOIN EVENT</button>
    </div>

    <div class="section-card">
      <div class="section-title daily-title">Daily Challenges</div>
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
        <div class="inv-link" @click="$emit('navigate', 'profile')">Full Inventory</div>
      </div>
      <div class="inv-grid">
        <div v-for="(item, index) in inventory" :key="`${item}-${index}`" class="inv-slot">
          <img :src="item" alt="Inventory item" class="inv-icon" />
        </div>
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
  padding-bottom: 68px;
}

.main-screen::-webkit-scrollbar {
  display: none;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 36px 18px 0;
  border-bottom: none;
  margin-bottom: 6px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar-wrap {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 0;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(170deg, #b8ac4d 11%, #459648 31%, #8d281d 67%, #220407 87%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #400b0e;
  flex-shrink: 0;
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.user-meta {
  padding-top: 2px;
}

.user-name {
  font-family: var(--font-title);
  font-size: 20px;
  line-height: 1.05;
  color: #f4ece6;
}

.user-level {
  font-family: var(--font-title);
  font-size: 13px;
  line-height: 1.05;
  color: #e22829;
  margin-top: 5px;
}

.topbar-icons {
  display: flex;
  align-items: center;
  gap: 4px;
}

.icon-btn {
  background: none;
  border: none;
  color: var(--red);
  cursor: pointer;
  font-size: 20px;
  position: relative;
  padding: 3px;
}

.icon-glyph {
  filter: sepia(1) saturate(8) hue-rotate(-20deg) brightness(1.05);
}

.bell-btn {
  padding-right: 8px;
}

.notif-dot {
  position: absolute;
  width: 5px;
  height: 5px;
  background: var(--red);
  border-radius: 50%;
}

.notif-dot-one {
  top: 3px;
  right: 7px;
}

.notif-dot-two {
  top: 2px;
  right: 2px;
}

.currency-bar {
  display: flex;
  gap: 14px;
  padding: 3px 16px 12px;
}

.currency-pill {
  flex: 1;
  border-radius: 4px;
  padding: 4px 10px 5px;
  font-size: 12px;
  text-align: center;
  font-family: var(--font-title);
  line-height: 1.05;
}

.currency-pill.coins {
  background: #330707;
  color: #d9a39f;
}

.currency-pill.moon {
  background: #300055;
  color: #c8a7e8;
}

.currency-pill.fire {
  background: #2f0602;
  color: #f59b64;
}

.event-card {
  margin: 0 20px 26px;
  border-radius: 12px;
  border: 1px solid #7a0f66;
  background: linear-gradient(108deg, #3e0007, #2a0145);
  padding: 14px 20px 12px;
  position: relative;
  overflow: hidden;
}

.event-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 75% 54%, rgba(255, 0, 89, 0.08), transparent 62%);
  pointer-events: none;
}

.event-title {
  color: #ff8a29;
  font-family: var(--font-title);
  font-size: 16px;
  line-height: 1;
  margin-bottom: 7px;
}

.event-desc {
  color: #ef9a67;
  font-size: 12px;
  line-height: 1.34;
  margin-bottom: 11px;
  max-width: 95%;
}

.btn-join-event {
  background: #992120;
  border: none;
  border-radius: 7px;
  color: white;
  font-family: var(--font-title);
  font-size: 22px;
  line-height: 1;
  padding: 11px 28px 12px;
  cursor: pointer;
  letter-spacing: 0.4px;
  display: block;
  margin: 0 auto;
  transition: background 0.2s, transform 0.1s;
}

.btn-join-event:hover {
  background: #b22727;
}

.btn-join-event:active {
  transform: translateY(1px);
}

.section-card {
  margin: 0 20px 20px;
  border-radius: 12px;
  border: 1px solid #410409;
  padding: 12px 10px 10px;
}

.section-title {
  font-family: var(--font-title);
  font-size: 22px;
  line-height: 1;
  color: #e23635;
  margin-bottom: 9px;
  padding-left: 6px;
}

.main-screen .daily-title {
  font-size: 18px;
  color: #e65b5d;
}

.challenge-item {
  background: #620106;
  border: 1px solid #7e1519;
  border-radius: 0;
  padding: 9px 10px 10px;
  margin: 0 10px 10px;
}

.challenge-text {
  color: #f0e2dd;
  font-size: 11px;
  margin-bottom: 8px;
  font-family: var(--font-title);
  line-height: 1;
}

.challenge-bar-bg {
  height: 2px;
  background: #0b0404;
  border-radius: 2px;
}

.challenge-bar-fill {
  height: 2px;
  background: linear-gradient(to right, #cf1a1a, #700000);
  border-radius: 2px;
  transition: width 0.5s;
}

.inv-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 11px;
  padding: 0 6px;
}

.inv-title {
  font-family: var(--font-title);
  font-size: 15px;
  line-height: 1;
  color: #d92c31;
}

.inv-link {
  font-family: var(--font-title);
  font-size: 15px;
  line-height: 1;
  color: #d92c31;
  cursor: pointer;
}

.inv-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 9px;
  padding: 0 6px 8px;
}

.inv-slot {
  aspect-ratio: 1 / 1;
  border: 1px solid #9a0f0f;
  border-radius: 0;
  background: radial-gradient(circle at 50% 44%, rgba(255, 52, 52, 0.38) 0%, rgba(84, 0, 0, 0.74) 56%, rgba(36, 0, 0, 0.98) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}

.inv-icon {
  width: 78%;
  height: 78%;
  object-fit: contain;
  filter: drop-shadow(0 0 6px rgba(255, 170, 130, 0.2));
  pointer-events: none;
}

.inv-slot:hover {
  border-color: #d31e1e;
  background: radial-gradient(circle at 50% 44%, rgba(255, 58, 58, 0.47) 0%, rgba(92, 0, 0, 0.8) 58%, rgba(39, 0, 0, 1) 100%);
}
</style>
