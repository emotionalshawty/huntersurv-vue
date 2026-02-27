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

<style>
.signup-screen {
  background: var(--bg);
  align-items: center;
  flex-direction: column;
}

.signup-title {
  font-family: var(--font-title);
  font-size: 52px;
  color: #e02626;
  text-align: center;
  width: 292px;
  position: absolute;
  top: 215px;
  left: 50%;
  transform: translateX(-50%);
  text-shadow: 0 0 40px rgba(196, 13, 13, 0.5);
}

.signup-fields {
  position: absolute;
  top: 586px;
  left: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.input-field {
  height: 62px;
  border: 1px solid var(--red);
  border-radius: 15px;
  background: rgba(110, 35, 35, 0.05);
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 20px;
  color: var(--red-dark);
  font-family: var(--font-caps);
  font-size: 22px;
  cursor: text;
  transition: border-color 0.2s, background 0.2s;
}

.input-field:focus-within {
  border-color: #e02626;
  background: rgba(110, 35, 35, 0.15);
}

.input-field input {
  background: transparent;
  border: none;
  outline: none;
  color: #e02626;
  font-family: var(--font-caps);
  font-size: 22px;
  flex: 1;
  letter-spacing: 1px;
}

.input-field input::placeholder {
  color: var(--red-dark);
}

.input-icon {
  font-size: 18px;
  opacity: 0.7;
}

.btn-do-signup {
  position: absolute;
  top: 809px;
  left: 20px;
  width: 400px;
  height: 62px;
  border-radius: 15px;
  background: linear-gradient(90deg, #c40d0d, #8c0a0a, #900);
  box-shadow: 0 6px 21px -9px red;
  border: none;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 42px;
  color: white;
  letter-spacing: 2px;
}

.back-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  color: var(--text-red);
  font-size: 28px;
  cursor: pointer;
  font-family: var(--font-body);
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
