<template>
  <img :src="src" :alt="alt" v-bind="$attrs" />
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

withDefaults(defineProps<{
  src: string;
  alt?: string;
}>(), {
  alt: '',
});
</script>
