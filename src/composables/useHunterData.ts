import { computed, ref } from 'vue';

type Attribute = { name: string; icon: string; val: number; color: string };

type CombatStat = { val: string; label: string };

type TradeItem = { name: string; type: string; price: string; icon: string; cat: string };

type ChatEntry = {
  name: string;
  preview: string;
  time: string;
  badge: number;
  unread: boolean;
  icon: string;
};

type NotificationEntry = { title: string; sub: string; time: string; unread: boolean };

const challenges = [
  { text: 'Kill 50 Werewolves', progress: 72 },
  { text: 'Survive 3 nights without dying', progress: 33 },
  { text: 'Defeat 1 boss creature', progress: 100 },
];

const inventory = [
  '⚔️',
  '🗡️',
  '🪓',
  '📜',
  '✨',
  '🛡️',
  '💀',
  '🔮',
  '👁️',
  '🌙',
  '🔥',
  '💎',
  '⚗️',
  '🗝️',
  '💍',
];

const attributes: Attribute[] = [
  { name: 'Vitality', icon: '❤️', val: 78, color: '#c40d0d' },
  { name: 'Endurance', icon: '💪', val: 63, color: '#ea7007' },
  { name: 'Strength', icon: '⚔️', val: 85, color: '#e02626' },
  { name: 'Dexterity', icon: '🎯', val: 71, color: '#ff6467' },
  { name: 'Intelligence', icon: '🔮', val: 44, color: '#d5adfa' },
  { name: 'Faith', icon: '✨', val: 30, color: '#eaa760' },
];

const combatStats: CombatStat[] = [
  { val: '682,549', label: 'Kills' },
  { val: '381', label: 'Deaths' },
  { val: '1791.4', label: 'K/D Ratio' },
  { val: '5.6M', label: 'Dmg Dealt' },
  { val: '68.3%', label: 'Survival Rate' },
  { val: '817', label: 'Bosses Defeated' },
];

const tradeTabs = ['All Items', 'Weapons', 'Armor', 'Other'];

const allTrades: TradeItem[] = [
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

const chats: ChatEntry[] = [
  {
    name: 'Shar, Mistress of the Night',
    preview: 'The ritual begins at midnight...',
    time: '2m',
    badge: 1,
    unread: true,
    icon: '🌑',
  },
  {
    name: 'Godrick The Grafted',
    preview: 'Meet me at the arena',
    time: '15m',
    badge: 2,
    unread: true,
    icon: '👑',
  },
  { name: 'Jiub', preview: "Wake up, we're here", time: '2h', badge: 0, unread: false, icon: '🧝' },
  {
    name: 'The Dark Brotherhood',
    preview: 'Azura: Ready for the raid?',
    time: '5h',
    badge: 0,
    unread: false,
    icon: '🔪',
  },
  { name: 'Serana', preview: 'Accept my trade offer man', time: '11h', badge: 0, unread: false, icon: '🧛' },
];

const notifications: NotificationEntry[] = [
  { title: 'Daily Reward', sub: 'Claim your daily commission', time: '5m ago', unread: true },
  { title: 'Challenge Request', sub: 'Bram Stocker wants to duel', time: '15m ago', unread: true },
  { title: 'Achievement Unlocked', sub: 'Century Slayer completed', time: '1h ago', unread: false },
  { title: 'Event Starting Soon', sub: 'The Blue Moon is rising soon...', time: '5h ago', unread: false },
];

const state = {
  tradeTab: ref('All Items'),
  chatTab: ref('Chats'),
  sfx: ref(true),
  music: ref(true),
  pushNotifs: ref(false),
};

export const useHunterData = () => {
  const filteredTrades = computed(() => {
    if (state.tradeTab.value === 'All Items') {
      return allTrades;
    }
    const map: Record<string, string> = { Weapons: 'Weapons', Armor: 'Armor', Other: 'Other' };
    return allTrades.filter((t) => t.cat === map[state.tradeTab.value]);
  });

  const markAllNotificationsRead = () => {
    notifications.forEach(n => n.unread = false);
  };

  return {
    challenges,
    inventory,
    attributes,
    combatStats,
    tradeTabs,
    chats,
    notifications,
    tradeTab: state.tradeTab,
    chatTab: state.chatTab,
    sfx: state.sfx,
    music: state.music,
    pushNotifs: state.pushNotifs,
    filteredTrades,
    markAllNotificationsRead,
  };
};
