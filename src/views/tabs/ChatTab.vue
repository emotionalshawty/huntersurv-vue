<template>
  <ion-page class="hs-page">
    <ion-content :scroll-y="false" class="hs-content hs-chat-content">
      <ion-grid class="hs-grid hs-chat-grid">
        <ion-row class="ion-justify-content-center hs-chat-row">
          <ion-col size="12" size-md="10" size-lg="8" size-xl="6" class="hs-col hs-chat-col">
            <ChatScreen :active="true" v-model:chatTab="chatTab" :chats="chats" />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/vue';
import ChatScreen from '../../components/hunter-survivors/ChatScreen.vue';
import { useHunterData } from '../../composables/useHunterData';

const { chatTab, chats } = useHunterData();
</script>

<style>
.hs-chat-content {
  --padding-bottom: 0px;
  --background: #050101;
}

.hs-chat-grid,
.hs-chat-row,
.hs-chat-col {
  height: 100%;
  min-height: 0;
}

.hs-chat-row {
  align-items: stretch;
}
</style>
