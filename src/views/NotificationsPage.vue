<template>
  <ion-page class="hs-page">
    <ion-content :fullscreen="true" class="hs-content">
      <ion-grid class="hs-grid">
        <ion-row class="ion-justify-content-center">
          <ion-col size="12" size-md="10" size-lg="8" size-xl="6" class="hs-col">
            <NotificationsScreen
              :active="true"
              :notifications="notifications"
              @back="goBack"
              @mark-all-read="markAllNotificationsRead"
            />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/vue';
import { useRouter } from 'vue-router';
import NotificationsScreen from '../components/hunter-survivors/NotificationsScreen.vue';
import { useHunterData } from '../composables/useHunterData';

const router = useRouter();
const { notifications, markAllNotificationsRead } = useHunterData();

const goBack = () => {
  router.push('/tabs/main');
};
</script>
