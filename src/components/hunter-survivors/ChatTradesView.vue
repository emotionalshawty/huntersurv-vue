<template>
  <div class="trades-view">
    <div class="trade-metrics">
      <div class="metric-card red">
        <div class="metric-value">13</div>
        <div class="metric-label">Active Listings</div>
      </div>
      <div class="metric-card green">
        <div class="metric-value">13</div>
        <div class="metric-label">Completed</div>
      </div>
      <div class="metric-card purple">
        <div class="metric-value">89%</div>
        <div class="metric-label">Rating</div>
      </div>
    </div>

    <IonButton fill="clear" class="create-listing-btn" type="button">CREATE NEW LISTING</IonButton>

    <div class="quick-trade-header">
      <div class="quick-trade-title">Quick Trade</div>
      <div class="pending-chip">2 pending</div>
    </div>

    <div class="trade-request-list">
      <div v-for="offer in quickOffers" :key="offer.name" class="trade-request-card">
        <div class="request-user">
          <div class="request-avatar">{{ offer.avatar }}</div>
          <div>
            <div class="request-name">{{ offer.name }}</div>
            <div class="request-time">{{ offer.time }}</div>
          </div>
        </div>

        <div class="request-offer-box">
          <div class="request-row">
            <span class="request-key">Offers:</span>
            <span class="request-value">{{ offer.offers }}</span>
          </div>
          <div class="request-row">
            <span class="request-key">Wants:</span>
            <span class="request-value">{{ offer.wants }}</span>
          </div>
        </div>

        <div class="request-actions">
          <IonButton fill="clear" class="trade-action accept" type="button">ACCEPT</IonButton>
          <IonButton fill="clear" class="trade-action deny" type="button">DENY</IonButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';

const quickOffers = [
  {
    name: 'Thelegend27',
    time: '5min ago',
    offers: 'All-Knowing Armor',
    wants: 'Abyss Greatsword',
    avatar: '🧔🏿',
  },
  {
    name: 'Serana',
    time: '13h ago',
    offers: 'Oolacile Ivory Catalyst',
    wants: 'Greatsword of Artorias',
    avatar: '🧛‍♀️',
  },
];
</script>

<style scoped>
.trades-view {
  overflow-y: auto;
  padding: 12px 0 16px;
}

.trades-view::-webkit-scrollbar {
  display: none;
}

.trade-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 0 16px 12px;
}

.metric-card {
  border-radius: 11px;
  border: 1px solid;
  min-height: 63px;
  padding: 8px 6px 7px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.metric-card.red {
  border-color: #6a0f13;
  background: linear-gradient(180deg, #130405, #080202 75%);
  box-shadow: inset 0 0 0 1px rgba(255, 0, 0, 0.03);
}

.metric-card.green {
  border-color: #0b5632;
  background: linear-gradient(180deg, #04130b, #020905 75%);
  box-shadow: inset 0 0 0 1px rgba(63, 255, 122, 0.03);
}

.metric-card.purple {
  border-color: #5f0c9f;
  background: linear-gradient(180deg, #11061a, #08030e 75%);
  box-shadow: inset 0 0 0 1px rgba(186, 101, 255, 0.04);
}

.metric-value {
  font-family: var(--font-title, serif);
  font-size: 21px;
  line-height: 1;
}

.metric-label {
  margin-top: 4px;
  font-size: 10px;
  font-family: var(--font-title, serif);
  line-height: 1;
}

.metric-card.red .metric-value,
.metric-card.red .metric-label {
  color: #e5393d;
}

.metric-card.green .metric-value,
.metric-card.green .metric-label {
  color: #57c56e;
}

.metric-card.purple .metric-value,
.metric-card.purple .metric-label {
  color: #cb88f8;
}

.create-listing-btn {
  display: block;
  width: calc(100% - 64px);
  min-height: 0;
  margin: 0 auto 14px;
  --border-width: 0;
  --border-radius: 12px;
  --background: linear-gradient(160deg, #a31e2e, #db0013 58%, #b40010 100%);
  --background-hover: linear-gradient(160deg, #a31e2e, #db0013 58%, #b40010 100%);
  --color: #f5e8e8;
  --padding-start: 10px;
  --padding-end: 10px;
  --padding-top: 13px;
  --padding-bottom: 13px;
  font-family: var(--font-title, serif);
  font-size: 20px;
  line-height: 1;
  letter-spacing: 0.3px;
  cursor: pointer;
  text-transform: none;
}

.quick-trade-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px 8px;
}

.quick-trade-title {
  font-family: var(--font-title, serif);
  font-size: 26px;
  line-height: 1;
  color: #c793e7;
}

.pending-chip {
  min-width: 70px;
  text-align: center;
  padding: 2px 8px;
  border-radius: 999px;
  font-family: var(--font-title, serif);
  font-size: 11px;
  line-height: 1;
  color: #ca9de8;
  background: #2b0844;
}

.trade-request-list {
  padding: 0 18px;
}

.trade-request-card {
  border: 1px solid #7608ff;
  border-radius: 14px;
  background: #040304;
  padding: 10px 10px 8px;
  margin-bottom: 12px;
}

.request-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 4px 8px;
}

.request-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #723a1f;
  background: radial-gradient(circle at 30% 30%, #5d2020, #120305);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 21px;
}

.request-name {
  font-family: var(--font-title, serif);
  font-size: 16px;
  line-height: 1;
  color: #ed9f8f;
}

.request-time {
  margin-top: 4px;
  font-family: var(--font-title, serif);
  font-size: 12px;
  line-height: 1;
  color: #8f1f24;
}

.request-offer-box {
  background: linear-gradient(140deg, #14031f, #17062b);
  border-radius: 14px;
  padding: 10px 18px 8px;
}

.request-row {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 8px;
  align-items: baseline;
  margin-bottom: 4px;
}

.request-row:last-child {
  margin-bottom: 0;
}

.request-key {
  font-family: var(--font-title, serif);
  font-size: 12px;
  color: #cc9ce8;
}

.request-value {
  font-family: var(--font-title, serif);
  font-size: 12px;
  color: #f2e6ee;
  text-align: right;
}

.request-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 8px 18px 0;
}

.trade-action {
  height: 29px;
  min-height: 29px;
  --border-radius: 4px;
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
  font-family: var(--font-title, serif);
  font-size: 19px;
  line-height: 1;
  cursor: pointer;
  text-transform: none;
  margin: 0;
}

.trade-action.accept {
  --border-width: 0;
  --background: #0f6a37;
  --background-hover: #0f6a37;
  --color: #d6eee0;
}

.trade-action.deny {
  --border-width: 1px;
  --border-style: solid;
  --border-color: #c42121;
  --background: transparent;
  --background-hover: transparent;
  --color: #f08f8f;
}

@media (max-width: 420px) {
  .trade-metrics {
    gap: 10px;
    padding-left: 14px;
    padding-right: 14px;
  }

  .metric-value {
    font-size: 20px;
  }

  .quick-trade-title {
    font-size: 34px;
  }

  .create-listing-btn {
    width: calc(100% - 48px);
    font-size: 18px;
  }
}
</style>
