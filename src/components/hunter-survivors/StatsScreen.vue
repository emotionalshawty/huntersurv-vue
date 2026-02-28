<template>
  <div :class="['screen', 'stats-page', { active: active }]">
    <div class="page-header">
      <div class="page-header-title">Hunter Stats</div>
      <div class="page-header-sub">Check your character attributes</div>
    </div>

    <div class="hero-card">
      <div class="hero-top">
        <div class="hero-avatar">
          <img src="/ganjagod.png" alt="Ganjagod avatar" class="hero-avatar-img" />
        </div>
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
        <ProgressBar
          :value="xpPercent"
          :showValue="false"
          :pt="{ root: { class: 'attr-bar-bg hero-xp-bg' }, value: { class: 'attr-bar-fill hero-xp-fill' } }"
        />
      </div>
    </div>

    <div class="section-title">Core Attributes</div>

    <div class="core-attrs">
      <div v-for="stat in coreAttributes" :key="stat.name" class="core-item">
        <div class="core-row">
          <div class="core-left">
            <div class="core-icon">
              <img :src="stat.icon" :alt="stat.name" class="core-icon-img" />
            </div>
            <div>
              <div class="core-name">{{ stat.name }}</div>
              <div class="core-value">{{ stat.current }}/{{ stat.max }}</div>
            </div>
          </div>
          <IonButton fill="clear" class="plus-btn" @click="increaseStat(stat.name)">+</IonButton>
        </div>
        <ProgressBar
          :value="statPercent(stat)"
          :showValue="false"
          :pt="{ root: { class: 'attr-bar-bg' }, value: { class: 'attr-bar-fill', style: { '--stat-color': stat.color } } }"
        />
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
import { IonButton } from '@ionic/vue';
import ProgressBar from 'primevue/progressbar';

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
  { name: 'Hunter power', icon: '/stats/para_faith.webp', current: 847, max: 1000, color: '#e11a1a' },
  { name: 'Strenght', icon: '/stats/para_str_large.webp', current: 234, max: 500, color: '#df5f0a' },
  { name: 'Endurance', icon: '/stats/para_endurance.webp', current: 189, max: 300, color: '#f08a10' },
  { name: 'Vitality', icon: '/stats/para_vit.webp', current: 445, max: 600, color: '#d92748' },
  { name: 'Vigor', icon: '/stats/para_vig.webp', current: 312, max: 400, color: '#1e9b2f' },
  { name: 'Luck', icon: '/stats/dsiiiluck.webp', current: 670, max: 690, color: '#e5d75f' },
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
  background: var(--bg);
  --stats-text-dark: #b41f24;
}

.stats-page::-webkit-scrollbar {
  display: none;
}

.stats-page .page-header {
  border-bottom: none;
  padding: 40px 24px 6px;
}

.stats-page .page-header-title {
  color: var(--stats-text-dark);
  font-family: var(--font-title);
  font-size: 44px;
  line-height: 1;
}

.stats-page .page-header-sub {
  color: #b95444;
  font-size: 14px;
  line-height: 1.2;
}

.hero-card {
  margin: 10px 20px 8px;
  border-radius: 12px;
  border: 1px solid #6d0d5f;
  background: linear-gradient(110deg, #390008, #22002f);
  padding: 11px 12px 10px;
  box-shadow: 0 0 0 1px rgba(80, 8, 26, 0.25) inset;
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
  overflow: hidden;
}

.hero-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero-name {
  font-family: var(--font-title);
  font-size: 20px;
  line-height: 1.1;
  color: white;
}

.hero-role {
  margin-top: 2px;
  color: var(--stats-text-dark);
  font-family: var(--font-title);
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
  color: var(--stats-text-dark);
  font-family: var(--font-title);
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
  background: linear-gradient(to right, var(--stat-color, var(--red)) 0%, #1f1f1f 100%);
  background: linear-gradient(to right, var(--stat-color, var(--red)) 0%, color-mix(in srgb, var(--stat-color, var(--red)) 45%, black) 100%);
  transition: width 0.25s ease;
}

.hero-xp-bg {
  margin-bottom: 0;
}

.hero-xp-fill {
  background: linear-gradient(to right, var(--red) 0%, color-mix(in srgb, var(--red) 45%, black) 100%);
}

.section-title {
  padding: 0 20px;
  margin-top: 8px;
  margin-bottom: 7px;
  font-family: var(--font-title);
  font-size: 35px;
  line-height: 1;
  color: var(--stats-text-dark);
}

.core-attrs {
  padding: 0 12px;
}

.core-item {
  border: 1px solid #4e0709;
  border-radius: 12px;
  margin: 0 8px 11px;
  padding: 10px 12px;
  background: linear-gradient(180deg, rgba(17, 4, 4, 0.5), rgba(8, 2, 2, 0.45));
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
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #5f4a24;
  box-shadow: inset 0 0 0 1px rgba(32, 22, 9, 0.35);
  overflow: hidden;
}

.core-icon-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.core-name {
  color: var(--stats-text-dark);
  font-family: var(--font-title);
  font-size: 15px;
  line-height: 1.1;
}

.core-value {
  color: var(--stats-text-dark);
  font-size: 14px;
  line-height: 1.1;
  margin-top: 4px;
}

.plus-btn {
  width: 31px;
  height: 30px;
  min-height: 30px;
  --border-width: 1px;
  --border-style: solid;
  --border-color: rgba(199, 42, 42, 0.3);
  --border-radius: 5px;
  --background: linear-gradient(180deg, #861b1b, #460909);
  --background-hover: linear-gradient(180deg, #861b1b, #460909);
  --box-shadow: 0 0 8px rgba(255, 77, 77, 0.25);
  --color: white;
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
  font-family: var(--font-caps);
  text-transform: none;
  margin: 0;
  font-size: 29px;
  line-height: 1;
  cursor: pointer;
}

.plus-btn:active {
  transform: translateY(1px);
}

.combat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 0 20px 18px;
}

.combat-stat {
  border: 1px solid #3f090e;
  border-radius: 8px;
  padding: 14px 10px 12px;
  text-align: center;
}

.combat-val {
  font-family: var(--font-title);
  font-size: 34px;
  line-height: 1;
  color: var(--stats-text-dark);
}

.combat-label {
  font-family: var(--font-title);
  font-size: 11px;
  color: var(--stats-text-dark);
  margin-top: 2px;
  line-height: 1.1;
}

.combat-label-row {
  padding: 0 20px 8px;
  font-family: var(--font-title);
  font-size: 33px;
  line-height: 1;
  color: var(--stats-text-dark);
}
</style>
