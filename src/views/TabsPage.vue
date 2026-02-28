<template>
  <ion-page @touchstart="onTouchStart" @touchend="onTouchEnd" @touchcancel="onTouchCancel">
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
import { useRoute, useRouter } from 'vue-router';
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

const router = useRouter();
const route = useRoute();

const tabOrder = ['main', 'stats', 'trades', 'chat', 'profile'] as const;

let touchStartX = 0;
let touchStartY = 0;
let touchTracking = false;

const getCurrentTabIndex = () => {
  const currentPath = route.path;
  const activeTab = tabOrder.find((tab) => currentPath.startsWith(`/tabs/${tab}`));
  return activeTab ? tabOrder.indexOf(activeTab) : 0;
};

const onTouchStart = (event: TouchEvent) => {
  if (event.touches.length !== 1) {
    touchTracking = false;
    return;
  }

  const touch = event.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
  touchTracking = true;
};

const onTouchCancel = () => {
  touchTracking = false;
};

const onTouchEnd = (event: TouchEvent) => {
  if (!touchTracking || event.changedTouches.length !== 1) {
    return;
  }

  touchTracking = false;
  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - touchStartX;
  const deltaY = touch.clientY - touchStartY;

  if (Math.abs(deltaX) < 65 || Math.abs(deltaX) < Math.abs(deltaY)) {
    return;
  }

  const direction = deltaX < 0 ? 1 : -1;
  const currentIndex = getCurrentTabIndex();
  const nextIndex = Math.min(Math.max(currentIndex + direction, 0), tabOrder.length - 1);

  if (nextIndex === currentIndex) {
    return;
  }

  router.push(`/tabs/${tabOrder[nextIndex]}`);
};
</script>

<style>
.hs-tab-bar {
  --background: #080404;
  --border: transparent;
  border-top: none;
  padding: 6px 8px 10px;
  height: 64px;
  position: relative;
}

.hs-tab-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.82) 50%, rgba(255, 255, 255, 0) 100%);
  opacity: 0.75;
  pointer-events: none;
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
