<template>
  <ion-page class="hs-page">
    <ion-content :fullscreen="true" class="hs-content">
      <div class="app-shell">
        <div class="phone">
          <EntryScreen
            :active="screen === 'entry'"
            v-model:email="email"
            v-model:password="password"
            @login="goTo('main')"
            @signup="goTo('signup')"
          />
          <SignupScreen
            :active="screen === 'signup'"
            @back="goTo('entry')"
            @signup="goTo('main')"
          />

          <div
            v-if="showNav"
            class="swipe-viewport"
            @pointerdown="onPointerDown"
            @pointerup="onPointerUp"
            @pointercancel="onPointerCancel"
          >
            <div class="swipe-track" :style="trackStyle">
              <MainScreen
                :active="screen === 'main'"
                :challenges="challenges"
                :inventory="inventory"
                @navigate="goTo"
              />
              <StatsScreen
                :active="screen === 'stats'"
                :attributes="attributes"
                :combat-stats="combatStats"
              />
              <TradesScreen
                :active="screen === 'trades'"
                :trade-tabs="tradeTabs"
                v-model:tradeTab="tradeTab"
                :filtered-trades="filteredTrades"
              />
              <ChatScreen
                :active="screen === 'chat'"
                v-model:chatTab="chatTab"
                :chats="chats"
              />
              <ProfileScreen
                :active="screen === 'profile'"
                :inventory="inventory"
              />
            </div>
          </div>

          <NotificationsScreen
            :active="screen === 'notifications'"
            :notifications="notifications"
            @back="goTo('main')"
          />
          <SettingsScreen
            :active="screen === 'settings'"
            v-model:sfx="sfx"
            v-model:music="music"
            v-model:pushNotifs="pushNotifs"
            @back="goTo('main')"
          />
          <BottomNav
            :show="showNav"
            :active-screen="screen"
            @navigate="goTo"
          />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { IonContent, IonPage } from '@ionic/vue';
import '../theme/hunter-survivors.css';

import BottomNav from '../components/hunter-survivors/BottomNav.vue';
import ChatScreen from '../components/hunter-survivors/ChatScreen.vue';
import EntryScreen from '../components/hunter-survivors/EntryScreen.vue';
import MainScreen from '../components/hunter-survivors/MainScreen.vue';
import NotificationsScreen from '../components/hunter-survivors/NotificationsScreen.vue';
import ProfileScreen from '../components/hunter-survivors/ProfileScreen.vue';
import SettingsScreen from '../components/hunter-survivors/SettingsScreen.vue';
import SignupScreen from '../components/hunter-survivors/SignupScreen.vue';
import StatsScreen from '../components/hunter-survivors/StatsScreen.vue';
import TradesScreen from '../components/hunter-survivors/TradesScreen.vue';

const screen = ref('entry');
const email = ref('');
const password = ref('');
const tradeTab = ref('All Items');
const chatTab = ref('Chats');
const sfx = ref(true);
const music = ref(true);
const pushNotifs = ref(false);

const tradeTabs = ['All Items', 'Weapons', 'Armor', 'Other'];
const navScreens = ['main', 'stats', 'trades', 'chat', 'profile'];
const showNav = computed(() => navScreens.includes(screen.value));
const navIndex = computed(() => Math.max(0, navScreens.indexOf(screen.value)));
const trackStyle = computed(() => ({
  transform: `translateX(-${navIndex.value * 100}%)`,
}));

const challenges = [
  { text: 'Kill 50 Werewolves', progress: 72 },
  { text: 'Survive 3 nights without dying', progress: 33 },
  { text: 'Defeat 1 boss creature', progress: 100 },
];

const inventory = ['⚔️', '🗡️', '🪓', '📜', '✨', '🛡️', '💀', '🔮', '👁️', '🌙', '🔥', '💎', '⚗️', '🗝️', '💍'];

const attributes = [
  { name: 'Vitality', icon: '❤️', val: 78, color: '#c40d0d' },
  { name: 'Endurance', icon: '💪', val: 63, color: '#ea7007' },
  { name: 'Strength', icon: '⚔️', val: 85, color: '#e02626' },
  { name: 'Dexterity', icon: '🎯', val: 71, color: '#ff6467' },
  { name: 'Intelligence', icon: '🔮', val: 44, color: '#d5adfa' },
  { name: 'Faith', icon: '✨', val: 30, color: '#eaa760' },
];

const combatStats = [
  { val: '682,549', label: 'Kills' },
  { val: '381', label: 'Deaths' },
  { val: '1791.4', label: 'K/D Ratio' },
  { val: '5.6M', label: 'Dmg Dealt' },
  { val: '68.3%', label: 'Survival Rate' },
  { val: '817', label: 'Bosses Defeated' },
];

const allTrades = [
  { name: 'Balder Armor', type: 'Armor', price: '2000', icon: '🛡️', cat: 'Armor' },
  { name: 'Dusk Crown Ring', type: 'Ring', price: '670', icon: '💍', cat: 'Other' },
  { name: 'Blue Eye Orb', type: 'Orb', price: '1349', icon: '👁️', cat: 'Other' },
  { name: 'Fire Keeper Soul', type: 'Soul', price: '7000', icon: '🔥', cat: 'Other' },
  { name: "Priscilla's Dagger", type: 'Weapon', price: '890', icon: '🗡️', cat: 'Weapons' },
  { name: 'Oolacile Ivory Catalyst', type: 'Weapon', price: '1470', icon: '⚗️', cat: 'Weapons' },
  { name: 'Cursed Greatsword of Artorias', type: 'Weapon', price: '5900', icon: '⚔️', cat: 'Weapons' },
  { name: "Channeler's Trident", type: 'Weapon', price: '4350', icon: '🔱', cat: 'Weapons' },
  { name: 'Black Knight Halberd', type: 'Weapon', price: '2100', icon: '🪓', cat: 'Weapons' },
  { name: "Brave's Battlewear", type: 'Armor', price: '1760', icon: '🥋', cat: 'Armor' },
  { name: 'Blue Festive Hood', type: 'Armor', price: '250', icon: '🪖', cat: 'Armor' },
  { name: 'Death Knight Helm', type: 'Armor', price: '1500', icon: '💀', cat: 'Armor' },
];

const filteredTrades = computed(() => {
  if (tradeTab.value === 'All Items') {
    return allTrades;
  }
  const map: Record<string, string> = { Weapons: 'Weapons', Armor: 'Armor', Other: 'Other' };
  return allTrades.filter((t) => t.cat === map[tradeTab.value]);
});

const chats = [
  { name: 'Shar, Mistress of the Night', preview: 'The ritual begins at midnight...', time: '2m', badge: 1, unread: true, icon: '🌑' },
  { name: 'Godrick The Grafted', preview: 'Meet me at the arena', time: '15m', badge: 2, unread: true, icon: '👑' },
  { name: 'Jiub', preview: "Wake up, we're here", time: '2h', badge: 0, unread: false, icon: '🧝' },
  { name: 'The Dark Brotherhood', preview: 'Azura: Ready for the raid?', time: '5h', badge: 0, unread: false, icon: '🔪' },
  { name: 'Serana', preview: 'Accept my trade offer man', time: '11h', badge: 0, unread: false, icon: '🧛' },
];

const notifications = [
  { title: 'Daily Reward', sub: 'Claim your daily commission', time: '5m ago', unread: true },
  { title: 'Challenge Request', sub: 'Bram Stocker wants to duel', time: '15m ago', unread: true },
  { title: 'Achievement Unlocked', sub: 'Century Slayer completed', time: '1h ago', unread: false },
  { title: 'Event Starting Soon', sub: 'The Blue Moon is rising soon...', time: '5h ago', unread: false },
];

let startX = 0;
let startY = 0;
let tracking = false;

const goTo = (next: string) => {
  screen.value = next;
};

const onPointerDown = (event: PointerEvent) => {
  if (!showNav.value) {
    return;
  }
  tracking = true;
  startX = event.clientX;
  startY = event.clientY;
};

const onPointerCancel = () => {
  tracking = false;
};

const onPointerUp = (event: PointerEvent) => {
  if (!tracking || !showNav.value) {
    return;
  }
  tracking = false;
  const deltaX = event.clientX - startX;
  const deltaY = event.clientY - startY;
  if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY)) {
    return;
  }
  const direction = deltaX < 0 ? 1 : -1;
  const nextIndex = Math.min(Math.max(navIndex.value + direction, 0), navScreens.length - 1);
  screen.value = navScreens[nextIndex];
};
</script>
