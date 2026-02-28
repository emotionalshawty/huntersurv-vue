<template>
  <div :class="['screen', 'entry-screen', { active: active }]">
    <h1 class="entry-title">HUNTER<br />SURVIVORS</h1>
    <div class="entry-fields">
      <div class="input-field">
        <span class="input-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="5" width="18" height="14"></rect>
            <path d="M3 7l9 6 9-6"></path>
          </svg>
        </span>
        <input
          type="email"
          placeholder="EMAIL ADDRESS"
          :value="email"
          @input="onEmailInput"
        />
      </div>
      <div class="input-field">
        <span class="input-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="11" width="16" height="10" rx="2"></rect>
            <path d="M8 11V8a4 4 0 1 1 8 0v3"></path>
          </svg>
        </span>
        <input
          type="password"
          placeholder="PASSWORD"
          :value="password"
          @input="onPasswordInput"
        />
      </div>
    </div>
    <IonButton fill="clear" class="btn-login" @click="$emit('login')">LOG IN</IonButton>
    <IonButton fill="clear" class="btn-signup-outline" @click="$emit('signup')">SIGN UP</IonButton>
  </div>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';

defineProps<{
  active: boolean;
  email: string;
  password: string;
}>();

const emit = defineEmits<{
  (e: 'update:email', value: string): void;
  (e: 'update:password', value: string): void;
  (e: 'login'): void;
  (e: 'signup'): void;
}>();

const onEmailInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:email', target.value);
};

const onPasswordInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:password', target.value);
};
</script>

<style>
.entry-screen {
  background: #000;
  justify-content: space-between;
  flex-direction: column;
  padding: 84px 20px 86px;
}

.entry-title {
  font-family: var(--font-title);
  font-size: clamp(64px, 12.2vw, 78px);
  color: #e41418;
  text-align: center;
  line-height: 0.95;
  letter-spacing: 0.8px;
  margin-top: 190px;
  text-transform: uppercase;
}

.entry-fields {
  width: 100%;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 13px;
}

.input-field {
  height: 62px;
  border: 1px solid #ca0909;
  border-radius: 17px;
  background: #000;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 26px;
  color: #d70707;
  font-family: var(--font-caps);
  font-size: 16px;
  cursor: text;
  transition: border-color 0.2s;
}

.input-field:focus-within {
  border-color: #f44747;
}

.input-field input {
  background: transparent;
  border: none;
  outline: none;
  color: #de2222;
  font-family: var(--font-caps);
  font-size: 17px;
  flex: 1;
  letter-spacing: 0.45px;
  text-transform: uppercase;
}

.input-field input::placeholder {
  color: #761010;
  font-size: 17px;
}

.input-icon {
  width: 22px;
  height: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #e41418;
}

.input-icon svg {
  width: 20px;
  height: 20px;
  opacity: 1;
}

.btn-login {
  width: 100%;
  height: 64px;
  min-height: 64px;
  --border-radius: 18px;
  --background: linear-gradient(180deg, #d40e13 0%, #b30208 100%);
  --background-hover: linear-gradient(180deg, #d40e13 0%, #b30208 100%);
  --background-hover-opacity: 0.9;
  --box-shadow: 0 8px 18px -10px rgba(255, 0, 0, 0.95);
  --border-width: 0;
  --color: white;
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
  cursor: pointer;
  margin-top: 20px;
  font-family: var(--font-title);
  font-size: 23px;
  letter-spacing: 0.6px;
  line-height: 1;
  text-transform: none;
}

.btn-login:active {
  transform: scale(0.98);
}

.btn-signup-outline {
  width: 100%;
  height: 62px;
  min-height: 62px;
  --border-radius: 16px;
  --border-width: 1px;
  --border-style: solid;
  --border-color: #c40d0d;
  --background: #000;
  --background-hover: rgba(196, 13, 13, 0.08);
  --color: #f6f0ec;
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
  cursor: pointer;
  margin-top: 10px;
  font-family: var(--font-title);
  font-size: 21px;
  letter-spacing: 0.65px;
  line-height: 1;
  text-transform: none;
}

@media (max-height: 780px) {
  .entry-title {
    margin-top: 140px;
  }
}
</style>
