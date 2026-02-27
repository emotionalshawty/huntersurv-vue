<template>
  <ion-page class="hs-page">
    <ion-content :fullscreen="true" class="hs-content">
      <ion-grid class="hs-grid">
        <ion-row class="ion-justify-content-center">
          <ion-col size="12" size-md="10" size-lg="8" size-xl="6" class="hs-col">
            <ProfileScreen :active="true" :inventory="inventory" />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/vue';
import ProfileScreen from '../../components/hunter-survivors/ProfileScreen.vue';
import { useHunterData } from '../../composables/useHunterData';

const { inventory } = useHunterData();
</script>
