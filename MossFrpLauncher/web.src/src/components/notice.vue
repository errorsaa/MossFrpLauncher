<template>
  <var-card
    :title="title"
    v-model:floating="floating"
    @click="floating = true">
    <template #floating-content>
      <var-divider dashed />
        <span style="color: var(--button-default-text-color);">{{ text }}</span>
    </template>
  </var-card>
</template>

<script setup>
  import { ref } from 'vue'

  const floating = ref(false)
  const { title, text } = defineProps(['title','text'])
</script>