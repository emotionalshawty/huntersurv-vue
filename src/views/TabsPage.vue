<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" class="hs-tab-bar">
        <ion-tab-button tab="main" href="/tabs/main">
          <ion-icon :icon="homeOutline" />
        </ion-tab-button>
        <ion-tab-button tab="stats" href="/tabs/stats">
          <ion-icon :icon="barChartOutline" />
        </ion-tab-button>
        <ion-tab-button tab="trades" href="/tabs/trades">
          <ion-icon :icon="cartOutline" />
        </ion-tab-button>
        <ion-tab-button tab="chat" href="/tabs/chat">
          <ion-icon :icon="chatbubbleOutline" />
        </ion-tab-button>
        <ion-tab-button tab="profile" href="/tabs/profile">
          <ion-icon :icon="personOutline" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonIcon,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonRouterOutlet,
} from '@ionic/vue';
import {
  barChartOutline,
  cartOutline,
  chatbubbleOutline,
  homeOutline,
  personOutline,
} from 'ionicons/icons';
</script>

<style>
.hs-tab-bar {
  --background: #080404;
  --border: #3a0d0d;
  border-top: 1px solid #3a0d0d;
  padding: 6px 8px 10px;
  height: 64px;
}

.hs-tab-bar ion-tab-button {
  --color: #6a1d1d;
  --color-selected: #ff2a2a;
  --ripple-color: rgba(255, 42, 42, 0.25);
  background: transparent;
}

.hs-tab-bar ion-tab-button ion-icon {
  font-size: 26px;
}
</style>
