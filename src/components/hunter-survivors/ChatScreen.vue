<template>
  <div :class="['screen', 'chat-page', { active: active }]">
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
    <div class="chat-container">
      <vue-advanced-chat
        :current-user-id="currentUserId"
        :rooms="JSON.stringify(rooms)"
        :messages="JSON.stringify(messages)"
        :rooms-loaded="roomsLoaded"
        :messages-loaded="messagesLoaded"
        :room-id="selectedRoomId"
        :theme="chatTheme"
        :styles="chatStyles"
        :text-messages="textMessages"
        :show-audio="false"
        :show-files="false"
        :show-emojis="true"
        :show-reaction-emojis="true"
        :show-new-messages-divider="false"
        @fetch-messages="fetchMessages"
        @send-message="sendMessage"
        @room-action-handler="roomActionHandler"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { register } from 'vue-advanced-chat';
register();

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

const currentUserId = '1';
const selectedRoomId = ref('');
const roomsLoaded = ref(true);
const messagesLoaded = ref(true);

const chatTheme = 'dark';
const chatStyles = JSON.stringify({
  general: {
    color: '#f2dede',
    colorSpinner: '#ff2a2a',
    borderStyle: '1px solid #2a0808',
  },
  container: {
    borderRadius: '0',
  },
  header: {
    background: 'transparent',
    colorRoomName: '#ff6b6b',
    colorRoomInfo: '#888',
  },
  footer: {
    background: 'transparent',
    borderStyleInput: '1px solid #5b1414',
    borderInputSelected: '1px solid #ff2a2a',
    backgroundInput: '#0b0505',
    backgroundReply: '#1a0a0a',
  },
  content: {
    background: 'transparent',
  },
  sidemenu: {
    background: 'transparent',
    backgroundHover: '#1a0a0a',
    backgroundActive: '#2a0808',
    colorActive: '#ff2a2a',
  },
  dropdown: {
    background: '#0b0505',
    backgroundHover: '#1a0a0a',
  },
  message: {
    background: '#0b0505',
    backgroundMe: '#5b1414',
    color: '#f2dede',
    colorStarted: '#9e9e9e',
    backgroundDeleted: '#1a0a0a',
    backgroundSelected: '#2a0808',
    colorDeleted: '#888',
    colorUsername: '#ff6b6b',
    colorTimestamp: '#888',
    backgroundDate: 'transparent',
    colorDate: '#ff2a2a',
    backgroundSystem: 'transparent',
    colorSystem: '#888',
    backgroundMedia: 'rgba(0, 0, 0, 0.15)',
    backgroundReply: 'rgba(0, 0, 0, 0.18)',
    colorReplyUsername: '#ff6b6b',
    colorReply: '#d6d6d6',
    colorTag: '#ff2a2a',
    backgroundImage: '#1a0a0a',
    colorNewMessages: '#ff2a2a',
    backgroundScrollCounter: '#ff2a2a',
    colorScrollCounter: '#fff',
    backgroundReaction: '#1a0a0a',
    borderStyleReaction: '1px solid #2a0808',
    backgroundReactionHover: '#2a0808',
    colorReactionCounter: '#888',
    backgroundReactionMe: '#5b1414',
    backgroundReactionHoverMe: '#7a1414',
    colorReactionCounterMe: '#f2dede',
    backgroundAudioRecord: '#1a0a0a',
    backgroundAudioLine: 'rgba(255, 42, 42, 0.15)',
    backgroundAudioProgress: '#ff2a2a',
    backgroundAudioProgressSelector: '#ff6b6b',
  },
  room: {
    colorUsername: '#f2dede',
    colorMessage: '#888',
    colorTimestamp: '#666',
    colorStateOnline: '#4caf50',
    colorStateOffline: '#888',
    backgroundCounterBadge: '#ff2a2a',
    colorCounterBadge: '#fff',
    backgroundHover: '#1a0a0a',
    backgroundActive: '#2a0808',
  },
  emoji: {
    background: '#0b0505',
  },
  icons: {
    search: '#888',
    add: '#ff2a2a',
    toggle: '#888',
    menu: '#888',
    close: '#888',
    closeImage: '#fff',
    file: '#888',
    paperclip: '#888',
    closeOutline: '#888',
    closePreview: '#fff',
    send: '#ff2a2a',
    sendDisabled: '#888',
    emoji: '#888',
    emojiReaction: 'rgba(255, 42, 42, 0.8)',
    document: '#888',
    pencil: '#888',
    checkmark: '#4caf50',
    checkmarkSeen: '#4caf50',
    eye: '#888',
    dropdownMessage: '#888',
    dropdownMessageBackground: 'transparent',
    dropdownRoom: '#888',
    dropdownScroll: '#888',
    microphone: '#ff2a2a',
    audioStop: '#ff2a2a',
    audioPause: '#888',
    audioPlay: '#888',
    audioCancel: '#888',
    audioConfirm: '#ff2a2a',
  },
});

const textMessages = JSON.stringify({
  ROOMS_EMPTY: 'No chats yet',
  ROOM_EMPTY: 'No chat selected',
  NEW_MESSAGES: 'New Messages',
  MESSAGE_DELETED: 'This message was deleted',
  MESSAGES_EMPTY: 'No messages',
  CONVERSATION_STARTED: 'Conversation started',
  TYPE_MESSAGE: 'Type a message...',
  SEARCH: 'Search',
  IS_ONLINE: 'is online',
  LAST_SEEN: 'last seen ',
  IS_TYPING: 'is typing...',
  CANCEL_SELECT_MESSAGE: 'Cancel',
});

// Convert chats to rooms format
const rooms = computed(() => {
  return props.chats.map((chat, index) => ({
    roomId: `room_${index}`,
    roomName: chat.name,
    avatar: chat.icon,
    unreadCount: chat.badge,
    lastMessage: {
      content: chat.preview,
      timestamp: chat.time,
    },
    users: [
      {
        _id: currentUserId,
        username: 'You',
      },
      {
        _id: `user_${index}`,
        username: chat.name,
        avatar: chat.icon,
        status: {
          state: chat.unread ? 'online' : 'offline',
        },
      },
    ],
  }));
});

// Message storage
const messagesByRoom = ref<Record<string, any[]>>({
  room_0: [
    {
      _id: '1',
      indexId: 1,
      content: 'The blood moon rises tonight. Perfect for hunting.',
      senderId: 'user_0',
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
    },
    {
      _id: '2',
      indexId: 2,
      content: 'Indeed. I sensed the ancient power stirring.',
      senderId: currentUserId,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
    },
    {
      _id: '3',
      indexId: 3,
      content: 'Meet me at the old cathedral? The one in the Crimson District.',
      senderId: 'user_0',
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
    },
    {
      _id: '4',
      indexId: 4,
      content: 'I know the place. What time?',
      senderId: currentUserId,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
    },
    {
      _id: '5',
      indexId: 5,
      content: 'Midnight. Come alone.',
      senderId: 'user_0',
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
    },
    {
      _id: '6',
      indexId: 6,
      content: "There's something I need to show you about the ritual...",
      senderId: 'user_0',
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
    },
    {
      _id: '7',
      indexId: 7,
      content: 'The ritual? I thought it was forbidden since the last council meeting.',
      senderId: currentUserId,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
    },
    {
      _id: '8',
      indexId: 8,
      content: "There's something I need to show you...",
      senderId: 'user_0',
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
    },
  ],
  room_1: [
    {
      _id: '9',
      indexId: 1,
      content: 'Meet me at the arena.',
      senderId: 'user_1',
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
    },
    {
      _id: '10',
      indexId: 2,
      content: 'On my way.',
      senderId: currentUserId,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
    },
  ],
  room_2: [
    {
      _id: '11',
      indexId: 1,
      content: "Wake up, we're here.",
      senderId: 'user_2',
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
    },
  ],
  room_3: [
    {
      _id: '12',
      indexId: 1,
      content: 'Ready for the raid?',
      senderId: 'user_3',
      username: 'Azura',
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
    },
    {
      _id: '13',
      indexId: 2,
      content: 'Gearing up now.',
      senderId: currentUserId,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
    },
  ],
  room_4: [
    {
      _id: '14',
      indexId: 1,
      content: 'Accept my trade offer, man.',
      senderId: 'user_4',
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
    },
  ],
});

const messages = computed(() => {
  return messagesByRoom.value[selectedRoomId.value] || [];
});

const fetchMessages = ({ room }: any) => {
  selectedRoomId.value = room.roomId;
  messagesLoaded.value = true;
};

let nextMessageId = 100;
const sendMessage = ({ content, roomId }: any) => {
  if (!messagesByRoom.value[roomId]) {
    messagesByRoom.value[roomId] = [];
  }
  
  const newMessage = {
    _id: String(nextMessageId++),
    indexId: messagesByRoom.value[roomId].length + 1,
    content,
    senderId: currentUserId,
    timestamp: new Date().toISOString(),
    date: new Date().toLocaleDateString(),
  };
  
  messagesByRoom.value[roomId].push(newMessage);
};

const roomActionHandler = ({ action }: any) => {
  if (action.name === 'inviteUser') {
    // Handle invite
  } else if (action.name === 'removeUser') {
    // Handle remove
  } else if (action.name === 'deleteRoom') {
    // Handle delete
  }
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

.chat-tabs {
  display: flex;
  border-bottom: 1px solid #1a0808;
  padding: 0 35px;
  flex-shrink: 0;
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

.chat-container {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Vue Advanced Chat Custom Styling */
.chat-container >>> .vac-card-window {
  background: transparent;
  border: none;
  box-shadow: none;
}

.chat-container >>> .vac-rooms-container {
  background: transparent;
  border-right: 1px solid #1a0808;
}

.chat-container >>> .vac-room-item {
  background: transparent;
  border-bottom: 1px solid #0f0808;
  padding: 12px 16px;
}

.chat-container >>> .vac-room-item:hover {
  background: rgba(81, 17, 30, 0.1);
}

.chat-container >>> .vac-room-item.vac-room-selected {
  background: rgba(81, 17, 30, 0.22);
}

.chat-container >>> .vac-room-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6b0000, #2d0030);
  border: 2px solid #350507;
  font-size: 22px;
}

.chat-container >>> .vac-room-name {
  font-size: 15px;
  color: white;
  font-family: var(--font-body);
}

.chat-container >>> .vac-text-last {
  font-size: 12px;
  color: #666;
}

.chat-container >>> .vac-text-date {
  font-size: 11px;
  color: #555;
}

.chat-container >>> .vac-badge-counter {
  background: var(--red);
  color: white;
  font-size: 11px;
}

.chat-container >>> .vac-room-unread {
  background: var(--red);
}

.chat-container >>> .vac-room-header {
  background: transparent;
  border-bottom: 1px solid #2a0808;
  padding: 18px 16px 14px;
}

.chat-container >>> .vac-room-name {
  font-size: 16px;
  color: #f5d7d7;
  letter-spacing: 0.2px;
  font-family: var(--font-body);
}

.chat-container >>> .vac-room-info {
  font-size: 12px;
  color: #b14a4a;
}

.chat-container >>> .vac-room-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 20%, #b40d0d, #320505 70%);
  border: 2px solid #3b0b0b;
  font-size: 18px;
}

.chat-container >>> .vac-container-scroll {
  background: transparent;
  padding: 20px 16px 10px;
}

.chat-container >>> .vac-message-wrapper {
  margin-bottom: 14px;
}

.chat-container >>> .vac-message-box {
  max-width: 78%;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.35;
  box-shadow: 0 10px 24px -16px rgba(196, 13, 13, 0.6);
  font-family: var(--font-body);
}

.chat-container >>> .vac-message-box.vac-message-me {
  background: linear-gradient(135deg, rgba(80, 10, 10, 0.95), rgba(40, 5, 5, 0.95));
  color: #f5e7e7;
  border: 1px solid #651616;
}

.chat-container >>> .vac-message-box.vac-message-them {
  background: rgba(14, 6, 6, 0.95);
  color: #e6baba;
  border: 1px solid #3a0d0d;
}

.chat-container >>> .vac-text-timestamp {
  font-size: 10px;
  color: #7a4b4b;
  margin-top: 6px;
}

.chat-container >>> .vac-message-them .vac-text-timestamp {
  color: #6a3a3a;
}

.chat-container >>> .vac-text-date-new {
  color: #7a2323;
  letter-spacing: 3px;
  font-size: 12px;
  border: 1px solid rgba(122, 35, 35, 0.5);
  border-radius: 999px;
  background: rgba(30, 7, 7, 0.8);
  padding: 4px 10px;
  font-family: var(--font-caps);
}

.chat-container >>> .vac-room-footer {
  background: transparent;
  border-top: 1px solid #2a0808;
  padding: 14px 16px;
  padding-bottom: max(14px, env(safe-area-inset-bottom));
}

.chat-container >>> .vac-box-footer {
  background: #0b0505;
  border: 1px solid #5b1414;
  border-radius: 999px;
}

.chat-container >>> .vac-box-footer:focus-within {
  border-color: #ff2a2a;
}

.chat-container >>> .vac-textarea {
  background: transparent;
  color: #f2dede;
  font-family: var(--font-body);
  font-size: 14px;
  padding: 0 16px;
  min-height: 44px;
  line-height: 44px;
}

.chat-container >>> .vac-textarea::placeholder {
  color: #666;
}

.chat-container >>> .vac-icon-send {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #7a1414;
  background: radial-gradient(circle at 30% 30%, #ff2a2a, #8c0a0a 70%);
  box-shadow: 0 12px 22px -14px rgba(196, 13, 13, 0.8);
  margin: 0;
}

.chat-container >>> .vac-icon-send svg {
  color: white;
}

.chat-container >>> .vac-icon-send:hover {
  opacity: 0.9;
}

.chat-container >>> .vac-svg-button {
  color: #888;
}

.chat-container >>> .vac-svg-button:hover {
  color: #ff2a2a;
}

.chat-container >>> .vac-icon-emoji {
  color: #888;
}

.chat-container >>> .vac-icon-emoji:hover {
  color: #ff2a2a;
}

.chat-container >>> .vac-emoji-wrapper {
  background: #0b0505;
  border: 1px solid #2a0808;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
}

.chat-container >>> .vac-room-name {
  font-weight: 500;
}

.chat-container >>> .vac-room-options {
  color: #888;
}

.chat-container >>> .vac-room-options:hover {
  color: #ff2a2a;
}

.chat-container >>> .vac-menu-options {
  background: #0b0505;
  border: 1px solid #2a0808;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
}

.chat-container >>> .vac-menu-list {
  color: #f2dede;
}

.chat-container >>> .vac-menu-item:hover {
  background: #1a0a0a;
}

.chat-container >>> .vac-rooms-search {
  background: transparent;
  border-bottom: 1px solid #1a0808;
  padding: 12px 16px;
}

.chat-container >>> .vac-input-search {
  background: #0b0505;
  border: 1px solid #5b1414;
  border-radius: 999px;
  color: #f2dede;
  padding: 8px 16px;
  font-family: var(--font-body);
}

.chat-container >>> .vac-input-search::placeholder {
  color: #666;
}

.chat-container >>> .vac-input-search:focus {
  border-color: #ff2a2a;
}
</style>
