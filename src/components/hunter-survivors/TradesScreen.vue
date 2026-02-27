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

<style>
.trades-page {
  overflow-y: auto;
  padding-bottom: 60px;
}

.trades-page::-webkit-scrollbar {
  display: none;
}

.search-bar {
  margin: 10px 16px;
  height: 42px;
  border: 1px solid #1a0808;
  border-radius: 10px;
  background: #0e0a0a;
  display: flex;
  align-items: center;
  padding: 0 14px;
  gap: 10px;
  color: #555;
  font-size: 14px;
}

.search-bar input {
  background: transparent;
  border: none;
  outline: none;
  color: #aaa;
  font-family: var(--font-body);
  font-size: 14px;
  flex: 1;
}

.wallet-bar {
  padding: 8px 9px 14px;
  border-bottom: 1px solid #1a0808;
}

.wallet-label {
  font-size: 13px;
  color: #555;
}

.wallet-amount {
  font-family: var(--font-caps);
  font-size: 26px;
  color: var(--text-red);
}

.tab-row {
  display: flex;
  border-bottom: 1px solid #1a0808;
  padding: 0 35px;
}

.tab-item {
  font-size: 16px;
  color: #555;
  padding: 8px 18px 8px 0;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: color 0.2s;
}

.tab-item.active {
  color: white;
  border-bottom-color: var(--red);
}

.trade-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid #0f0808;
  gap: 12px;
  cursor: pointer;
  transition: background 0.15s;
}

.trade-item:hover {
  background: rgba(81, 17, 30, 0.15);
}

.trade-img {
  width: 44px;
  height: 44px;
  border: 1px solid #830202;
  border-radius: 6px;
  background: radial-gradient(circle, rgba(94, 7, 7, 0.2), rgba(189, 15, 15, 0.3));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.trade-info {
  flex: 1;
}

.trade-name {
  font-size: 14px;
  color: white;
}

.trade-type {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
}

.trade-price {
  font-family: var(--font-caps);
  font-size: 18px;
  color: var(--text-red);
}
</style>
