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

const inventoryIconPool = [
  '/assets/Icons/Weapons/Greatsword_of_Artorias.png',
  '/assets/Icons/Weapons/Abyss_Greatsword.png',
  '/assets/Icons/Weapons/Black_Knight_Halberd.png',
  '/assets/Icons/Weapons/Priscillas_Dagger.png',
  '/assets/Icons/Weapons/Oolacile_Ivory_Catalyst.png',
  '/assets/Icons/Weapons/Channelers_Trident.png',
  '/assets/Icons/Rings/Dusk_Crown_Ring.png',
  '/assets/Icons/Rings/Havels_Ring.png',
  '/assets/Icons/Shields/Crest_Shield.png',
  '/assets/Icons/Shields/Grass_Crest_Shield.png',
  '/assets/Icons/Upgrades/Twinkling_Titanite.png',
  '/assets/Icons/Upgrades/Titanite_Chunk.png',
  '/assets/Icons/Souls/Regular_Boss_Soul.png',
  '/assets/Icons/Souls/Soul_of_Artorias.png',
  '/assets/Icons/Consumables/Estus_Flask.png',
  '/assets/Icons/Consumables/Humanity.png',
  '/assets/Icons/Consumables/Firekeeper_Soul.png',
  '/assets/Icons/Consumables/Black_Firebomb.png',
  '/assets/Icons/Keys/Crest_of_Artorias.png',
  '/assets/Icons/Keys/Master_Key.png',
  '/assets/Icons/Magic/Great_Fireball.png',
  '/assets/Icons/Magic/Great_Lightning_Spear.png',
  '/assets/Icons/Magic/Soul_Spear.png',
  '/assets/Icons/Helmets/Helm_of_Artorias.png',
  '/assets/Icons/Helmets/Great_Lord_Crown.png',
  '/assets/Icons/Embers/Very_Large_Ember.png',
  '/assets/Icons/Embers/Chaos_Flame_Ember.png',
];

const pickRandomInventoryIcons = (count: number) => {
  return Array.from({ length: count }, () => {
    const randomIndex = Math.floor(Math.random() * inventoryIconPool.length);
    return inventoryIconPool[randomIndex];
  });
};

const inventory = pickRandomInventoryIcons(15);
const fullInventory = pickRandomInventoryIcons(55);



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
  { val: '1791,4', label: 'K/D Ratio' },
  { val: '5,612,400', label: 'Damage dealt' },
  { val: '68.3%', label: 'Survival Rate' },
  { val: '817', label: 'Bosses Defeated' },
];

const tradeTabs = ['All Items', 'Weapons', 'Armor', 'Other'];

const allTrades: TradeItem[] = [
  { name: 'Crest Shield', type: 'Shield', price: '2000', icon: '/assets/Icons/Shields/Crest_Shield.png', cat: 'Armor' },
  { name: 'Dusk Crown Ring', type: 'Ring', price: '670', icon: '/assets/Icons/Rings/Dusk_Crown_Ring.png', cat: 'Other' },
  { name: 'Master Key', type: 'Key Item', price: '1349', icon: '/assets/Icons/Keys/Master_Key.png', cat: 'Other' },
  { name: 'Fire Keeper Soul', type: 'Soul', price: '7000', icon: '/assets/Icons/Consumables/Firekeeper_Soul.png', cat: 'Other' },
  { name: "Priscilla's Dagger", type: 'Dagger', price: '890', icon: '/assets/Icons/Weapons/Priscillas_Dagger.png', cat: 'Weapons' },
  { name: 'Oolacile Ivory Catalyst', type: 'Catalyst', price: '1470', icon: '/assets/Icons/Weapons/Oolacile_Ivory_Catalyst.png', cat: 'Weapons' },
  { name: 'Greatsword of Artorias', type: 'Greatsword', price: '5900', icon: '/assets/Icons/Weapons/Greatsword_of_Artorias.png', cat: 'Weapons' },
  { name: "Channeler's Trident", type: 'Trident', price: '4350', icon: '/assets/Icons/Weapons/Channelers_Trident.png', cat: 'Weapons' },
  { name: 'Black Knight Halberd', type: 'Halberd', price: '2100', icon: '/assets/Icons/Weapons/Black_Knight_Halberd.png', cat: 'Weapons' },
  { name: 'Helm of Artorias', type: 'Helm', price: '1760', icon: '/assets/Icons/Helmets/Helm_of_Artorias.png', cat: 'Armor' },
  { name: 'Great Lord Crown', type: 'Crown', price: '250', icon: '/assets/Icons/Helmets/Great_Lord_Crown.png', cat: 'Armor' },
  { name: "Havel's Ring", type: 'Ring', price: '1500', icon: '/assets/Icons/Rings/Havels_Ring.png', cat: 'Other' },
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
    fullInventory,
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
