<script lang="ts">
interface CharacterIdProps {
  title: string;
  visible: boolean;
}
</script>

<script setup lang="ts">
import { watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useCharacter from '@/characters/composables/useCharacter';

const props = defineProps<CharacterIdProps>();
const route = useRoute();
const router = useRouter();

const { id } = route.params as { id: string };
const { character, hasError, errorMessage, formattedEpisodes, isLoading } = useCharacter(id);

watchEffect(() => {
  if (!isLoading.value && hasError.value) {
    router.replace('/characters');
  }
});
</script>

<template>
  <section v-if="isLoading" class="loading-container">
    <h1>Loading</h1>
    <img src="https://media.tenor.com/fjdydcAjFo8AAAAj/capoo-blue.gif" alt="loader" />
  </section>
  <section v-else-if="hasError">
    <h1>{{ errorMessage }}</h1>
  </section>

  <div v-else-if="character" class="character-container">
    <h1>{{ character.name }}</h1>
    <div class="character-container__detail">
      <img :src="character.image" :alt="character.name" />
      <ul>
        <li><span> Gender: </span> {{ character.gender }}</li>
        <li><span>Current location:</span> {{ character.location.name }}</li>
        <li><span>Origin: </span>{{ character.origin.name }}</li>
        <li><span>Species: </span>{{ character.species }}</li>
        <li><span>Status: </span>{{ character.status }}</li>
        <li v-if="formattedEpisodes">
          <span>Episodes apperances:</span> {{ formattedEpisodes?.join(', ') }}
        </li>
        <li><span>Date of creation:</span> {{ character.created }}</li>
        <li v-if="character.type"><span>Type: </span>{{ character.type }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.loading-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.loading-container > h1 {
  font-style: italic;
  font-weight: bold;
}
.loading-container > img {
  margin-top: 20px;
}
.character-container > h1 {
  font-style: italic;
  font-weight: bold;
  margin-bottom: 10px;
}
.character-container__detail {
  display: flex;
}
.character-container__detail > img {
  width: 310px;
  height: 340px;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.1);
}

.character-container__detail > ul > li {
  font-size: 18px;
  margin-top: 5px;
}
.character-container__detail > ul > li > span {
  font-weight: bold;
}
</style>
