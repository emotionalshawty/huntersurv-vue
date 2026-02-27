<template>
  <div :class="['screen', 'chat-page', { active: active }]">
    <!-- Social Tab View (List) -->
    <template v-if="!selectedChat">
      <div class="page-header">
        <div class="page-header-title">Hunter's whispers</div>
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
      
      <div class="chat-list-container">
        <div class="chat-list">
          <div 
            v-for="(chat, index) in chats" 
            :key="index"
            class="chat-item"
            @click="openChat(chat)"
          >
            <div class="chat-avatar-wrapper">
              <img :src="getAvatarUrl(chat.name)" class="chat-avatar" />
              <div v-if="chat.unread" class="online-dot"></div>
            </div>
            <div class="chat-info">
              <div class="chat-name">{{ chat.name }}</div>
              <div class="chat-preview">{{ chat.preview }}</div>
            </div>
            <div class="chat-meta">
              <div class="chat-time">{{ chat.time }}</div>
              <div v-if="chat.badge" class="chat-badge">{{ chat.badge }}</div>
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <button class="action-btn">ADD FRIENDS</button>
          <button class="action-btn">CREATE CHAT</button>
        </div>

        <div class="map-section">
          <div class="map-title">Community Map</div>
          <div class="map-container">
            <!-- Using a placeholder map image that looks like the one in the screenshot -->
            <img src="https://images.uesp.net/d/df/TR3-map-Morrowind.png" alt="Map" class="map-image" @error="handleImageError" />
            <div class="map-fallback" v-if="mapError">
              <div class="map-grid">
                <div class="map-marker red-square" style="top: 30%; left: 70%;"></div>
                <div class="map-marker red-square" style="top: 50%; left: 55%;"></div>
                <div class="map-marker red-triangle" style="top: 85%; left: 45%;"></div>
                <div class="map-marker red-triangle" style="top: 85%; left: 85%;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Chat Messages View -->
    <template v-else>
      <div class="messages-view">
        <div class="messages-header">
          <div class="back-btn" @click="closeChat">
            <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </div>
          <div class="header-avatar-wrapper">
            <img :src="getAvatarUrl(selectedChat.name)" class="header-avatar" />
          </div>
          <div class="header-info">
            <div class="header-name">{{ selectedChat.name }}</div>
            <div class="header-status">
              <span class="status-text">Online</span>
              <span class="status-dot">·</span>
              <span class="status-level">Level 164</span>
            </div>
          </div>
        </div>
        
        <div class="messages-divider"></div>

        <div class="messages-container" ref="messagesContainer">
          <div class="date-separator">TODAY</div>
          
          <div 
            v-for="msg in currentMessages" 
            :key="msg.id"
            :class="['message-wrapper', msg.isMine ? 'message-mine' : 'message-theirs']"
          >
            <div class="message-bubble">
              {{ msg.text }}
            </div>
            <div class="message-time">{{ msg.time }}</div>
          </div>
        </div>

        <div class="message-input-area">
          <div class="input-wrapper">
            <input 
              type="text" 
              v-model="newMessage" 
              placeholder="Type a message..." 
              @keyup.enter="sendMessage"
            />
          </div>
          <button class="send-btn" @click="sendMessage" :disabled="!newMessage.trim()">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue';

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

const selectedChat = ref<any>(null);
const newMessage = ref('');
const messagesContainer = ref<HTMLElement | null>(null);
const mapError = ref(true); // Default to fallback map

const handleImageError = () => {
  mapError.value = true;
};

// Mock messages for the specific chat in the screenshot
const mockMessages = [
  { id: 1, text: 'The blood moon rises tonight. Perfect for hunting.', time: '22:23', isMine: false },
  { id: 2, text: 'Indeed. I sensed the ancient power stirring.', time: '22:23', isMine: true },
  { id: 3, text: 'Meet me at the old cathedral? The one in the Crimson District.', time: '22:25', isMine: false },
  { id: 4, text: 'I know the place. What time?', time: '22:27', isMine: true },
  { id: 5, text: 'Midnight. Come alone.', time: '22:30', isMine: false },
  { id: 6, text: 'There\'s something I need to show you about the ritual...', time: '22:31', isMine: false },
  { id: 7, text: 'The ritual? I thought it was forbidden since the last council meeting.', time: '22:33', isMine: true },
];

const currentMessages = ref([...mockMessages]);

const getAvatarUrl = (name: string) => {
  // Generate a consistent avatar based on the name
  const seed = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=1a0505`;
};

const openChat = (chat: any) => {
  selectedChat.value = chat;
  // Reset messages to mock for demo
  currentMessages.value = [...mockMessages];
  scrollToBottom();
};

const closeChat = () => {
  selectedChat.value = null;
};

const sendMessage = () => {
  if (!newMessage.value.trim()) return;
  
  const now = new Date();
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  currentMessages.value.push({
    id: Date.now(),
    text: newMessage.value,
    time: timeString,
    isMine: true
  });
  
  newMessage.value = '';
  scrollToBottom();
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

watch(currentMessages, () => {
  scrollToBottom();
}, { deep: true });
</script>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: #050101;
  color: #fff;
  font-family: var(--font-body, sans-serif);
}

/* --- Social Tab View --- */
.page-header {
  padding: 39px 24px 0;
  border-bottom: 1px solid #1a0808;
  padding-bottom: 16px;
}

.page-header-title {
  font-family: var(--font-title, serif);
  font-size: 26px;
  color: #ff2a2a;
}

.page-header-sub {
  font-size: 14px;
  color: #8a2b2b;
  margin-top: 4px;
}

.chat-tabs {
  display: flex;
  border-bottom: 1px solid #1a0808;
  padding: 0 24px;
  flex-shrink: 0;
}

.chat-tab {
  font-size: 20px;
  color: #8a2b2b;
  padding: 12px 0;
  margin-right: 40px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: color 0.2s;
}

.chat-tab.active {
  color: #ff2a2a;
}

.chat-list-container {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.chat-list {
  display: flex;
  flex-direction: column;
}

.chat-item {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  border-bottom: 1px solid #1a0808;
  cursor: pointer;
  transition: background 0.2s;
}

.chat-item:hover {
  background: rgba(255, 42, 42, 0.05);
}

.chat-avatar-wrapper {
  position: relative;
  margin-right: 16px;
}

.chat-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #3a0a0a;
  object-fit: cover;
  background: #1a0505;
}

.online-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: #ff2a2a;
  border-radius: 50%;
  border: 2px solid #050101;
}

.chat-info {
  flex: 1;
  min-width: 0;
}

.chat-name {
  font-family: var(--font-title, serif);
  font-size: 18px;
  color: #e0c0c0;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-preview {
  font-size: 13px;
  color: #8a2b2b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 12px;
}

.chat-time {
  font-size: 12px;
  color: #8a2b2b;
  margin-bottom: 6px;
}

.chat-badge {
  background: #ff2a2a;
  color: white;
  font-size: 11px;
  font-weight: bold;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-buttons {
  display: flex;
  gap: 16px;
  padding: 24px;
}

.action-btn {
  flex: 1;
  background: #a01a1a;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px 0;
  font-size: 16px;
  font-family: var(--font-title, serif);
  cursor: pointer;
  transition: background 0.2s;
}

.action-btn:hover {
  background: #c02a2a;
}

.map-section {
  padding: 0 24px 24px;
}

.map-title {
  font-family: var(--font-title, serif);
  font-size: 20px;
  color: white;
  margin-bottom: 12px;
}

.map-container {
  width: 100%;
  height: 200px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  background: #8cb4c4; /* Water color */
}

.map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.map-fallback {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #d4c4a8; /* Land color */
}

.map-grid {
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  position: relative;
}

.map-marker {
  position: absolute;
  transform: translate(-50%, -50%);
}

.red-square {
  width: 12px;
  height: 12px;
  background: #ff2a2a;
  border: 1px solid white;
}

.red-triangle {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 14px solid #ff2a2a;
}

.red-triangle::after {
  content: '';
  position: absolute;
  top: 2px;
  left: -6px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 10px solid transparent;
  border-bottom-color: rgba(255,255,255,0.5);
}

/* --- Chat Messages View --- */
.messages-view {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.messages-header {
  display: grid;
  grid-template-columns: 34px 48px minmax(0, 1fr);
  align-items: center;
  column-gap: 16px;
  padding: 16px 24px;
  background: #050101;
  width: 100%;
  box-sizing: border-box;
}

.back-btn {
  color: #ff2a2a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: 1;
  width: 34px;
  height: 34px;
}

.back-btn svg {
  width: 24px;
  height: 24px;
}

.header-avatar-wrapper {
  grid-column: 2;
  width: 48px;
  height: 48px;
}

.header-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid #3a0a0a;
  object-fit: cover;
  background: #1a0505;
}

.header-info {
  grid-column: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  padding-left: 2px;
}

.header-name {
  font-family: var(--font-title, serif);
  font-size: 20px;
  color: #e0c0c0;
  margin-bottom: 2px;
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-status {
  font-size: 13px;
  color: #8a2b2b;
  display: flex;
  align-items: center;
  gap: 4px;
}

.status-text {
  color: #a03a3a;
}

@media (max-width: 420px) {
  .messages-header {
    grid-template-columns: 30px 44px minmax(0, 1fr);
    column-gap: 14px;
    padding: 14px 16px;
  }

  .back-btn {
    width: 30px;
    height: 30px;
  }

  .back-btn svg {
    width: 22px;
    height: 22px;
  }

  .header-avatar-wrapper,
  .header-avatar {
    width: 44px;
    height: 44px;
  }

  .header-name {
    font-size: 18px;
  }
}

.messages-divider {
  height: 1px;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
  margin: 0;
  opacity: 0.7;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
}

.date-separator {
  text-align: center;
  color: #a01a1a;
  font-size: 14px;
  margin-bottom: 24px;
  letter-spacing: 1px;
}

.message-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  max-width: 80%;
}

.message-mine {
  align-self: flex-end;
  align-items: flex-end;
}

.message-theirs {
  align-self: flex-start;
  align-items: flex-start;
}

.message-bubble {
  padding: 12px 16px;
  border-radius: 16px;
  font-size: 16px;
  line-height: 1.4;
}

.message-theirs .message-bubble {
  background: #050101;
  border: 1px solid #5a1a1a;
  color: #e0a0a0;
  border-bottom-left-radius: 4px;
}

.message-mine .message-bubble {
  background: #3a0a0a;
  color: #f0e0e0;
  border-bottom-right-radius: 4px;
}

.message-time {
  font-size: 10px;
  color: #5a1a1a;
  margin-top: 4px;
  padding: 0 4px;
}

.message-input-area {
  padding: 16px 24px;
  background: #050101;
  display: flex;
  align-items: center;
  gap: 12px;
}

.input-wrapper {
  flex: 1;
  background: #050101;
  border: 1px solid #8a2b2b;
  border-radius: 24px;
  padding: 0 16px;
  display: flex;
  align-items: center;
}

.input-wrapper input {
  width: 100%;
  background: transparent;
  border: none;
  color: #ff2a2a;
  font-size: 16px;
  padding: 12px 0;
  outline: none;
}

.input-wrapper input::placeholder {
  color: #8a2b2b;
}

.send-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #ff2a2a;
  color: #050101;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.send-btn:hover:not(:disabled) {
  background: #ff2a2a;
}

.send-btn:disabled {
  background: #3a0a0a;
  color: #1a0505;
  cursor: not-allowed;
}
</style>
