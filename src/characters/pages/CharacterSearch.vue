<script lang="ts">
interface CharacterSearchProps {
  title: string;
  visible: boolean;
}
</script>

<script setup lang="ts">
const props = defineProps<CharacterSearchProps>();
</script>

<template>
  <h1>Character Search</h1>
</template>

<style scoped></style>
