<template>
  <div :class="['screen', 'trades-page', { active: active }]">
    <div class="page-header">
      <div class="page-header-title">Blood Market</div>
      <div class="page-header-sub">Trade weapons and resources</div>
    </div>

    <div class="search-bar">
      <svg viewBox="0 0 24 24" class="search-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="7"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <InputText v-model="searchQuery" type="text" placeholder="Search for items" />
    </div>

    <div class="wallet-bar">
      <div class="wallet-label">Your Coins</div>
      <div class="wallet-amount">2,847</div>
    </div>

    <div class="tab-row">
      <div
        v-for="tab in tradeTabs"
        :key="tab"
        :class="['tab-item', { active: tradeTab === tab }]"
        @click="emit('update:tradeTab', tab)"
      >
        {{ tab }}
      </div>
    </div>

    <div class="trade-list">
      <div v-for="item in visibleTrades" :key="item.name" class="trade-item">
        <div class="trade-top">
          <div class="trade-left">
            <div class="trade-img">
              <img :src="item.icon" :alt="item.name" class="trade-icon" />
            </div>
            <div class="trade-info">
              <div class="trade-name">{{ item.name }}</div>
              <div class="trade-type">{{ item.type }}</div>
            </div>
          </div>
          <div class="trade-price">{{ item.price }}</div>
        </div>

        <div class="trade-actions">
          <IonButton class="trade-btn trade-btn-buy" fill="clear">Buy</IonButton>
          <IonButton class="trade-btn trade-btn-chat" fill="clear">Open trade chat</IonButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { IonButton } from '@ionic/vue';
import InputText from 'primevue/inputtext';

const props = defineProps<{
  active: boolean;
  tradeTabs: string[];
  tradeTab: string;
  filteredTrades: Array<{ name: string; type: string; price: string; icon: string }>;
}>();

const emit = defineEmits<{
  (e: 'update:tradeTab', value: string): void;
}>();

const searchQuery = ref('');

const visibleTrades = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) {
    return props.filteredTrades;
  }

  return props.filteredTrades.filter((item) => {
    return (
      item.name.toLowerCase().includes(query)
      || item.type.toLowerCase().includes(query)
      || item.price.toLowerCase().includes(query)
    );
  });
});
</script>

<style scoped>
.trades-page {
  overflow-y: auto;
  padding-bottom: calc(70px + env(safe-area-inset-bottom));
  background: #050101;
}

.trades-page .page-header {
  border-bottom: 1px solid #2a0808;
}

.trades-page .page-header-title {
  color: #ff2a2a;
}

.trades-page .page-header-sub {
  font-family: var(--font-title);
  font-size: 15px;
  color: #b84a4a;
}

.trades-page::-webkit-scrollbar {
  display: none;
}

.search-bar {
  margin: 10px 18px;
  height: 48px;
  border: 1px solid #661010;
  border-radius: 13px;
  background: #070202;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 10px;
  color: #b62222;
}

.search-icon {
  width: 22px;
  height: 22px;
}

.search-bar input {
  background: transparent;
  border: none;
  outline: none;
  color: #d53a3a;
  font-family: var(--font-body);
  font-size: 16px;
  flex: 1;
}

.search-bar input::placeholder {
  color: #9d1d1d;
}

.wallet-bar {
  padding: 10px 14px 12px;
  border-bottom: 1px solid #2f0909;
  background: linear-gradient(90deg, rgba(85, 4, 4, 0.82), rgba(28, 0, 56, 0.78));
}

.wallet-label {
  font-size: 12px;
  color: #b26161;
}

.wallet-amount {
  font-family: var(--font-title);
  font-size: 52px;
  line-height: 0.95;
  color: var(--text-red);
}

.tab-row {
  display: flex;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  border-bottom: 1px solid #2f0909;
  padding: 0 18px;
  background: #050101;
}

.tab-row::-webkit-scrollbar {
  display: none;
}

.tab-item {
  font-family: var(--font-title);
  font-size: 18px;
  color: #b14646;
  flex: 0 0 auto;
  min-width: 120px;
  text-align: center;
  padding: 8px 10px 10px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: color 0.2s;
}

.tab-item.active {
  color: #ff5a5a;
  border-bottom-color: var(--red);
}

.trade-list {
  padding: 12px 14px 0;
}

.trade-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 6px 12px;
  padding: 10px 12px 12px;
  border: 1px solid #631010;
  border-radius: 14px;
  background: #060202;
}

.trade-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}

.trade-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.trade-img {
  width: 44px;
  height: 44px;
  border: 1px solid #6d1616;
  border-radius: 6px;
  background: radial-gradient(circle, rgba(94, 7, 7, 0.25), rgba(189, 15, 15, 0.18));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.trade-icon {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.trade-info {
  flex: 1;
  min-width: 0;
}

.trade-name {
  font-family: var(--font-title);
  font-size: 14px;
  color: #f0b6b6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.trade-type {
  font-size: 11px;
  color: #8f3434;
  margin-top: 1px;
}

.trade-price {
  font-family: var(--font-title);
  font-size: 34px;
  line-height: 1;
  color: #f58b8b;
}

.trade-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-left: 54px;
}

.trade-btn {
  height: 32px;
  min-height: 32px;
  --border-radius: 6px;
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
  font-family: var(--font-body);
  font-size: 14px;
  cursor: pointer;
  text-transform: none;
  margin: 0;
}

.trade-btn-buy {
  width: 135px;
  --color: #fff;
  --background: linear-gradient(90deg, #d10000, #9d0000);
  --background-hover: linear-gradient(90deg, #d10000, #9d0000);
}

.trade-btn-chat {
  width: 135px;
  --color: #f2d5d5;
  --background: transparent;
  --background-hover: transparent;
  --border-color: #b51414;
  --border-style: solid;
  --border-width: 1px;
}
</style>
