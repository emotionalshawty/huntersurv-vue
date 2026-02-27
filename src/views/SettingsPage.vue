<template>
  <ion-page class="hs-page hs-settings-page">
    <ion-content :fullscreen="true" class="hs-content hs-settings-content">
      <ion-grid class="hs-grid hs-settings-grid">
        <ion-row class="ion-justify-content-center hs-settings-row">
          <ion-col size="12" size-md="10" size-lg="8" size-xl="6" class="hs-col hs-settings-col">
            <SettingsScreen
              :active="true"
              v-model:sfx="sfx"
              v-model:music="music"
              v-model:pushNotifs="pushNotifs"
              @back="goBack"
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
import SettingsScreen from '../components/hunter-survivors/SettingsScreen.vue';
import { useHunterData } from '../composables/useHunterData';

const router = useRouter();
const { sfx, music, pushNotifs } = useHunterData();

const goBack = () => {
  router.push('/tabs/main');
};
</script>

<style>
.hs-settings-page {
  background: #050101 !important;
}

.hs-settings-content {
  --background: #050101 !important;
  background: #050101 !important;
  --padding-bottom: 0px;
}

.hs-settings-grid,
.hs-settings-row,
.hs-settings-col {
  height: 100%;
  min-height: 0;
}

.hs-settings-row {
  align-items: stretch;
}
</style>
