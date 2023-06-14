<script lang="ts">
interface CardListProps {
  characters: Character[];
}
</script>

<script setup lang="ts">
import type { Character } from '@/characters/interfaces/character';

import CaharacterCard from '@/characters/components/CaharacterCard.vue';

const props = defineProps<CardListProps>();
</script>

<template>
  <section class="characters-container">
    <CaharacterCard
      v-for="character in props.characters"
      :key="character.id"
      :character="character"
    />
  </section>
</template>

<style scoped>
.characters-container {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
</style>
