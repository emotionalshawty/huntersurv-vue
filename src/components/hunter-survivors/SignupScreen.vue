<template>
  <div :class="['screen', 'signup-screen', { active: active }]">
    <button class="back-btn" @click="$emit('back')">← Back</button>
    <h1 class="signup-title">Hunter Survivors</h1>
    <div class="signup-fields">
      <div class="input-field">
        <span class="input-icon">👤</span>
        <input type="text" placeholder="USERNAME" />
      </div>
      <div class="input-field">
        <span class="input-icon">✉</span>
        <input type="email" placeholder="EMAIL ADDRESS" />
      </div>
      <div class="input-field">
        <span class="input-icon">🔒</span>
        <input type="password" placeholder="PASSWORD" />
      </div>
      <div class="input-field">
        <span class="input-icon">🔒</span>
        <input type="password" placeholder="REPEAT PASSWORD" />
      </div>
    </div>
    <button class="btn-do-signup" @click="$emit('signup')">SIGN UP</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ active: boolean }>();

defineEmits<{
  (e: 'back'): void;
  (e: 'signup'): void;
}>();
</script>
