<template>
  <div :class="['screen', 'stats-page', { active: active }]">
    <div class="page-header">
      <div class="page-header-title">Hunter Stats</div>
      <div class="page-header-sub">Check your character attributes</div>
    </div>
    <div class="attr-card">
      <div v-for="a in attributes" :key="a.name" class="attr-item">
        <span class="attr-icon">{{ a.icon }}</span>
        <div class="attr-info">
          <div class="attr-name">{{ a.name }}</div>
          <div class="attr-bar-bg">
            <div class="attr-bar-fill" :style="{ width: a.val + '%', background: a.color }"></div>
          </div>
        </div>
        <div class="attr-val">{{ a.val }}</div>
      </div>
    </div>
    <div class="combat-label-row">Combat Stats</div>
    <div class="combat-grid">
      <div class="combat-stat" v-for="s in combatStats" :key="s.label">
        <div class="combat-val">{{ s.val }}</div>
        <div class="combat-label">{{ s.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  active: boolean;
  attributes: Array<{ name: string; icon: string; val: number; color: string }>;
  combatStats: Array<{ val: string; label: string }>;
}>();
</script>

<style>
.stats-page {
  overflow-y: auto;
  padding-bottom: 60px;
}

.stats-page::-webkit-scrollbar {
  display: none;
}

.attr-card {
  margin: 12px 20px;
  border-radius: 10px;
  border: 1px solid #270708;
  overflow: hidden;
}

.attr-item {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #1a0808;
}

.attr-item:last-child {
  border-bottom: none;
}

.attr-icon {
  font-size: 20px;
  margin-right: 14px;
  width: 28px;
  text-align: center;
}

.attr-info {
  flex: 1;
}

.attr-name {
  font-size: 14px;
  color: white;
}

.attr-bar-bg {
  height: 3px;
  background: #1a0808;
  border-radius: 2px;
  margin-top: 5px;
}

.attr-bar-fill {
  height: 3px;
  border-radius: 2px;
  transition: width 0.6s ease;
}

.attr-val {
  font-family: var(--font-caps);
  font-size: 20px;
  color: var(--text-red);
  min-width: 40px;
  text-align: right;
}

.combat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 0 20px 16px;
}

.combat-stat {
  border: 1px solid #270708;
  border-radius: 8px;
  padding: 16px 10px;
  text-align: center;
}

.combat-val {
  font-family: var(--font-caps);
  font-size: 22px;
  color: var(--text-red);
}

.combat-label {
  font-size: 11px;
  color: #777;
  margin-top: 4px;
}

.combat-label-row {
  padding: 0 20px 8px;
  font-size: 14px;
  color: #666;
}
</style>
