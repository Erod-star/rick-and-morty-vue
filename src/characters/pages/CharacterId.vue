<script lang="ts">
interface CharacterIdProps {
  title: string;
  visible: boolean;
}
</script>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import type { Character, CharactersRequest } from '@/characters/interfaces/character';
import rickAndMortyApi from '@/api/rickAndMorty';
import charactersStore from '@/store/characters.store';
import { useQuery } from '@tanstack/vue-query';
import { ref } from 'vue';

const props = defineProps<CharacterIdProps>();
const route = useRoute();
const { id } = route.params as { id: string };
const episodes = ref<string[]>();

const getCharacterInfo = async (characterId: string): Promise<Character> => {
  if (charactersStore.checkIdInStore(characterId)) {
    return charactersStore.ids.list[characterId];
  }
  const { data } = await rickAndMortyApi.get<Character>(`/character/${characterId}`);
  return data;
};

const { data: character } = useQuery([`characters/${id}`], () => getCharacterInfo(id), {
  onSuccess(character: Character) {
    charactersStore.loadedCharacter(character);
    episodes.value = character.episode;
    episodes.value = character.episode.map((path) => path.split('/')[5]);
  }
});
</script>

<template>
  <section v-if="!character" class="loading-container">
    <h1>Loading</h1>
    <img src="https://media.tenor.com/fjdydcAjFo8AAAAj/capoo-blue.gif" alt="loader" />
  </section>

  <div v-else class="character-container">
    <h1>{{ character.name }}</h1>
    <div class="character-container__detail">
      <img :src="character.image" :alt="character.name" />
      <ul>
        <li><span> Gender: </span> {{ character.gender }}</li>
        <li><span>Current location:</span> {{ character.location.name }}</li>
        <li><span>Origin: </span>{{ character.origin.name }}</li>
        <li><span>Species: </span>{{ character.species }}</li>
        <li><span>Status: </span>{{ character.status }}</li>
        <li v-if="episodes"><span>Episodes apperances:</span> {{ episodes?.join(', ') }}</li>
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
