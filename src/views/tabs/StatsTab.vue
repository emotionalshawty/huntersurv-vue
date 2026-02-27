<template>
  <ion-page class="hs-page">
    <ion-content :fullscreen="true" class="hs-content">
      <ion-grid class="hs-grid">
        <ion-row class="ion-justify-content-center">
          <ion-col size="12" size-md="10" size-lg="8" size-xl="6" class="hs-col">
            <StatsScreen :active="true" :attributes="attributes" :combat-stats="combatStats" />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/vue';
import StatsScreen from '../../components/hunter-survivors/StatsScreen.vue';
import { useHunterData } from '../../composables/useHunterData';

const { attributes, combatStats } = useHunterData();
</script>
