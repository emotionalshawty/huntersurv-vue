<template>
  <div :class="['screen', 'entry-screen', { active: active }]">
    <h1 class="entry-title">Hunter Survivors</h1>
    <div class="entry-fields">
      <div class="input-field">
        <span class="input-icon">✉</span>
        <input
          type="email"
          placeholder="EMAIL ADDRESS"
          :value="email"
          @input="onEmailInput"
        />
      </div>
      <div class="input-field">
        <span class="input-icon">🔒</span>
        <input
          type="password"
          placeholder="PASSWORD"
          :value="password"
          @input="onPasswordInput"
        />
      </div>
    </div>
    <button class="btn-login" @click="$emit('login')">LOG IN</button>
    <button class="btn-signup-outline" @click="$emit('signup')">SIGN UP</button>
  </div>
</template>

<script setup lang="ts">
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
  background: var(--bg);
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 80px;
  gap: 12px;
  flex-direction: column;
}

.entry-title {
  font-family: var(--font-title);
  font-size: 52px;
  color: #e02626;
  text-align: center;
  line-height: 1.15;
  width: 292px;
  position: absolute;
  top: 215px;
  left: 50%;
  transform: translateX(-50%);
  text-shadow: 0 0 40px rgba(196, 13, 13, 0.5);
  animation: flicker 4s infinite;
}

@keyframes flicker {
  0%,
  95%,
  100% {
    opacity: 1;
  }
  96% {
    opacity: 0.8;
  }
  97% {
    opacity: 1;
  }
  98% {
    opacity: 0.7;
  }
}

.entry-fields {
  position: absolute;
  top: 575px;
  left: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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

.btn-login {
  position: absolute;
  top: 732px;
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
  transition: opacity 0.2s, transform 0.1s;
}

.btn-login:hover {
  opacity: 0.9;
}

.btn-login:active {
  transform: scale(0.98);
}

.btn-signup-outline {
  position: absolute;
  top: 805px;
  left: 20px;
  width: 400px;
  height: 62px;
  border-radius: 15px;
  border: 1px solid var(--red);
  background: transparent;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 36px;
  color: white;
  letter-spacing: 2px;
  transition: background 0.2s;
}

.btn-signup-outline:hover {
  background: rgba(196, 13, 13, 0.1);
}
</style>
