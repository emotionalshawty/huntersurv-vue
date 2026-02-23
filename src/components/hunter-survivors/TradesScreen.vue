<template>
  <div :class="['screen', 'trades-page', { active: active }]">
    <div class="page-header">
      <div class="page-header-title">Blood Market</div>
      <div class="page-header-sub">Trade weapons and resources</div>
    </div>
    <div class="search-bar">
      <span>🔍</span>
      <input type="text" placeholder="Search for items" />
    </div>
    <div class="wallet-bar">
      <div class="wallet-label">Your Coins</div>
      <div class="wallet-amount">2,847</div>
    </div>
    <div class="tab-row">
      <div
        v-for="t in tradeTabs"
        :key="t"
        :class="['tab-item', { active: tradeTab === t }]"
        @click="emit('update:tradeTab', t)"
      >
        {{ t }}
      </div>
    </div>
    <div v-for="item in filteredTrades" :key="item.name" class="trade-item">
      <div class="trade-img">{{ item.icon }}</div>
      <div class="trade-info">
        <div class="trade-name">{{ item.name }}</div>
        <div class="trade-type">{{ item.type }}</div>
      </div>
      <div class="trade-price">{{ item.price }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  active: boolean;
  tradeTabs: string[];
  tradeTab: string;
  filteredTrades: Array<{ name: string; type: string; price: string; icon: string }>;
}>();

const emit = defineEmits<{
  (e: 'update:tradeTab', value: string): void;
}>();
</script>
