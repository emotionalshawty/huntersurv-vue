<template>
  <ion-page class="hs-page">
    <ion-content :fullscreen="true" class="hs-content">
      <ion-grid class="hs-grid">
        <ion-row class="ion-justify-content-center">
          <ion-col size="12" size-md="8" size-lg="6" size-xl="5" class="hs-col">
            <EntryScreen
              v-if="authView === 'entry'"
              :active="true"
              v-model:email="email"
              v-model:password="password"
              @login="goToTabs"
              @signup="authView = 'signup'"
            />
            <SignupScreen
              v-else
              :active="true"
              @back="authView = 'entry'"
              @signup="goToTabs"
            />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/vue';
import { useRouter } from 'vue-router';
import EntryScreen from '../components/hunter-survivors/EntryScreen.vue';
import SignupScreen from '../components/hunter-survivors/SignupScreen.vue';

const router = useRouter();
const authView = ref<'entry' | 'signup'>('entry');
const email = ref('');
const password = ref('');

const goToTabs = () => {
  router.push('/tabs/main');
};
</script>
