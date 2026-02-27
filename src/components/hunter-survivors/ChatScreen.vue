<template>
  <div :class="['screen', 'chat-page', { active: active }]">
    <div v-if="viewMode === 'list'" class="chat-list-view">
      <div class="page-header">
        <div class="page-header-title">Hunter's Whispers</div>
        <div class="page-header-sub">Interact with other damned</div>
      </div>
      <div class="chat-tabs">
        <div
          :class="['chat-tab', { active: chatTab === 'Chats' }]"
          @click="emit('update:chatTab', 'Chats')"
        >
          Chats
        </div>
        <div
          :class="['chat-tab', { active: chatTab === 'Trades' }]"
          @click="emit('update:chatTab', 'Trades')"
        >
          Trades
        </div>
      </div>
      <div class="chat-list">
        <div
          v-for="c in chats"
          :key="c.name"
          :class="['chat-entry', { selected: c.name === activeChat }]"
          @click="selectChat(c.name)"
        >
          <div class="chat-avatar">{{ c.icon }}</div>
          <span v-if="c.unread" class="unread-dot"></span>
          <div class="chat-meta">
            <div class="chat-name">{{ c.name }}</div>
            <div class="chat-preview">{{ c.preview }}</div>
          </div>
          <div class="chat-time">{{ c.time }}</div>
          <div v-if="c.badge" class="chat-badge">{{ c.badge }}</div>
        </div>
      </div>
      <div class="chat-action-btns">
        <button class="btn-chat-action">ADD FRIENDS</button>
        <button class="btn-chat-action">CREATE CHAT</button>
      </div>
      <div class="chat-map-section">
        <div class="chat-map-title">Community Map</div>
        <MapViewer />
      </div>
    </div>
    <div v-else class="chat-thread-view">
      <div class="chat-topbar">
        <button class="chat-back-btn" type="button" @click="backToList">←</button>
        <div class="chat-topbar-avatar">{{ activeChatIcon }}</div>
        <div class="chat-topbar-meta">
          <div class="chat-topbar-title">{{ activeChat || 'Select a chat' }}</div>
          <div class="chat-topbar-sub">{{ activeChatSub }}</div>
        </div>
      </div>
      <div class="chat-thread">
        <div class="chat-messages">
          <div class="chat-day-divider"><span>TODAY</span></div>
          <div
            v-for="m in activeMessages"
            :key="m.id"
            :class="['chat-bubble', m.from === 'me' ? 'me' : 'them']"
          >
            <div class="chat-text">{{ m.text }}</div>
            <div class="chat-time-stamp">{{ m.time }}</div>
          </div>
        </div>
        <form class="chat-input-bar" @submit.prevent="sendMessage">
          <input v-model="draft" type="text" placeholder="Type a message..." />
          <button type="submit" class="chat-send-btn" aria-label="Send message">
            ➤
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import MapViewer from './MapViewer.vue';

type ChatMessage = {
  id: number;
  from: 'me' | 'them';
  text: string;
  time: string;
};

const props = defineProps<{
  active: boolean;
  chatTab: string;
  chats: Array<{
    name: string;
    preview: string;
    time: string;
    badge: number;
    unread: boolean;
    icon: string;
  }>;
}>();

const emit = defineEmits<{
  (e: 'update:chatTab', value: string): void;
}>();

let nextId = 1;
const activeChat = ref(props.chats[0]?.name ?? '');
const draft = ref('');
const threads = ref<Record<string, ChatMessage[]>>({
  'Shar, Mistress of the Night': [
    { id: nextId++, from: 'them', text: 'The blood moon rises tonight. Perfect for hunting.', time: '22:23' },
    { id: nextId++, from: 'me', text: 'Indeed. I sensed the ancient power stirring.', time: '22:23' },
    { id: nextId++, from: 'them', text: 'Meet me at the old cathedral? The one in the Crimson District.', time: '22:25' },
    { id: nextId++, from: 'me', text: 'I know the place. What time?', time: '22:27' },
    { id: nextId++, from: 'them', text: 'Midnight. Come alone.', time: '22:30' },
    { id: nextId++, from: 'them', text: "There's something I need to show you about the ritual...", time: '22:31' },
    { id: nextId++, from: 'me', text: 'The ritual? I thought it was forbidden since the last council meeting.', time: '22:33' },
    { id: nextId++, from: 'them', text: "There's something I need to show you...", time: '22:35' },
  ],
  'Godrick The Grafted': [
    { id: nextId++, from: 'them', text: 'Meet me at the arena.', time: '15m ago' },
    { id: nextId++, from: 'me', text: 'On my way.', time: '12m ago' },
  ],
  Jiub: [
    { id: nextId++, from: 'them', text: "Wake up, we're here.", time: '2h ago' },
  ],
  'The Dark Brotherhood': [
    { id: nextId++, from: 'them', text: 'Azura: Ready for the raid?', time: '5h ago' },
    { id: nextId++, from: 'me', text: 'Gearing up now.', time: '4h ago' },
  ],
  Serana: [
    { id: nextId++, from: 'them', text: 'Accept my trade offer, man.', time: '11h ago' },
  ],
});

const activeMessages = computed(() => threads.value[activeChat.value] || []);
const activeChatIcon = computed(
  () => props.chats.find((c) => c.name === activeChat.value)?.icon ?? '💬',
);

const chatPresence: Record<string, { status: string; level: string }> = {
  'Shar, Mistress of the Night': { status: 'Online', level: '164' },
  'Godrick The Grafted': { status: 'Online', level: '97' },
  Jiub: { status: 'Away', level: '42' },
  'The Dark Brotherhood': { status: 'Online', level: '301' },
  Serana: { status: 'Offline', level: '88' },
};

const activeChatSub = computed(() => {
  const meta = chatPresence[activeChat.value] ?? { status: 'Offline', level: '??' };
  return `${meta.status} • Level ${meta.level}`;
});

const viewMode = ref<'list' | 'thread'>('list');

const selectChat = (name: string) => {
  activeChat.value = name;
  viewMode.value = 'thread';
};

const backToList = () => {
  viewMode.value = 'list';
};

const sendMessage = () => {
  const text = draft.value.trim();
  if (!text || !activeChat.value) {
    return;
  }
  if (!threads.value[activeChat.value]) {
    threads.value[activeChat.value] = [];
  }
  threads.value[activeChat.value].push({
    id: nextId++,
    from: 'me',
    text,
    time: 'now',
  });
  draft.value = '';
};
</script>

<style>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding-bottom: 0;
  background: radial-gradient(circle at 50% -10%, rgba(130, 0, 0, 0.35), transparent 45%),
    linear-gradient(180deg, #050101 0%, #0b0505 40%, #050101 100%);
}

.chat-list-view,
.chat-thread-view {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.chat-thread-view {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% -10%, rgba(130, 0, 0, 0.35), transparent 45%),
    linear-gradient(180deg, #050101 0%, #0b0505 40%, #050101 100%);
}

.chat-tabs {
  display: flex;
  border-bottom: 1px solid #1a0808;
  padding: 0 35px;
}

.chat-tab {
  font-size: 16px;
  color: #555;
  padding: 8px 0;
  margin-right: 40px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: color 0.2s;
}

.chat-tab.active {
  color: white;
  border-bottom-color: var(--red);
}

.chat-list {
  margin: 0 16px;
  flex: 1;
  overflow-y: auto;
  border-radius: 12px;
  border: 1px solid #1a0808;
  overflow-x: hidden;
}

.chat-entry {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #0f0808;
  cursor: pointer;
  transition: background 0.15s;
  position: relative;
}

.chat-entry.selected {
  background: rgba(81, 17, 30, 0.22);
}

.chat-entry:hover {
  background: rgba(81, 17, 30, 0.1);
}

.chat-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6b0000, #2d0030);
  border: 2px solid #350507;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
  margin-right: 14px;
}

.chat-meta {
  flex: 1;
  min-width: 0;
}

.chat-name {
  font-size: 15px;
  color: white;
}

.chat-preview {
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 3px;
}

.chat-time {
  font-size: 11px;
  color: #555;
}

.chat-badge {
  background: var(--red);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 16px;
  top: 14px;
}

.unread-dot {
  width: 10px;
  height: 10px;
  background: var(--red);
  border-radius: 50%;
  position: absolute;
  left: 56px;
  top: 14px;
}

.chat-action-btns {
  display: flex;
  gap: 10px;
  padding: 14px 20px 10px;
}

.btn-chat-action {
  flex: 1;
  height: 50px;
  border: 1px solid var(--red);
  border-radius: 8px;
  background: transparent;
  color: white;
  font-family: var(--font-caps);
  font-size: 15px;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: background 0.2s;
}

.btn-chat-action:hover {
  background: rgba(196, 13, 13, 0.2);
}

.chat-map-section {
  padding: 0 20px 18px;
}

.chat-map-title {
  font-size: 18px;
  color: #f0dede;
  margin-bottom: 8px;
}

.chat-topbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 16px 14px;
  border-bottom: 1px solid #2a0808;
  background: transparent;
}

.chat-back-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: #d24b4b;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease, color 0.2s ease;
}

.chat-back-btn:hover {
  color: #ff6a6a;
  transform: translateX(-1px);
}

.chat-topbar-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 20%, #b40d0d, #320505 70%);
  border: 2px solid #3b0b0b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.chat-topbar-meta {
  display: flex;
  flex-direction: column;
}

.chat-topbar-title {
  font-size: 16px;
  color: #f5d7d7;
  letter-spacing: 0.2px;
}

.chat-topbar-sub {
  font-size: 12px;
  color: #b14a4a;
  margin-top: 2px;
}

.chat-thread {
  margin: 0;
  border-radius: 0;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  height: 100%;
}

.chat-messages {
  padding: 20px 16px 10px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  max-height: none;
  background: transparent;
}

.chat-day-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px 0 6px;
  color: #7a2323;
  letter-spacing: 3px;
  font-size: 12px;
}

.chat-day-divider span {
  padding: 4px 10px;
  border: 1px solid rgba(122, 35, 35, 0.5);
  border-radius: 999px;
  background: rgba(30, 7, 7, 0.8);
}

.chat-bubble {
  max-width: 78%;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.35;
  position: relative;
  box-shadow: 0 10px 24px -16px rgba(196, 13, 13, 0.6);
}

.chat-bubble.them {
  background: rgba(14, 6, 6, 0.95);
  color: #e6baba;
  align-self: flex-start;
  border: 1px solid #3a0d0d;
}

.chat-bubble.me {
  background: linear-gradient(135deg, rgba(80, 10, 10, 0.95), rgba(40, 5, 5, 0.95));
  color: #f5e7e7;
  align-self: flex-end;
  border: 1px solid #651616;
}

.chat-time-stamp {
  font-size: 10px;
  color: #7a4b4b;
  margin-top: 6px;
  text-align: right;
}

.chat-bubble.them .chat-time-stamp {
  text-align: left;
  color: #6a3a3a;
}

.chat-input-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px 20px;
  border-top: 1px solid #2a0808;
  background: transparent;
}

.chat-input-bar input {
  flex: 1;
  height: 44px;
  background: #0b0505;
  border: 1px solid #5b1414;
  border-radius: 999px;
  padding: 0 16px;
  color: #f2dede;
  font-family: var(--font-body);
  font-size: 14px;
}

.chat-input-bar input::placeholder {
  color: #666;
}

.chat-send-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #7a1414;
  background: radial-gradient(circle at 30% 30%, #ff2a2a, #8c0a0a 70%);
  color: white;
  font-family: var(--font-caps);
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 22px -14px rgba(196, 13, 13, 0.8);
}

.chat-send-btn:hover {
  opacity: 0.9;
}
</style>
