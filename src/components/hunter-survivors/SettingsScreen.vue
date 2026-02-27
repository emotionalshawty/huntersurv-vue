<template>
  <div :class="['screen', 'settings-page', { active: active }]">
    <div class="page-header settings-header">
      <ion-button fill="clear" class="settings-back" @click="emit('back')">
        <ion-icon :icon="arrowBackOutline" />
      </ion-button>
      <div>
        <div class="page-header-title">Settings</div>
        <div class="page-header-sub">Configure Your Application</div>
      </div>
    </div>
    <div class="settings-divider"></div>

    <div class="settings-section-label">Audio</div>
    <ion-list class="settings-group settings-group-audio" lines="none">
      <ion-item class="settings-row" lines="full">
        <ion-label>Sound Effects</ion-label>
        <ion-toggle
          slot="end"
          :checked="sfx"
          @ionChange="emit('update:sfx', !!$event.detail.checked)"
          class="toggle toggle-audio"
        />
      </ion-item>
      <ion-item class="settings-row" lines="none">
        <ion-label>Music</ion-label>
        <ion-toggle
          slot="end"
          :checked="music"
          @ionChange="emit('update:music', !!$event.detail.checked)"
          class="toggle toggle-audio"
        />
      </ion-item>
    </ion-list>

    <div class="settings-section-label">Notifications</div>
    <ion-list class="settings-group settings-group-notifs" lines="none">
      <ion-item class="settings-row" lines="none">
        <ion-label>Push Notifications</ion-label>
        <ion-toggle
          slot="end"
          :checked="pushNotifs"
          @ionChange="emit('update:pushNotifs', !!$event.detail.checked)"
          class="toggle toggle-red"
        />
      </ion-item>
    </ion-list>
  </div>
</template>

<script setup lang="ts">
import { IonButton, IonIcon, IonItem, IonLabel, IonList, IonToggle } from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';

defineProps<{
  active: boolean;
  sfx: boolean;
  music: boolean;
  pushNotifs: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:sfx', value: boolean): void;
  (e: 'update:music', value: boolean): void;
  (e: 'update:pushNotifs', value: boolean): void;
  (e: 'back'): void;
}>();
</script>

<style scoped>
.settings-page {
  position: relative;
  overflow-y: auto;
  padding-bottom: 24px;
  background: radial-gradient(circle at 50% 130%, rgba(120, 0, 0, 0.34) 0%, rgba(5, 1, 1, 0.35) 42%), #050101;
}

.settings-page::-webkit-scrollbar {
  display: none;
}

.settings-section-label {
  font-family: var(--font-title, serif);
  font-size: 20px;
  line-height: 1;
  color: #df3b3b;
  padding: 20px 26px 10px;
}

.settings-group {
  margin: 0 26px 14px;
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(1px);
  padding: 0;
  background: transparent;
}

.settings-group-audio {
  border: 1px solid #3b0f56;
  background: linear-gradient(130deg, rgba(22, 4, 40, 0.9), rgba(9, 4, 24, 0.84));
}

.settings-group-notifs {
  border: 1px solid #651010;
  background: linear-gradient(120deg, rgba(56, 8, 8, 0.88), rgba(27, 5, 5, 0.82));
}

.settings-row {
  --padding-start: 18px;
  --padding-end: 18px;
  --inner-padding-end: 0;
  --min-height: 62px;
  --background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 16px;
  color: #c495ea;
  font-family: var(--font-body, serif);
}

.settings-row:last-child,
.settings-group .settings-row:last-child {
  border-bottom: none;
}

.settings-row ion-label {
  margin: 0;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
}

.settings-group-notifs .settings-row {
  color: #e56161;
}

.toggle {
  --track-background: #3c134f;
  --track-background-checked: linear-gradient(90deg, #8e2de2, #6c1db8);
  --handle-background: #ffffff;
  --handle-background-checked: #ffffff;
  --handle-border-radius: 50%;
  width: 68px;
  height: 34px;
  transform: scale(1);
}

.toggle.toggle-red {
  --track-background: #3f0a0a;
  --track-background-checked: #e50000;
}

.settings-header {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 32px 20px 10px;
  border: none;
}

.settings-header .page-header-title {
  font-family: var(--font-title, serif);
  font-size: 40px;
  line-height: 1;
  color: #ff2a2a;
}

.settings-header .page-header-sub {
  font-family: var(--font-body, serif);
  font-size: 14px;
  color: #b84a4a;
  margin-top: 2px;
}

.settings-divider {
  height: 1px;
  margin: 0 0 8px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0) 100%);
  opacity: 0.8;
}

.settings-back {
  --color: #ff2a2a;
  --padding-start: 0;
  --padding-end: 0;
  --ripple-color: rgba(255, 42, 42, 0.25);
  margin: 0;
  font-size: 30px;
}

.settings-back ion-icon {
  font-size: 30px;
}
</style>
