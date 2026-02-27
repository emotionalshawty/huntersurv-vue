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

<style>
.settings-page {
  overflow-y: auto;
  padding-bottom: 60px;
}

.settings-page::-webkit-scrollbar {
  display: none;
}

.settings-section-label {
  font-size: 16px;
  color: white;
  padding: 14px 20px 8px;
}

.settings-group {
  margin: 0 20px 16px;
  border: 1px solid #270708;
  border-radius: 10px;
  overflow: hidden;
}

.settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid #0f0808;
  font-size: 14px;
  color: #ccc;
}

.settings-row:last-child {
  border-bottom: none;
}

.toggle {
  width: 50px;
  height: 26px;
  border-radius: 13px;
  position: relative;
  cursor: pointer;
  transition: background 0.25s;
}

.toggle.on {
  background: var(--purple);
}

.toggle.off {
  background: #1a0808;
}

.toggle.red-on {
  background: var(--red-dark);
}

.toggle-knob {
  position: absolute;
  top: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  transition: left 0.25s;
}

.toggle.on .toggle-knob,
.toggle.red-on .toggle-knob {
  left: 27px;
}

.toggle.off .toggle-knob {
  left: 3px;
}

.settings-header {
  display: flex;
  gap: 14px;
  align-items: center;
}

.settings-back {
  background: none;
  border: none;
  color: #ccc;
  font-size: 22px;
  cursor: pointer;
}
</style>
