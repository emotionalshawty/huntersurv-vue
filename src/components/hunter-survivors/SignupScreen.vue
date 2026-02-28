<template>
  <div :class="['screen', 'signup-screen', { active: active }]">
    <h1 class="signup-title">HUNTER<br />SURVIVORS</h1>

    <div class="signup-fields">
      <div class="input-field">
        <span class="input-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21a8 8 0 0 0-16 0"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </span>
        <input type="text" placeholder="USERNAME" />
      </div>
      <div class="input-field">
        <span class="input-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="5" width="18" height="14"></rect>
            <path d="M3 7l9 6 9-6"></path>
          </svg>
        </span>
        <input type="email" placeholder="EMAIL ADDRESS" />
      </div>
      <div class="input-field">
        <span class="input-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="11" width="16" height="10" rx="2"></rect>
            <path d="M8 11V8a4 4 0 1 1 8 0v3"></path>
          </svg>
        </span>
        <input type="password" placeholder="PASSWORD" />
      </div>
      <div class="input-field">
        <span class="input-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="11" width="16" height="10" rx="2"></rect>
            <path d="M8 11V8a4 4 0 1 1 8 0v3"></path>
          </svg>
        </span>
        <input type="password" placeholder="REPEAT PASSWORD" />
      </div>
    </div>

    <IonButton fill="clear" class="btn-do-signup" @click="$emit('signup')">SIGN UP</IonButton>
  </div>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';

defineProps<{ active: boolean }>();

defineEmits<{
  (e: 'signup'): void;
}>();
</script>

<style>
.signup-screen {
  justify-content: space-between;
  flex-direction: column;
  padding: 74px 22px 84px;
}

.signup-title {
  font-family: var(--font-title);
  font-size: clamp(56px, 9vw, 74px);
  color: #f02424;
  text-align: center;
  line-height: 0.98;
  letter-spacing: 1px;
  margin-top: 98px;
}

.signup-fields {
  width: 100%;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-field {
  height: 60px;
  border: 1px solid var(--red);
  border-radius: 14px;
  background: #050101;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 18px;
  color: #d70707;
  font-family: var(--font-caps);
  font-size: 17px;
  cursor: text;
  transition: border-color 0.2s, background 0.2s;
}

.input-field:focus-within {
  border-color: #f12424;
}

.input-field input {
  background: transparent;
  border: none;
  outline: none;
  color: #d60707;
  font-family: var(--font-caps);
  font-size: 17px;
  flex: 1;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.input-field input::placeholder {
  color: #6b0909;
}

.input-icon {
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #d70707;
  opacity: 0.95;
}

.input-icon svg {
  width: 21px;
  height: 21px;
}

.btn-do-signup {
  width: 100%;
  height: 64px;
  min-height: 64px;
  --border-radius: 14px;
  --background: linear-gradient(180deg, #d50f13, #b30008 90%);
  --background-hover: linear-gradient(180deg, #d50f13, #b30008 90%);
  --box-shadow: 0 12px 22px -12px rgba(255, 0, 0, 0.9);
  --border-width: 0;
  --color: white;
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
  cursor: pointer;
  margin-top: 18px;
  font-family: var(--font-title);
  font-size: 22px;
  letter-spacing: 1px;
  text-transform: none;
}
</style>
