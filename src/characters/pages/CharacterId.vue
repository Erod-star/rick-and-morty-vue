<script lang="ts">
interface CharacterIdProps {
  title: string;
  visible: boolean;
}
</script>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const props = defineProps<CharacterIdProps>();
const route = useRoute();
const { id } = route.params as { id: string };
</script>

<template>
  <h1>Character #{{ id }}</h1>
</template>

<style scoped></style>
