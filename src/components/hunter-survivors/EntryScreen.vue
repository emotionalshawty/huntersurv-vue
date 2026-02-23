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
