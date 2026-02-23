<template>
  <div :class="['screen', 'settings-page', { active: active }]">
    <div class="page-header settings-header">
      <button class="settings-back" @click="$emit('back')">←</button>
      <div>
        <div class="page-header-title">Settings</div>
        <div class="page-header-sub">Configure Your Application</div>
      </div>
    </div>
    <div class="settings-section-label">Audio</div>
    <div class="settings-group">
      <div class="settings-row">
        <span>Sound Effects</span>
        <div :class="['toggle', sfx ? 'on' : 'off']" @click="emit('update:sfx', !sfx)">
          <div class="toggle-knob"></div>
        </div>
      </div>
      <div class="settings-row">
        <span>Music</span>
        <div :class="['toggle', music ? 'on' : 'off']" @click="emit('update:music', !music)">
          <div class="toggle-knob"></div>
        </div>
      </div>
    </div>
    <div class="settings-section-label">Notifications</div>
    <div class="settings-group">
      <div class="settings-row">
        <span>Push Notifications</span>
        <div :class="['toggle', pushNotifs ? 'red-on' : 'off']" @click="emit('update:pushNotifs', !pushNotifs)">
          <div class="toggle-knob"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
