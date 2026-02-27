<template>
  <ion-page class="hs-page">
    <ion-content :fullscreen="true" class="hs-content">
      <ion-grid class="hs-grid">
        <ion-row class="ion-justify-content-center">
          <ion-col size="12" size-md="10" size-lg="8" size-xl="6" class="hs-col">
            <MainScreen
              :active="true"
              :challenges="challenges"
              :inventory="inventory"
              @navigate="handleNavigate"
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
import MainScreen from '../../components/hunter-survivors/MainScreen.vue';
import { useHunterData } from '../../composables/useHunterData';

const router = useRouter();
const { challenges, inventory } = useHunterData();

const handleNavigate = (target: string) => {
  if (target === 'notifications') {
    router.push('/notifications');
    return;
  }
  if (target === 'settings') {
    router.push('/settings');
    return;
  }
  if (target === 'profile') {
    router.push('/tabs/profile');
  }
};
</script>
