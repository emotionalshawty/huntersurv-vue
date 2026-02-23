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
