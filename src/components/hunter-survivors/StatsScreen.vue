<template>
  <div :class="['screen', 'stats-page', { active: active }]">
    <div class="page-header">
      <div class="page-header-title">Hunter Stats</div>
      <div class="page-header-sub">Check your character attributes</div>
    </div>

    <div class="hero-card">
      <div class="hero-top">
        <div class="hero-avatar">🧔🏾</div>
        <div class="hero-meta">
          <div class="hero-name">Lord Ganja</div>
          <div class="hero-role">Ancient Hunter</div>
        </div>
      </div>
      <div class="hero-level-panel">
        <div class="hero-level-row">
          <span>Level {{ hunterLevel }}</span>
          <span>{{ xpCurrent.toLocaleString() }}/{{ xpMax.toLocaleString() }} XP</span>
        </div>
        <div class="attr-bar-bg hero-xp-bg">
          <div class="attr-bar-fill hero-xp-fill" :style="{ width: xpPercent + '%' }"></div>
        </div>
      </div>
    </div>

    <div class="section-title">Core Attributes</div>

    <div class="core-attrs">
      <div v-for="stat in coreAttributes" :key="stat.name" class="core-item">
        <div class="core-row">
          <div class="core-left">
            <div class="core-icon">{{ stat.icon }}</div>
            <div>
              <div class="core-name">{{ stat.name }}</div>
              <div class="core-value">{{ stat.current }}/{{ stat.max }}</div>
            </div>
          </div>
          <button class="plus-btn" @click="increaseStat(stat.name)">+</button>
        </div>
        <div class="attr-bar-bg">
          <div class="attr-bar-fill" :style="{ width: statPercent(stat) + '%', background: stat.color }"></div>
        </div>
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
import { computed, ref } from 'vue';

type IncomingAttribute = { name: string; icon: string; val: number; color: string };
type IncomingCombatStat = { val: string; label: string };
type CoreAttribute = { name: string; icon: string; current: number; max: number; color: string };

withDefaults(defineProps<{
  active: boolean;
  attributes?: IncomingAttribute[];
  combatStats?: IncomingCombatStat[];
}>(), {
  attributes: () => [],
  combatStats: () => [],
});

const hunterLevel = 420;
const xpCurrent = ref(42690);
const xpMax = ref(69000);

const xpPercent = computed(() => Math.min(100, (xpCurrent.value / xpMax.value) * 100));

const coreAttributes = ref<CoreAttribute[]>([
  { name: 'Hunter power', icon: '✶', current: 847, max: 1000, color: '#e11a1a' },
  { name: 'Strenght', icon: '✊', current: 234, max: 500, color: '#df5f0a' },
  { name: 'Endurance', icon: '🦵', current: 189, max: 300, color: '#f08a10' },
  { name: 'Vitality', icon: '🫀', current: 445, max: 600, color: '#d92748' },
  { name: 'Vigor', icon: '🧠', current: 312, max: 400, color: '#1e9b2f' },
  { name: 'Luck', icon: '🥚', current: 670, max: 690, color: '#e5d75f' },
]);

const increaseStat = (statName: string) => {
  const target = coreAttributes.value.find((stat) => stat.name === statName);
  if (!target) {
    return;
  }

  target.current = Math.min(target.max, target.current + 1);
};

const statPercent = (stat: CoreAttribute) => Math.min(100, (stat.current / stat.max) * 100);
</script>

<style>
.stats-page {
  overflow-y: auto;
  padding-bottom: 60px;
  background: #050505;
}

.stats-page::-webkit-scrollbar {
  display: none;
}

.stats-page .page-header {
  border-bottom: none;
  padding: 40px 24px 6px;
}

.stats-page .page-header-title {
  color: #e9332c;
}

.stats-page .page-header-sub {
  color: #d45e4f;
}

.hero-card {
  margin: 10px 20px 8px;
  border-radius: 12px;
  border: 1px solid #6d0d5f;
  background: linear-gradient(110deg, #390008, #22002f);
  padding: 11px 12px 10px;
}

.hero-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.hero-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(170deg, #b4ae5e, #48984d 38%, #8a1f17 72%, #2d0606);
  border: 2px solid #560b11;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.hero-name {
  font-family: var(--font-title);
  font-size: 20px;
  line-height: 1.1;
  color: white;
}

.hero-role {
  margin-top: 2px;
  color: var(--text-red);
  font-size: 15px;
  line-height: 1.1;
}

.hero-level-panel {
  margin-top: 6px;
  border-radius: 8px;
  background: #1a0010;
  padding: 8px;
}

.hero-level-row {
  display: flex;
  justify-content: space-between;
  color: var(--text-red);
  font-size: 12px;
  margin-bottom: 7px;
  padding: 0 2px;
}

.attr-bar-bg {
  height: 7px;
  background: #030303;
  border-radius: 999px;
}

.attr-bar-fill {
  height: 7px;
  border-radius: 999px;
  transition: width 0.25s ease;
}

.hero-xp-bg {
  margin-bottom: 0;
}

.hero-xp-fill {
  background: var(--red);
}

.section-title {
  padding: 0 20px;
  margin-top: 8px;
  margin-bottom: 7px;
  font-size: 33px;
  color: var(--text-red);
}

.core-attrs {
  padding: 0 12px;
}

.core-item {
  border: 1px solid #4f0707;
  border-radius: 12px;
  margin: 0 8px 11px;
  padding: 10px 12px;
}

.core-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.core-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.core-icon {
  width: 36px;
  height: 36px;
  border-radius: 2px;
  background: linear-gradient(145deg, #d5c8a2, #8a7957);
  color: #31230f;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  border: 1px solid #5f4a24;
  box-shadow: inset 0 0 0 1px rgba(32, 22, 9, 0.35);
}

.core-name {
  color: var(--text-red);
  font-size: 15px;
  line-height: 1.1;
}

.core-value {
  color: var(--text-red);
  font-size: 13px;
  line-height: 1.1;
  margin-top: 4px;
}

.plus-btn {
  width: 31px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background: linear-gradient(180deg, #861b1b, #460909);
  box-shadow: 0 0 8px rgba(255, 77, 77, 0.25);
  color: white;
  font-size: 29px;
  line-height: 1;
  cursor: pointer;
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
  padding: 12px 10px;
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
  font-size: 29px;
  color: var(--text-red);
}
</style>
