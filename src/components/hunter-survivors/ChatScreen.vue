<template>
  <div :class="['screen', 'chat-page', { active: active }]">
    <ChatRoomsView
      v-if="!selectedChat"
      :chat-tab="chatTab"
      :chats="chats"
      :get-avatar-url="getAvatarUrl"
      @update:chat-tab="emit('update:chatTab', $event)"
      @select-chat="openChat"
    />

    <ChatMessagesView
      v-else
      :selected-chat="selectedChat"
      :messages="currentMessages"
      :new-message="newMessage"
      :get-avatar-url="getAvatarUrl"
      @back="closeChat"
      @send="sendMessage"
      @update:new-message="newMessage = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChatMessagesView from './ChatMessagesView.vue';
import ChatRoomsView from './ChatRoomsView.vue';

type ChatEntry = {
  name: string;
  preview: string;
  time: string;
  badge: number;
  unread: boolean;
  icon: string;
};

type ChatMessage = {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
};

defineProps<{
  active: boolean;
  chatTab: string;
  chats: ChatEntry[];
}>();

const emit = defineEmits<{
  (e: 'update:chatTab', value: string): void;
}>();

const selectedChat = ref<ChatEntry | null>(null);
const newMessage = ref('');

const mockMessages: ChatMessage[] = [
  { id: 1, text: 'The blood moon rises tonight. Perfect for hunting.', time: '22:23', isMine: false },
  { id: 2, text: 'Indeed. I sensed the ancient power stirring.', time: '22:23', isMine: true },
  { id: 3, text: 'Meet me at the old cathedral? The one in the Crimson District.', time: '22:25', isMine: false },
  { id: 4, text: 'I know the place. What time?', time: '22:27', isMine: true },
  { id: 5, text: 'Midnight. Come alone.', time: '22:30', isMine: false },
  { id: 6, text: "There's something I need to show you about the ritual...", time: '22:31', isMine: false },
  { id: 7, text: 'The ritual? I thought it was forbidden since the last council meeting.', time: '22:33', isMine: true },
];

const currentMessages = ref<ChatMessage[]>([...mockMessages]);

const getAvatarUrl = (name: string) => {
  const seed = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=1a0505`;
};

const openChat = (chat: ChatEntry) => {
  selectedChat.value = chat;
  currentMessages.value = [...mockMessages];
  newMessage.value = '';
};

const closeChat = () => {
  selectedChat.value = null;
};

const sendMessage = () => {
  if (!newMessage.value.trim()) {
    return;
  }

  const now = new Date();
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  currentMessages.value.push({
    id: Date.now(),
    text: newMessage.value,
    time: timeString,
    isMine: true,
  });

  newMessage.value = '';
};
</script>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  background: #050101;
  color: #fff;
  font-family: var(--font-body, sans-serif);
}
</style>
