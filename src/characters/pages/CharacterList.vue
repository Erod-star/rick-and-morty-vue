<script lang="ts">
interface Props {
  title: string;
  visible: boolean;
}
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import rickAndMortyApi from '@/api/rickAndMorty';
import type { CharactersRequest, Character } from '@/characters/interfaces/character';
import { useCharacters } from '@/characters/composables/useCharacters';

import CardList from '../components/CardList.vue';
import charactersStore from '@/store/characters.store';

const props = defineProps<Props>();

// ! ------------ 1.- Normal suspense ------------
// const { data: characters } = await rickAndMortyApi.get<CharactersRequest>('/character');
// const characters - ref<Character[]>( data )

// ! ------------  2.- Composable functions ------------
// const { characters, isLoading, hasError, errorMessage } = useCharacters();

// ! ------------ 3.- TanStack Query ------------

const getCharactersChaceFirst = async (): Promise<Character[]> => {
  // Validates that we have data, but since we're using
  // the useQuery from TanStack we want to get the information updated
  if (charactersStore.characters.count > 0) return charactersStore.characters.list;

  const { data } = await rickAndMortyApi.get<CharactersRequest>('/character');
  return data.results;
};

useQuery(['characters'], getCharactersChaceFirst, {
  onSuccess(data) {
    charactersStore.loadedCharacters(data);
  },
  onError(error) {
    return charactersStore.loadCharactersFailed(`${error}`);
  }
});
</script>

<template>
  <section v-if="charactersStore.characters.isLoading">
    <h2>Loading...</h2>
    <img src="https://media.tenor.com/fjdydcAjFo8AAAAj/capoo-blue.gif" alt="loader" />
  </section>

  <section v-else-if="charactersStore.characters.hasError">
    <h2>{{ charactersStore.characters.errorMessage }}</h2>
  </section>

  <template v-else>
    <h2>{{ props.title }}</h2>
    <!-- <CardList v-else :characters="characterResp!.data.results"  /> -->
    <CardList :characters="charactersStore.characters.list" />
  </template>
</template>

<style scoped></style>
