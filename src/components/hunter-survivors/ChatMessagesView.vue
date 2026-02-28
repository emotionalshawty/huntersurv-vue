<template>
  <div class="messages-view">
    <div class="messages-header">
      <IonButton fill="clear" class="back-btn" @click="emit('back')">
        <IonIcon :icon="arrowBackOutline" />
      </IonButton>
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
        v-for="msg in messages"
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
        <InputText
          type="text"
          :modelValue="newMessage"
          placeholder="Type a message..."
          @update:modelValue="(val: string | undefined) => emit('update:newMessage', val ?? '')"
          @keyup.enter="emit('send')"
        />
      </div>
      <IonButton fill="clear" class="send-btn" @click="emit('send')" :disabled="!newMessage.trim()">
        <IonIcon :icon="sendOutline" />
      </IonButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { IonButton, IonIcon } from '@ionic/vue';
import { arrowBackOutline, sendOutline } from 'ionicons/icons';
import InputText from 'primevue/inputtext';

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

const props = defineProps<{
  selectedChat: ChatEntry;
  messages: ChatMessage[];
  newMessage: string;
  getAvatarUrl: (name: string) => string;
}>();

const emit = defineEmits<{
  (e: 'back'): void;
  (e: 'send'): void;
  (e: 'update:newMessage', value: string): void;
}>();

const messagesContainer = ref<HTMLElement | null>(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

watch(
  () => props.messages,
  () => {
    scrollToBottom();
  },
  { deep: true, immediate: true },
);
</script>

<style scoped>
.messages-view {
  display: grid;
  grid-template-rows: auto 1px minmax(0, 1fr) auto;
  height: 100%;
  min-height: 0;
  padding-bottom: calc(8px + env(safe-area-inset-bottom));
  box-sizing: border-box;
  overflow: hidden;
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
  --background: transparent;
  --background-hover: transparent;
  --border-width: 0;
  --color: #ff2a2a;
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: 1;
  width: 34px;
  height: 34px;
  min-height: 34px;
  text-transform: none;
  margin: 0;
}

.back-btn ion-icon {
  font-size: 24px;
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
    min-height: 30px;
  }

  .back-btn ion-icon {
    font-size: 22px;
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
  overflow-y: auto;
  height: 100%;
  max-height: 100%;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  padding-bottom: 14px;
  min-height: 0;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
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
  z-index: 5;
  padding: 8px 24px;
  padding-bottom: 8px;
  background: #050101;
  display: flex;
  align-items: center;
  gap: 10px;
}

.input-wrapper {
  flex: 1;
  background: #050101;
  border: 1px solid #8a2b2b;
  border-radius: 16px;
  padding: 0 14px;
  display: flex;
  align-items: center;
}

.input-wrapper input {
  width: 100%;
  background: transparent;
  border: none;
  color: #ff2a2a;
  font-size: 16px;
  padding: 8px 0;
  line-height: 1.2;
  outline: none;
}

.input-wrapper input::placeholder {
  color: #8a2b2b;
}

.send-btn {
  width: 38px;
  height: 38px;
  min-height: 38px;
  --border-radius: 50%;
  --background: #ff2a2a;
  --background-hover: #ff2a2a;
  --color: #050101;
  --border-width: 0;
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-transform: none;
  margin: 0;
}

.send-btn ion-icon {
  font-size: 20px;
}

.send-btn:disabled,
.send-btn[disabled] {
  --background: #3a0a0a;
  --color: #1a0505;
  cursor: not-allowed;
  opacity: 1;
}
</style>
