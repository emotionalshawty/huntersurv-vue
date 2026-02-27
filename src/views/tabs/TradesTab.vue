<template>
  <ion-page class="hs-page">
    <ion-content :fullscreen="true" class="hs-content">
      <ion-grid class="hs-grid">
        <ion-row class="ion-justify-content-center">
          <ion-col size="12" size-md="10" size-lg="8" size-xl="6" class="hs-col">
            <TradesScreen
              :active="true"
              :trade-tabs="tradeTabs"
              v-model:tradeTab="tradeTab"
              :filtered-trades="filteredTrades"
            />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/vue';
import TradesScreen from '../../components/hunter-survivors/TradesScreen.vue';
import { useHunterData } from '../../composables/useHunterData';

const { tradeTabs, tradeTab, filteredTrades } = useHunterData();
</script>
