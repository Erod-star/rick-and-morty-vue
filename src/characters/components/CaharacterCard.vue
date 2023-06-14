<script lang="ts">
interface CharacterCardProps {
  character: Character;
}
</script>

<script setup lang="ts">
import { toRef } from 'vue';
import type { Character } from '../interfaces/character';
import { useRouter } from 'vue-router';

const props = defineProps<CharacterCardProps>();
const character = toRef(props, 'character');
const router = useRouter();

// Methods
const goToCharacterDetail = () => {
  router.push(`by/${character.value.id}`);
};
</script>

<template>
  <div class="character-card" @click="goToCharacterDetail">
    <img :src="character.image" :alt="character.name" />
    <h3>{{ character.name }}</h3>
  </div>
</template>

<style scoped>
.character-card {
  margin-right: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 300ms all ease;
}
.character-card:hover {
  cursor: pointer;
  transform: scale(1.1, 1.1);
}
img {
  width: 200px;
  height: 220px;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.1);
}
.character-card:hover > img {
  box-shadow: 0px 2px 5px rgba(255, 255, 255, 0.5);
}
h3 {
  margin-top: 5px;
}
</style>
